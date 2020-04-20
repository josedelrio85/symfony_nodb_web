/* eslint new-cap: [0] */
/* eslint import/no-unresolved: [0] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-prototype-builtins: "error" */
/* eslint-disable import/prefer-default-export */

import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';
import { responseC2C } from './response_c2c';

class bysidecar {
  constructor() {
    this.landcom = new landingCommander();
    const locale = this.getLocale();
    this.landcom.setLanguage(locale);
    this.response = new responseC2C();
    this.getDDI();
  }

  getLocale = () => {
    return 'es';
  }

  throwError = (e) => {
    throw new Error(`Not supported! ${e}`);
  }

  printOut = (msg) => {
    if(!process.env.PRODUCTION){
      console.log(msg);
    }
  }

  compareObjects = (obj, lead) => {
    Object.keys(lead).forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        if (lead[key] !== obj[key] && obj[key] !== undefined && obj[key] !== '') {
          lead[key] = obj[key];
        }
      }
    });
  }

  getGaClientId = () => {
    let tracker = ga.getAll()[0];
    return tracker.get('clientId');    
  }

  launchC2C = (obj, dataLayer) => {
    const paramsUrl = this.landcom.getParametersURL();
    const urlEndPoint = process.env.LEADS_URL;

    // sou_id value must be set in obj param
    const lead = {
      sou_id: null,
      lea_type: 1,

      url: window.location.href,
      ip: '',
      utm_source: paramsUrl.utm_source,
      sub_source: paramsUrl.sub_source,
      gclid: paramsUrl.gclid,
      domain: window.location.hostname,
      phone: '',
      mail: '',
      name: '',
      dni: '',
      smartcenter: false,
      observations: '',
      // TODO uncomment when gtm script is activated
      // ga_client_id: this.getGaClientId(),
      adeslas: null,
    };    
    this.compareObjects(obj, lead);

    this.response.showPopup(false);

    landingCommander.makePostRequest(lead, urlEndPoint)
      .then((result) => {
          this.landcom.isOnTime(lead.sou_id)
            .then((onTime) => {

              if (!onTime) {
                // We are not on time, let's get the campaign timetable
                this.landcom.getWeekByCampaign(lead.sou_id)
                  .then((bsnHours) => {
                    const bh = this.landcom.printBusinessHours(bsnHours);
                    this.response.handleBusinessHoursInfo(bh);
                  })
                  .catch(e => this.throwError(e));
              }

              // we are on time, let's show info about the call phone to the user or other stuff
              if (onTime && result.smartcenter) {
                this.response.showPopup(false);
                this.landcom.callStateTracking(lead.phone, (state) => {
                  const message = this.landcom.getMessageStateCall(state);
                  this.response.handleStateCallMessage(state, message);
                });
              } else {
                this.response.responseWeWontCall();
              }
            })
            .catch(e => this.throwError(e));

          dataLayer.phoneHash = window.md5(lead.phone);
          dataLayer.idLead =  result.message;
          this.populateDatalayer(dataLayer);
      })
      .catch(e => {
        this.response.responseWeWontCall();
        this.throwError(e)
       });
  }

  getLandingCommander = () => this.landcom

  getDDI = () => {
    const paramsUrl = this.landcom.getParametersURL();
    const gclid = paramsUrl.gclid;
    let utm_source = null;

    if(paramsUrl.gclid === null && (paramsUrl.utm_source === '' || paramsUrl.utm_source === null)){
      utm_source = 'default';
    } else {
      if(gclid !== null){
        utm_source = null;
      } else {
        utm_source = paramsUrl.utm_source;
      }
    }

    const options = {
      utm_source,
      gclid,
      // microsite: this.getProvider().includes(window.location.host) ? window.location.host : 'adeslas.contratar.es',
      microsite: 'adeslas.contratar.es',
    };

    this.landcom.getDDI(options)
      .then((response) => {
        // this.printOut(response);

        document.querySelectorAll('.ddi').forEach((ddi) => {
          //Insert 1 space every 3 characters
          ddi.innerHTML = response.data.TELEFONO.match(/.{3}/g).join(' ');
        });

        let hreftel = "tel:" + response.data.TELEFONO;
        document.querySelector('.ddi-mobile').setAttribute('href', hreftel)
      })
      .catch(e => this.throwError(e));
  }

  populateDatalayer = (data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      eventCategory: data.eventCategory,
      eventAction: data.eventAction,
      eventLabel: data.eventLabel,
      event: data.event,
      phoneHash: data.phoneHash,
      idLead: data.idLead,
    });
    if(!process.env.PRODUCTION){
      this.printOut(window.dataLayer);
    }
  }

  getProvider = () => {
    const adeslas = [
      'adeslas-pre.bysidecar.me',
      'adeslas.bysidecar.me',
      'adeslas.contratar.es',
      'www.adeslas.contratar.es',
    ];
    return adeslas;
  }
}

export {
  bysidecar,
};
