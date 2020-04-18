import '../css/app.css';
import 'bootstrap';
import Swiper from 'swiper';
import { bysidecar } from './bysidecar';
import { TweenMax, TimelineMax } from '../../node_modules/gsap/src/all.js';
// import * as ScrollMagic from 'ScrollMagic';
// import '../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import ScrollMagic from '../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

document.addEventListener("DOMContentLoaded", function(event) {

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
  
  // Fullscreen menu (decomment when we turn on menu links on header menu)
  // if($(".close-menu").length) {
  //   $(".close-menu").click(function(){
  //     $(".fullscreen-navigation").fadeOut(200);
  //   });
  //   $(".nav-mobile").click(function(){
  //     $(".fullscreen-navigation").fadeIn(200);
  //   });
  // }

  if(document.getElementById('pincard')) {
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
        triggerElement: '#triggerpincard',
        triggerHook: 0,
        offset: 0.5
    })
      .setClassToggle("body", "pinactive")
      .on('start', function () {
          // console.log("passed trigger");
      })
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
  let closeC2cMbile = document.querySelector('.click-to-call-mobile .close-c2c');
  let C2cSide = document.querySelector('.click-to-call-btn');
  let C2cMobileHeader = document.querySelector('.click-to-call-mobile .click-to-call--header');

  closeC2cDeskop.addEventListener('click', (event) => {
    C2cDeskop.classList.add('c2c-collapsed');
    C2cSide.classList.add('c2c-size-open');
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


  let c2c = new bysidecar();
  let phone = null;
  let smartcenter = process.env.PRODUCTION;
  let souid = process.env.SOUID;

  let c2cpopup_desktop = document.querySelector('.click-to-call--body.c2cdesktop .call-me-now');
  c2cpopup_desktop.onclick = (e) => {
    e.preventDefault();

    if(validationFields(".click-to-call--body.c2cdesktop")){
      const dataLead = {
        sou_id: souid,
        phone: phone,
        smartcenter: smartcenter,
      };

      const dataLayer = {
        eventCategory: "cmb",
        eventAction: "click",
        eventLabel: "ClickToCall",
        event: "cmb",
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
      };

      const dataLayer = {
        eventCategory: "cmb",
        eventAction: "click",
        eventLabel: "ClickToCall",
        event: "cmb",
      }

      c2c.launchC2C(dataLead, dataLayer);
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
      };

      const dataLayer = {
        eventCategory: "cmb",
        eventAction: "click",
        eventLabel: "ClickToCall",
        event: "cmb",
      }

      c2c.launchC2C(dataLead, dataLayer);
    }
  }


  function validationFields(parent) {
    // dev
    // document.querySelector(parent +' .form-control').value = '665932355';
    // document.querySelector(parent +' .form-check-input').checked = true;

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
});