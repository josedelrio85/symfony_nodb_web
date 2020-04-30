
class analitycs {

  constructor() {
    window.dataLayer = window.dataLayer || [];
  }

  slider = (data) => {
    let click = {
      eventLbl: 'home-slider',
      promotions: [],
    };

    let promo = {
      name : 'home-slider',
      creative : data.creative,
      position : data.position,
    }
    click.promotions.push(promo);

    // console.log("slider");
    this.populateClick(click);
  }

  sliderScroll = (data) => {
    let scroll = {
      eventLbl: 'home-slider',
      promotions: [],
    };
    let promo = {
      name : 'home-slider',
      creative : data.id,
      position : data.position,
    }
    scroll.promotions.push(promo);
    // console.log("sliderScroll");
    this.populateScroll(scroll);
  }

  configurator = (data) => {
    let clickconf = {
      event: 'virtual_page',
      pageName: "/vpv/" + data.vpv,
    }

    //////////////////////////////////////////
    let click = {
      eventLbl: data.eventLbl,
      promotions: [{
        name : data.name,
        creative : data.creative,
        position : data.position,
      }],
    };

    // console.log("configurator");
    // console.log(click);
    this.populateClick(click);

    if (data.sc == null || data.sc == undefined){
      this.populateConf(clickconf);
    }
  }

  configuratorScroll = (data) => {
    let scroll = {
      eventLbl: 'home-body',
      promotions: [],
    };
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object') {
        let promo = {
          name : 'home-body',
          creative : data[key].creative,
          position : data[key].position,
        }
        scroll.promotions.push(promo);
      };
    });
    // console.log("configuratorScroll");
    // console.log(scroll);
    this.populateScroll(scroll);
  }

  configuratorScrollFC = (data) => {
    let scroll = {
      eventLbl: null,
      promotions: [],
    };
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object') {
        let promo = {
          name: 'salud',
          creative: data[key].creative,
          position: data[key].position,
        }
        scroll.eventLbl = promo.name;
        scroll.promotions.push(promo);
      };
    });
    // console.log("configuratorScrollFC");
    // console.log(scroll);
    this.populateScroll(scroll);
  }

  configuratorScrollSC = (data) => {
    let scroll = {
      eventLbl: null,
      promotions: [],
    };
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'object') {
        let promo = {
          name : 'salud-' + data[key].name,
          creative : data[key].creative,
          position : data[key].position,
        }
        scroll.eventLbl = promo.name;
        scroll.promotions.push(promo);
      };
    });
    // console.log("configuratorScrollSC");
    // console.log(scroll);
    this.populateScroll(scroll);
  }

  productScroll = (data) => {
    let scroll = {
      eventLbl: null,
      promotions: [],
    };
    let promo = {
      name : data.name,
      creative : data.creative,
      position : data.position,
    }
    scroll.eventLbl = data.eventLbl;
    scroll.promotions.push(promo);

    console.log("productScroll");
    console.log(scroll);
    this.populateScroll(scroll);
  }

  productCard = (data) => {

    let click = {
      eventLbl: data.eventLbl,
      promotions: [{
        name : data.name,
        creative : data.creative,
        position : data.position,
      }],
    };
    console.log("productCard");
    console.log(click);
    this.populateClick(click);
  }

  populateConf = (data) => {
    window.dataLayer.push({
      event: 'virtual_page',
      pageName: data.pageName,
    });
  }

  populateClick = (data) => {
    window.dataLayer.push({
      event: 'eventoEC',
      eventCat: 'ecommerce',
      eventAct: 'promocionClick',
      eventLbl: data.eventLbl,
      ecommerce: {
        promoClick: {
          promotions: data.promotions,
        }
      }
    });
  }

  populateScroll = (data) => {
    window.dataLayer.push({
      event: 'eventoEC',
      eventCat: 'ecommerce',
      eventAct: 'promocionImpresion',
      eventLbl: data.eventLbl,
      noInteraction: true,
      ecommerce: {
        promoView: {
          promotions: data.promotions,
        }
      }
    });
  }
}

export {
  analitycs,
};
