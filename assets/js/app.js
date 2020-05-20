import '../css/app.css';
import 'bootstrap';
import Swiper from 'swiper';
import { TweenMax, TimelineMax } from '../../node_modules/gsap/src/all.js';
import ScrollMagic from '../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { bysidecar } from './bysidecar';
import { analitycs } from './analitycs';
import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

document.addEventListener("DOMContentLoaded", function(event) {

  //Header shadow on document scroll greater than 0
  window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop != 0) {
      document.querySelector('.header').classList.add('shadow');
    } else {
      document.querySelector('.header').classList.remove('shadow');
    }
  });

  // Slider home
  var sliderHome = new Swiper('.swiper-home', {
    speed: 400,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // C2C on screen resize
  toggleC2cButton();
  function toggleC2cButton() {
    let screenWidth = window.innerWidth;

    if( screenWidth < 1720 ) {
      document.querySelector('.click-to-call-btn').classList.add('c2c-size-open');
      document.querySelector('.click-to-call-desktop').classList.add('c2c-collapsed');
    } else {
      document.querySelector('.click-to-call-btn').classList.remove('c2c-size-open');
      document.querySelector('.click-to-call-desktop').classList.remove('c2c-collapsed');
    }
  }

  $( window ).resize(function() {
    toggleC2cButton();
  });

  // Banner cookies //
  function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  if(getCookie("cookies") == null) {
    $('.cookies-banner').show();
  }

  if($(".accept-cookies").length) {
    $(".accept-cookies").click(function(){
      document.cookie = "cookies=accepted";
      $('.cookies-banner').hide();
    });
  }

  // Fullscreen menu (decomment when we turn on menu links on header menu)
  // if($(".close-menu").length) {
  //   $(".close-menu").click(function(){
  //     $(".fullscreen-navigation").fadeOut(200);
  //   });
  //   $(".nav-mobile").click(function(){
  //     $(".fullscreen-navigation").fadeIn(200);
  //   });
  // }

  if(document.querySelector('.fade-in')) {
    $('.fade-in').each(function(){
      var controllerFade = new ScrollMagic.Controller();
      var sceneFade = new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 0.8,
        reverse: false
      })
      .setClassToggle(this, "show")
      // .addIndicators({ name: "pin scene", colorEnd: "#FFFFFF" })

      controllerFade.addScene(sceneFade);

    });
  }

  //Pin card functionality
  if(document.getElementById('pincard')) {
    var controller = new ScrollMagic.Controller();

    var scene = new ScrollMagic.Scene({
        triggerElement: '#triggerpincard',
        triggerHook: 0,
        offset: 0.5,
        duration: $('#pincard').closest('div.row').height() - $('#pincard').height(),
    })
      .setClassToggle("body", "pinactive")
      .on('start', function () {})
      // .addIndicators({ name: "pin scene", colorEnd: "#FFFFFF" })
      .setPin("#pincard");

    controller.addScene(scene);

    //Recalculate pin position on resize device screen
    window.onresize = function() {
      scene.removePin(true);
      scene.setPin('#pincard');
      scene.refresh();
    }
  }

  ////////////////////// C2C ////////////////////////////////////////////

  let C2cDeskop = document.querySelector('.click-to-call-desktop');
  let C2cMobile = document.querySelector('.click-to-call-mobile');
  let closeC2cDeskop = document.querySelector('.click-to-call-desktop .close-c2c');
  // let closeC2cMbile = document.querySelector('.click-to-call-mobile .close-c2c');
  let C2cSide = document.querySelector('.click-to-call-btn');
  let C2cMobileHeader = document.querySelector('.click-to-call-mobile .click-to-call--header');

  // close c2cDesktop when calling modalC2C
  $('#click-to-call-popup').on('shown.bs.modal', function (e) {
    closeC2C();
  })

  closeC2cDeskop.addEventListener('click', (event) => {
    closeC2C();
  });

  C2cSide.addEventListener('click', (event) => {
    C2cDeskop.classList.remove('c2c-collapsed');
    C2cSide.classList.remove('c2c-size-open');
  });

  C2cMobileHeader.addEventListener('click', (event) => {
    if(C2cMobile.classList.contains('c2c-mobile-open')) {
      C2cMobile.classList.remove('c2c-mobile-open');
      document.querySelector('.click-to-call-mobile .close-c2c').classList.add('d-none');
    } else {
      C2cMobile.classList.add('c2c-mobile-open');
      document.querySelector('.click-to-call-mobile .close-c2c').classList.remove('d-none');
    }
  });

  function closeC2C() {
    C2cDeskop.classList.add('c2c-collapsed');
    C2cSide.classList.add('c2c-size-open');
  }

  let c2c = new bysidecar();
  let anlt = new analitycs();
  let phone = null;
  let smartcenter = process.env.PRODUCTION;
  let souid = parseInt(process.env.SOUID, 10);

  const dataLayer = {
    event: "event",
    eventCategory: "cmb",
    eventAction: "click",
    eventLabel: window.location.pathname === '/' ? 'index' : window.location.pathname ,
  }

  // get values from route to set product / landing adeslas object values
  let adeslas = {
    landing: null,
    product: null,
  }

  let lv = document.getElementById('landing-value');
  if(lv !== undefined && lv !== null){
    if (lv.value !== null && lv.value !== ''){
      adeslas.landing = lv.value;
    }
  }
  let pv = document.getElementById('product-value');
  if(pv !== undefined && pv !== null){
    if (pv.value !== null && pv.value !== ''){
      adeslas.product = pv.value;
    }
  }

  let c2cpopup_desktop = document.querySelector('.click-to-call--body.c2cdesktop .call-me-now');
  c2cpopup_desktop.onclick = (e) => {
    e.preventDefault();

    if(validationFields(".click-to-call--body.c2cdesktop")){
      const dataLead = {
        sou_id: souid,
        phone: phone,
        smartcenter: smartcenter,
        adeslas: adeslas,
      };
      if(adeslas.product === null && adeslas.landing === null) {
        delete dataLead.adeslas;
      }

      c2c.launchC2C(dataLead, dataLayer);
    }
  }

  let c2cpopup_mobile = document.querySelector('.click-to-call--body.c2cmobile .call-me-now');
  c2cpopup_mobile.onclick = (e) => {
    e.preventDefault();

    if(validationFields(".click-to-call--body.c2cmobile")){
      const dataLead = {
        sou_id: souid,
        phone: phone,
        smartcenter: smartcenter,
        adeslas: adeslas,
      };
      if(adeslas.product === null && adeslas.landing === null) {
        delete dataLead.adeslas;
      }

      c2c.launchC2C(dataLead, dataLayer);

      if(C2cMobile.classList.contains('c2c-mobile-open')) {
        C2cMobile.classList.remove('c2c-mobile-open');
        document.querySelector('.click-to-call-mobile .close-c2c').classList.add('d-none');
      }
    }
  }

  let c2cpopup_modal = document.querySelector('.click-to-call--body.c2cmodal .call-me-now');
  c2cpopup_modal.onclick = (e) => {
    e.preventDefault();

    if(validationFields(".click-to-call--body.c2cmodal")){
      const dataLead = {
        sou_id: souid,
        phone: phone,
        smartcenter: smartcenter,
        adeslas: adeslas,
      };
      if(adeslas.product === null && adeslas.landing === null) {
        delete dataLead.adeslas;
      }

      c2c.launchC2C(dataLead, dataLayer);
      $('#click-to-call-popup').modal('hide');
    }
  }


  function validationFields(parent) {
    let text = document.querySelector(parent +' .call-me-now-validation-error');
    if(!c2c.getLandingCommander().checkPhone(document.querySelector(parent +' .form-control').value)){
      text.classList.remove('d-none');
      text.textContent = "El número de teléfono no es válido";
      return;
    }

    if(!checkCheckbox(document.querySelector(parent +' .form-check-input'))){
      text.classList.remove('d-none');
      text.textContent = "Debes aceptar la política de privacidad";
      return;
    }
    phone = document.querySelector(parent +' .form-control').value;
    text.classList.add('d-none');
    return true;
  }

  function checkCheckbox(checkBox) {
    if (checkBox.checked == false){
      return false;
    }
    return true;
  }

  ////////////////////// SLIDER ////////////////////////////////////////////

  let ctas = document.querySelectorAll('*[id^="cta-"]');

  ctas.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      event.preventDefault();

      let id = event.target.id;
      let cta = document.getElementById(id);
      let action = cta.getAttribute('data-action');
      let data = {
        // name: id.replace('cta-', ''),
        creative: id.replace('cta-', ''),
        position: cta.getAttribute('data-position'),
      };

      switch(action) {
        case 'open-conf':
          anlt.slider(data);
          document.getElementById('explicitOriginalTarget').value = 1;

          // simulate a click on salud box; amazing!
          eventFire(document.getElementById('product-salud'), 'click');
          break;
        case 'open-c2c':
          anlt.slider(data);

          $('#click-to-call-popup').modal('show');
          closeC2C();
          break;
        default:
          anlt.slider(data);

          window.location.href = event.target.parentNode.href;
          break;
      }
    })
  });

  // view|scroll events
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting === true){
        let idob = entry.target.id;
        getDataSlider(idob)
          .then((result) => {
            anlt.sliderScroll(result);
          })
          .catch((error) => { console.log(error); });
      }
    });
  },
  {rootMargin: "0px 0px -200px 0px"});

  document.querySelectorAll('*[id^="cta-"]').forEach(slide => {observer.observe(slide)});

  ////////////////////// MORE-INFO ////////////////////////////////////////////

});


function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function getDataSlider(slide) {
  const urlEndPoint = '/data-slider';
  let params = {
    slide: slide,
  }

  return new Promise((resolve, reject) => {
    landingCommander.makePostRequestFormData(params, urlEndPoint)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {reject(error);})
  });
}

