
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
            id: '13',                 // ID de la campaña
            name: 'salud',            // Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ......)
            creative: 'particulares', // Nombre de la creatividad
            position: '1',            // Posición que ocupa dentro del slider o de la página
          }]
        }
      }
    };
  }


  slider = (data) => {
    console.log(data);

    this.dataclick.eventLbl = data.label;
    this.dataclick.ecommerce.promoClick.promotions.id = data.id;
    this.dataclick.ecommerce.promoClick.promotions.name = data.name;
    this.dataclick.ecommerce.promoClick.promotions.creative = data.creative;
    this.dataclick.ecommerce.promoClick.promotions.position = data.position;
    
    console.log(this.dataclick)
    // this.push(this.dataclick);
  }

  configurator = (data) => {
    console.log(data);

    this.dataclick.eventLbl = data.label;
    this.dataclick.ecommerce.promoClick.promotions.id = data.id;
    this.dataclick.ecommerce.promoClick.promotions.name = data.name;
    this.dataclick.ecommerce.promoClick.promotions.creative = data.creative;
    this.dataclick.ecommerce.promoClick.promotions.position = data.position;

    console.log(this.dataclick)
    // this.push(this.dataclick);  
  }

  productCard = (data) => {
    console.log(data);

    this.dataclick.eventLbl = data.label;
    this.dataclick.ecommerce.promoClick.promotions.id = data.id;
    this.dataclick.ecommerce.promoClick.promotions.name = data.name;
    this.dataclick.ecommerce.promoClick.promotions.creative = data.creative;
    this.dataclick.ecommerce.promoClick.promotions.position = data.position;

    console.log(this.dataclick)
    // this.push(this.dataclick);  
  }

  push = (data) => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({data});

    console.log(window.dataLayer);
  }
}

export {
  analitycs,
};


dataLayer.push({
  'event': 'eventoEC',
  'eventCat': 'ecommerce',
  'eventAct': 'promocionClick',
  'eventLbl': 'home-body', //Nombre de la promoción donde se ha hecho click
  'ecommerce': {
  'promoClick': {
  'promotions': [{
  'id': '123', //ID de la campaña
  'name': 'home-body', //Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ......)
  'creative': 'salud', //Nombre de la creatividad
  'position': '1', //Posición que ocupa dentro del slider o de la página
  }]
  }
  }
  });
  

  dataLayer.push({
    'eventLbl': 'salud', //Nombre de la promoción donde se ha hecho click
    'ecommerce': {
      'promoClick': {
        'promotions': [{
          'id': '13', //ID de la campaña
          'name': 'salud', //Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ......)
          'creative': 'particulares', //Nombre de la creatividad
          'position': '1', //Posición que ocupa dentro del slider o de la página
        }]
      }
    }
  });

dataLayer.push({

  'eventLbl': 'quedarme embarazada', //Nombre de la promoción donde se ha hecho click
  'ecommerce': {
  'promoClick': {
  'promotions': [{
    'id': '1234567', //ID de la campaña
    'name': 'quedarme embarazada', //Lugar donde se visualiza (home-slider | home-body | salud | salud-particulares | ...)
    'creative': 'adeslas plena vital', //Nombre de la creatividad
    'position': '1', //Posición que ocupa dentro del slider o de la página
  }]
  }
}
});
