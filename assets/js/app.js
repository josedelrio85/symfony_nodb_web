import '../css/app.css';
import 'bootstrap';
import Swiper from 'swiper';

import { TweenMax, TimelineMax } from '../../node_modules/gsap/src/all.js';
// import * as ScrollMagic from 'ScrollMagic';
// import '../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';
import ScrollMagic from '../../node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js';
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';

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


  let closeButton = document.querySelector('.close-button');
  let fullScreenConfig = document.querySelector('.fullscreen-product-config');

  // let mainelements = document.querySelector('#mainelements');
  let firstchildrens = document.querySelector('#firstchildrens');
  let secondchildrens = document.getElementById('secondchildrens');
  let backvalue = null;
  let totalsteps = null;
  let actualsteps = 1;

  let productdivs = document.querySelectorAll('*[id^="product-"]');
  productdivs.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {

      // be careful when more elements are added to the card, maybe the id is not caputred properly
      let id = null;
      if(event.target.nodeName === 'H5' || event.target.nodeName === "SPAN") {
        id = event.target.parentNode.parentNode.id;
      } else if(event.target.classList.contains('inner')){
        id = event.target.parentNode.id;
      } else {
        id = event.target.id;
      }
      console.log(id);
      // if element has href attribute let's navigate
      let element = document.getElementById(id);
      if (element.getAttribute('href') !== null) {
        reset();
        window.location.href = element.getAttribute('href');
      } else {

        fullScreenConfig.classList.add('active');

        // show first childrens div
        firstchildrens.classList.remove('d-none');
  
        // get id suffix to know what first child must show
        // childrenid = salud | dental | mascotas | decesos
        let childrenid = id.replace('product-','');
  
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
      let idfc = null;
      if(event.target.nodeName === "H5") {
        idfc = event.target.parentNode.parentNode.id;
      } else if(event.target.classList.contains("justify-content-between")){
        idfc = event.target.parentNode.id;
      } else {
        idfc = event.target.id;
      }
      
      // if element has href attribute let's navigate
      let element = document.getElementById(idfc);
      if (element.getAttribute('href') !== null) {
        updateSteps(true);

        setTimeout((out) => {
          // close telon
          fullScreenConfig.classList.remove('active');
        }, 500);

        setTimeout((out) => {
          reset();
          window.location.href = element.getAttribute('href');
        }, 1000);
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
        let idsc = null;
        if(event.target.nodeName === "H5") {
          idsc = event.target.parentNode.parentNode.id;
        } else if(event.target.classList.contains("justify-content-between")){
          idsc = event.target.parentNode.id;
        } else {
          idsc = event.target.id;
        }
        
        // if element has href attribute let's navigate
        let element = document.getElementById(idsc);
        setTimeout((out) => {
          // close telon
          fullScreenConfig.classList.remove('active');
        }, 500);

        setTimeout((out) => {
          reset();
          window.location.href = element.getAttribute('href');
        }, 1000);
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
    // console.log(backvalue);

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

  // function getData(id) {
  //   const urlEndPoint = '/first-children';
  //   console.log(id);

  //   let params = {
  //     element: id.replace('product-',''),
  //   }

  //   return new Promise((resolve, reject) => {
  //     landingCommander.makePostRequestFormData(params, urlEndPoint)
  //     .then((result) => {
  //       resolve(result);
  //     })
  //     .catch((error) => {reject(error);})
  //   });
  // }

  // // getData(id)
  // //   .then((result) => {
  // //     console.log(result.response);
  // //     let mainproducts = document.getElementById('mainproducts');
  // //     mainproducts.classList.add('d-none');
  // //     document.getElementById('level2').innerHTML = result.response;
  // //   })
  // //   .catch((error) => { console.log(error); });
});