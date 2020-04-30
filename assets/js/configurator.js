import { analitycs } from './analitycs';
import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';

//////////////////////  CONFIGURATOR   /////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function(event) {
  //Hide configurator loader if user come from browser back button
  window.onpageshow = function(event) {
    if (event.persisted) {
      if($(".fullscreen-loader").hasClass("active")) {
        $(".fullscreen-loader").removeClass("active");
      }
    }
  };

  let closeButton = document.querySelector('.close-button');
  let fullScreenConfig = document.querySelector('.fullscreen-product-config');
  let fullScreenLoader = document.querySelector('.fullscreen-loader');

  let firstchildrens = document.querySelector('#firstchildrens');
  let secondchildrens = document.getElementById('secondchildrens');
  let backvalue = null;
  let totalsteps = null;
  let actualsteps = 1;
  let titlesection = document.querySelector('.product-config .text-header');
  let previoustext = null;
  let childrenid = null;
  let idfc = null;
  let idsc = null;

  let anlt = new analitycs();
  let eot = null;

  let productdivs = document.querySelectorAll('*[id^="product-"]');
  productdivs.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      
      eot = document.getElementById('explicitOriginalTarget').value;
      titlesection.innerHTML = document.getElementById('fc_suptitle').value;

      // be careful when more elements are added to the card, maybe the id is not caputred properly
      let id = null;
      if(event.target.nodeName === 'H5' || event.target.nodeName === "SPAN") {
        id = event.target.parentNode.parentNode.id;
      } else if(event.target.classList.contains('inner')){
        id = event.target.parentNode.id;
      } else {
        id = event.target.id;
      }

      // get id suffix to know what first child must show
      // childrenid = salud | dental | mascotas | decesos
      childrenid = id.replace('product-','');

      // analytics
      let anlt_data = {
        eventLbl: (eot == 1) ? 'home-slider' : 'home-body',
        name: (eot == 1) ? 'home-slider' : 'home-body',
        creative: childrenid,
        position: document.getElementById(id).getAttribute('data-position'),
        vpv: childrenid,
      }
      anlt.configurator(anlt_data);

      getDataConfiguratorFC()
        .then((result) => {
          anlt.configuratorScrollFC(result);
        })
        .catch((error) => { console.log(error); });

      // if element has href attribute let's navigate
      let element = document.getElementById(id);
      if (element.getAttribute('href') !== null) {
        setTimeout((out) => {
          // show fullscreen loader
          fullScreenLoader.classList.add('active');
        }, 500);

        setTimeout((out) => {
          window.location.href = element.getAttribute('href');
        }, 2000);
      } else {

        document.getElementById('explicitOriginalTarget').value = 0;

        // show first childrens div
        firstchildrens.classList.remove('d-none');

        fullScreenConfig.classList.add('active');

        // show first childrens div
        firstchildrens.classList.remove('d-none');

        // initialize steps bar and get totalsteps count
        totalsteps = document.getElementById('steps-' + childrenid).value;
        fillProgressBar(totalsteps);

        document.getElementById('fc-' + childrenid).classList.remove('d-none');
      }
    });
  })

  let fcdivs = document.querySelectorAll('*[id^="fc-"]');
  fcdivs.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      
      // get id of element clicked
      if(event.target.nodeName === "H5" || event.target.nodeName === "SPAN") {
        idfc = event.target.parentNode.parentNode.id;
      } else if(event.target.classList.contains("justify-content-between")){
        idfc = event.target.parentNode.id;
      } else {
        idfc = event.target.id;
      }

      // analytics
      let anlt_data = {
        eventLbl: childrenid,
        name: childrenid,
        creative: idfc,
        position: document.getElementById(idfc).getAttribute('data-position'),
        vpv: childrenid + '/' + idfc,
      }
      anlt.configurator(anlt_data);
      
      getDataConfiguratorSC(idfc)
        .then((result) => {
          anlt.configuratorScrollSC(result);
        })
        .catch((error) => { console.log(error); });

      // get the suptitle value for this fc and set it. also remember the previous title
      let suptitle = document.getElementById('sc_suptitle_' + idfc).value;
      previoustext = titlesection.innerHTML;
      titlesection.innerHTML = suptitle;

      // if element has href attribute let's navigate
      let element = document.getElementById(idfc);
      if (element.getAttribute('href') !== null) {
        updateSteps(true);

        setTimeout((out) => {
          // show fullscreen loader
          fullScreenLoader.classList.add('active');
        }, 500);

        setTimeout((out) => {
          window.location.href = element.getAttribute('href');
        }, 2000);
      }

      let secondchildrenelement = document.getElementById('sc-' + idfc);
      if(secondchildrenelement != null){
        // hide firstchildrens div
        firstchildrens.classList.add('d-none');
        // show secondchildrens div
        secondchildrens.classList.remove('d-none');
        // show elements of secondchildren div too
        secondchildrenelement.classList.remove('d-none');

        updateSteps(true);

        backvalue = 'sc-' + idfc;
      }
    });
  })

  let scdivs = document.querySelectorAll('*[id^="sc-"]');
  scdivs.forEach((cv, ci, listObj) => {
    cv.childNodes.forEach((e, f, g) => {
      e.addEventListener('click', (event) => {
        
        updateSteps(true);

        // get id of element clicked
        if(event.target.nodeName === "H5" || event.target.nodeName === "SPAN") {
          idsc = event.target.parentNode.parentNode.id;
        } else if(event.target.classList.contains("justify-content-between")){
          idsc = event.target.parentNode.id;
        } else {
          idsc = event.target.id;
        }
        
        // analytics
        let anlt_data = {
          eventLbl: 'salud-' + idfc,
          name: 'salud-' + idfc,
          creative: idsc,
          position: document.getElementById(idsc).getAttribute('data-position'),
          sc: 'salud',
          vpv: 'salud/' + idfc + '/' + idsc,
        }
        anlt.configurator(anlt_data);


        setTimeout((out) => {
          // show fullscreen loader
          fullScreenLoader.classList.add('active');
        }, 500);

        // if element has href attribute let's navigate
        let element = document.getElementById(idsc);
        setTimeout((out) => {
          window.location.href = element.getAttribute('href');
        }, 2000);
      });
    });
  });

  closeButton.addEventListener('click', (event) => {
    reset();
  });

  let back = document.getElementById('back');
  back.addEventListener('click', (event) => {

    if (backvalue == null){
      reset();
      return
    }

    // set the previous suptitle
    let titlesection = document.querySelector('.product-config .text-header');
    titlesection.innerHTML = previoustext;

    if (backvalue.includes('sc-')){
      // back to firstchildren, hide secondchildren
      secondchildrens.classList.add('d-none');
      // hide elements of secondchildren
      scdivs.forEach((cv, ci, listObj) => {
        cv.classList.add('d-none');
      });

      // show firstchildren
      firstchildrens.classList.remove('d-none');

      updateSteps(false);

      backvalue = null;
    }
  });

  function reset() {
    actualsteps = 1;

    fullScreenConfig.classList.remove('active');
    fullScreenLoader.classList.remove('active');

    // hide all elements
    firstchildrens.classList.add('d-none');
    secondchildrens.classList.add('d-none');

    fcdivs.forEach((cv, ci, listObj) => {
      if (!cv.classList.contains('d-none')){
        cv.classList.add('d-none');
      }
    });

    scdivs.forEach((cv, ci, listObj) => {
      if (!cv.classList.contains('d-none')){
        cv.classList.add('d-none');
      }
    });
  }

  function updateSteps(go){
    if (go) {
      actualsteps++;
    } else {
      actualsteps--;
    }
    let steps = totalsteps/actualsteps;
    fillProgressBar(steps);
  }

  function fillProgressBar(steps) {
    document.querySelector(".bar").style.width = 100/steps + "%";
  }
  ///////////////////////////////////////////////////////////////////////////

  // view|scroll events
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting === true){
        getDataConfigurator()
          .then((result) => {
            anlt.configuratorScroll(result);
          })
          .catch((error) => { console.log(error); });
      }
    });
  },
  {rootMargin: "0px 0px -100px 0px"});

  observer.observe(document.querySelector('.product-selector'));
});

function getDataConfigurator() {
  const urlEndPoint = '/data-configurator';

  return new Promise((resolve, reject) => {
    landingCommander.makePostRequestFormData({}, urlEndPoint)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {reject(error);})
  });
}

function getDataConfiguratorFC() {
  const urlEndPoint = '/data-configurator-fc';

  return new Promise((resolve, reject) => {
    landingCommander.makePostRequestFormData({}, urlEndPoint)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {reject(error);})
  });
}

function getDataConfiguratorSC(idfc) {
  const urlEndPoint = '/data-configurator-sc';
  let params = {
    fc: idfc,
  }
  return new Promise((resolve, reject) => {
    landingCommander.makePostRequestFormData(params, urlEndPoint)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {reject(error);})
  });
}
