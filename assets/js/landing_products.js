import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';
import { analitycs } from './analitycs';

////////////////////// ANALITICS PRODUCTS ///////////////////////////////////
document.addEventListener("DOMContentLoaded", function(event) {
  let anlt = new analitycs();

  let area = document.getElementById('area_hid').value;
  let landing = document.getElementById('landing_hid').value;

  // view|scroll events
  let observerproduct = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting === true){
        let params = {
          area: area,
          landing: landing,
          product: entry.target.id,
        }
        getDataProduct(params)
          .then((result) => {
            anlt.productScroll(result);
          })
          .catch((error) => { console.log(error); });
      }
    });
  },
  {rootMargin: "0px 0px -50px 0px"});

  document.querySelectorAll('*[id^="product"]').forEach(product => {observerproduct.observe(product)});
});

function getDataProduct(params) {
  const urlEndPoint = '/data-product';

  return new Promise((resolve, reject) => {
    landingCommander.makePostRequestFormData(params, urlEndPoint)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {reject(error);})
  });
}
