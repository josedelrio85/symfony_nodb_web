import '../css/app.css';
import 'bootstrap';
import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';

document.addEventListener("DOMContentLoaded", function(event) {

  let mainelements = document.getElementById('mainelements');
  let firstchildrens = document.getElementById('firstchildrens');
  let secondchildrens = document.getElementById('secondchildrens');

  let productdivs = document.querySelectorAll('*[id^="product-"]');
  productdivs.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      // be careful when more elements are added to the card, maybe the id is not caputred properly
      let id = event.target.parentNode.id;

      // hide mainelements div
      mainelements.classList.add('hidden');

      // show first childrens div
      firstchildrens.classList.remove('hidden');

      // get id suffix to know what first child must show
      let childrenid = id.replace('product-','');
      document.getElementById('fc-' + childrenid).classList.remove('hidden');
    });
  })

  let fcdivs = document.querySelectorAll('*[id^="fc-"]');
  fcdivs.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      // be careful when more elements are added to the card, maybe the id is not caputred properly

      // get id suffix to know what second child must show
      let idfc = event.target.parentNode.id;
      let secondchildrenid = idfc.replace('sc-','');

      let secondchildrenelement = document.getElementById('sc-' + secondchildrenid);
      if(secondchildrenelement != null){

        // hide firstchildrens div
        firstchildrens.classList.add('hidden');

        // show secondchildrens div
        secondchildrens.classList.remove('hidden');

        // show elements of secondchildren div too
        secondchildrenelement.classList.remove('hidden');
      }
    });
  })

  let back = document.querySelectorAll('*[id^="back-"]');
  back.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {

      let parentNode = event.target.parentNode;
      if(parentNode.id === "firstchildrens"){
        // if parentNode is firstchildrens, show mainelements
        mainelements.classList.remove('hidden');
      } else if (parentNode.id === "secondchildrens") {
        // if parentNode is secondchildrens, show firstchildrens
        firstchildrens.classList.remove('hidden');
      }

      let test = parentNode.id;
      document.getElementById(test).classList.add('hidden');

      // hide all elementos of actual node except back-X
      for (let item of parentNode.children) {
        if(!item.id.includes('back-')){
          item.classList.add('hidden');
        }
      }
    });
  })

  let launch = document.querySelectorAll('.launch');
  launch.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      // let id = event.target.id;
      // console.log(event);
      
      // TODO decide what to do when a element with path is clicked. href?
    });
  });

  function getData(id) {
    const urlEndPoint = '/first-children';
    console.log(id);

    let params = {
      element: id.replace('product-',''),
    }

    return new Promise((resolve, reject) => {
      landingCommander.makePostRequestFormData(params, urlEndPoint)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {reject(error);})
    });
  }

  // getData(id)
  //   .then((result) => {
  //     console.log(result.response);
  //     let mainproducts = document.getElementById('mainproducts');
  //     mainproducts.classList.add('hidden');
  //     document.getElementById('level2').innerHTML = result.response;
  //   })
  //   .catch((error) => { console.log(error); });
});