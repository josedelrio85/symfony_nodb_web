import '../css/app.css';
import 'bootstrap';
import Swiper from 'swiper';
import { bysidecar } from './bysidecar';

document.addEventListener("DOMContentLoaded", function(event) {

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

  let c2cpopup = document.querySelector('.click-to-call--body .call-me-now');
  c2cpopup.onclick = () => {
    if(validationFields(".click-to-call--body")){
      const dataLead = {
        sou_id: 15,
        phone: phone,
        smartcenter: false,
      };
      console.log(dataLead);

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
  ////////////////////////////////////////////////////////////////////////////////////////
});