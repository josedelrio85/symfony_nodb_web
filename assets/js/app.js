import '../css/app.css';
import 'bootstrap';
import Swiper from 'swiper';
import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';

document.addEventListener("DOMContentLoaded", function(event) {

  // Click to call
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

      fullScreenConfig.classList.add('active');

      // show first childrens div
      firstchildrens.classList.remove('d-none');

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
      let childrenid = id.replace('product-','');

      // initialize steps bar and get totalsteps count
      totalsteps = document.getElementById('steps-' + childrenid).value;
      fillProgressBar(totalsteps);

      document.getElementById('fc-' + childrenid).classList.remove('d-none');
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

        let secondchildrenelement = document.getElementById('sc-' + idfc);
        // console.log(secondchildrenelement);
        if(secondchildrenelement != null){
          // hide firstchildrens div
          firstchildrens.classList.add('d-none');
          // show secondchildrens div
          secondchildrens.classList.remove('d-none');
          // show elements of secondchildren div too
          secondchildrenelement.classList.remove('d-none');
          
          console.log("b");
          updateSteps(true);

          backvalue = 'sc-' + idfc;
        }
    });
  })

  closeButton.addEventListener('click', (event) => {
    reset();
  });

  let scdivs = document.querySelectorAll('*[id^="sc-"]');

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

      console.log("c");
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

  // let launch = document.querySelectorAll('.launch');
  // launch.forEach((cv, ci, listObj) => {
  //   cv.addEventListener('click', (event) => {
  //     // let id = event.target.id;
  //     // console.log(event);
      
  //     // TODO decide what to do when a element with path is clicked. href?
  //   });
  // });

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