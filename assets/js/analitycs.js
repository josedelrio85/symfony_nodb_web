
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
            name: null,            // Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ......)
            // creative: 'particulares', // Nombre de la creatividad
            position: null,            // Posición que ocupa dentro del slider o de la página
          }]
        }
      }
    };

    this.dataconf = {
      event: 'virtual_page',
      pageName: null,
    }
  }


  slider = (data) => {
    this.dataclick.eventLbl = 'slider';
    this.dataclick.ecommerce.promoClick.promotions[0].name = data.name;
    this.dataclick.ecommerce.promoClick.promotions[0].position = data.position;
    
    this.push(this.dataclick);
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
    this.push(this.dataconf);

    //////////////////////////////////////////

    this.dataclick.eventLbl = pageName;
    this.dataclick.ecommerce.promoClick.promotions[0].name = pageName;
    this.dataclick.ecommerce.promoClick.promotions[0].position = data.position;
    this.push(this.dataclick);
  }

  productCard = (data) => {
    this.dataclick.eventLbl = data.label;
    this.dataclick.ecommerce.promoClick.promotions[0].name = data.name;
    this.dataclick.ecommerce.promoClick.promotions[0].position = data.position;

    this.push(this.dataclick);
  }

  push = (data) => {
    console.log(data);
    window.dataLayer = window.dataLayer || [];
    if (process.env.PRODUCTION) {
      window.dataLayer.push({data});
    }
    // console.log(window.dataLayer);
  }
}

export {
  analitycs,
};
