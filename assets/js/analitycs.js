
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
    let pageName = data.mc;
    if (data.fc !== null && data.fc != undefined) {
      pageName += "/" + data.fc;
    }
    if (data.sc !== null && data.sc != undefined) {
      pageName += "/" + data.sc;
    }

    let clickconf = {
      event: 'virtual_page',
      pageName: "/vpv/" + pageName,
    }
    // console.log("configurator vpv");
    this.populateConf(clickconf);

    //////////////////////////////////////////

    let click = {
      eventLbl: 'home-body',
      promotions: [{
        name : data.eventLbl,
        creative : pageName,
        position : data.position,
      }],
    };

    // console.log("configurator");
    this.populateClick(click);
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
          name : data[key].creative,
          creative : data[key].creative,
          position : data[key].position,
        }
        scroll.eventLbl = promo.name;
        scroll.promotions.push(promo);
      };
    });
    // console.log("configuratorScrollFC");
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
          name : data[key].name,
          creative : data[key].creative,
          position : data[key].position,
        }
        scroll.eventLbl = data[key].name;
        scroll.promotions.push(promo);
      };
    });
    // console.log("configuratorScrollSC");
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
    scroll.eventLbl = data.name;
    scroll.promotions.push(promo);

    // console.log("productScroll");
    this.populateScroll(scroll);
  }

  productCard = (data) => {

    let click = {
      eventLbl: data.label,
      promotions: [{
        name : data.name,
        creative : data.creative,
        position : data.position,
      }],
    };
    // console.log("productCard");
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
    // console.log("data");
    // console.log(data);
    // console.log("dataLayer");
    // console.log(window.dataLayer);
    // console.log("---------------");
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
    // console.log("data");
    // console.log(data);
    // console.log("dataLayer");
    // console.log(window.dataLayer);
    // console.log("---------------");
  }
}

export {
  analitycs,
};
