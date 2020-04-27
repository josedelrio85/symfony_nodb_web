
class analitycs {
  
  constructor() {
    this.dataclick = {
      event: 'eventoEC',
      eventCat: 'ecommerce',
      eventAct: 'promocionClick',
      eventLbl: null,                 // Nombre de la promoción donde se ha hecho click
      ecommerce: {
        promoClick: {
          promotions: [{
            name: null,             // Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ......)
            creative: null,         // Nombre de la creatividad
            position: null,         // Posición que ocupa dentro del slider o de la página
          }]
        },
        promoView: {
          promotions: [{
            name: null,             // Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ......)
            creative: null,         // Nombre de la creatividad
            position: null,         // Posición que ocupa dentro del slider o de la página
          }]
        },
      }
    };

    this.dataconf = {
      event: 'virtual_page',
      pageName: null,
    }
  }

  slider = (data) => {
    console.log(data);
    this.dataclick.eventLbl = 'home-slider';
    this.dataclick.ecommerce.promoClick.promotions[0].name = 'home-slider';
    this.dataclick.ecommerce.promoClick.promotions[0].creative = data.creative;
    this.dataclick.ecommerce.promoClick.promotions[0].position = data.position;
    // delete this.dataclick.ecommerce.promoView;
    // delete this.dataclick.noInteraction;
    
    this.populateClick(this.dataclick);
  }

  sliderScroll = (data) => {
    this.dataclick.eventLbl = 'home-slider';
    this.dataclick.ecommerce.promoView.promotions[0].name = 'home-slider';
    this.dataclick.ecommerce.promoView.promotions[0].creative = data.id;
    this.dataclick.ecommerce.promoView.promotions[0].position = data.position;
    // delete this.dataclick.ecommerce.promoClick;
    
    this.populateScroll(this.dataclick);
  }

  configurator = (data) => {
    let pageName = data.mc;
    if (data.fc !== null && data.fc != undefined) {
      pageName += "/" + data.fc;
    }
    if (data.sc !== null && data.sc != undefined) {
      pageName += "/" + data.sc;
    }

    this.dataconf.pageName = "/vpv/" + pageName;
    this.populateConf(this.dataconf);

    //////////////////////////////////////////

    this.dataclick.eventLbl = 'home-body';
    this.dataclick.ecommerce.promoClick.promotions[0].name = 'home-body';
    this.dataclick.ecommerce.promoClick.promotions[0].creative = pageName;
    this.dataclick.ecommerce.promoClick.promotions[0].position = data.position;
    // delete this.dataclick.ecommerce.promoView;
    // delete this.dataclick.noInteraction;

    this.populateClick(this.dataclick);
  }

  configuratorScroll = (data) => {
    let pageName = data.mc;
    if (data.fc !== null && data.fc != undefined) {
      pageName += "/" + data.fc;
    }
    if (data.sc !== null && data.sc != undefined) {
      pageName += "/" + data.sc;
    }

    this.dataclick.eventLbl = 'home-body';
    data.array.forEach(d => {
      let promo = {
        name : 'home-body',
        creative : 'a',
        position : d.position,
      }
      this.dataclick.ecommerce.promoClick.promotions.push(promo);
    });
    this.populateClick(this.dataclick);
  }

  productCard = (data) => {
    this.dataclick.eventLbl = data.label;
    this.dataclick.ecommerce.promoClick.promotions[0].name = data.name;
    this.dataclick.ecommerce.promoClick.promotions[0].creative = data.creative;
    this.dataclick.ecommerce.promoClick.promotions[0].position = data.position;
    // delete this.dataclick.ecommerce.promoView;
    // delete this.dataclick.noInteraction;

    this.populateClick(this.dataclick);
  }

  populateConf = (data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'virtual_page',
      pageName: data.pageName,
    });
    // console.log(window.dataLayer);
  }

  populateClick = (data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'eventoEC',
      eventCat: 'ecommerce',
      eventAct: 'promocionClick',
      eventLbl: data.eventLbl,
      ecommerce: {
        promoClick: {
          promotions: [{
            name: data.ecommerce.promoClick.promotions[0].name,
            creative: data.ecommerce.promoClick.promotions[0].creative,
            position: data.ecommerce.promoClick.promotions[0].position,
          }]
        }
      }
    });
    console.log(window.dataLayer);
  }

  populateScroll = (data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'eventoEC',
      eventCat: 'ecommerce',
      eventAct: 'promocionImpresion',
      eventLbl: data.eventLbl,
      noInteraction: true,
      ecommerce: {
        promoView: {
          promotions: [{
            name: data.ecommerce.promoView.promotions[0].name,
            creative: data.ecommerce.promoView.promotions[0].creative,
            position: data.ecommerce.promoView.promotions[0].position,
          }]
        }
      }
    });
    console.log(window.dataLayer);
  }
}

export {
  analitycs,
};
