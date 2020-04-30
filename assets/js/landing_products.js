import { landingCommander } from '../../node_modules/@bysidecar/landing_commander/dist/main';
import { analitycs } from './analitycs';
import { localeData } from 'moment';

////////////////////// ANALITICS PRODUCTS ///////////////////////////////////
document.addEventListener("DOMContentLoaded", function(event) {
  let anlt = new analitycs();

  let area = document.getElementById('area_hid').value;
  let family = document.getElementById('family_hid').value;
  let landing = document.getElementById('landing_hid').value;
  let intersecting = document.getElementById('intersecting').value;
  let moreinfo = document.querySelectorAll('.more-info');
  let params = {
    area: area,
    landing: landing,
    product1: null,
    product2: null,
  }

  moreinfo.forEach((cv, ci, listObj) => {
    cv.addEventListener('click', (event) => {
      event.preventDefault();

      let href = event.target.parentNode.href;
      let position = event.target.parentNode.getAttribute('data-index');
      position = position.replace('product','');
      // event.target.parentNode.getAttribute('data-parent')
      let name = area + '-' + family + '-' + landing;

      let data = {
        eventLbl: name,
        name: name,
        creative: event.target.parentNode.getAttribute('data-title'),
        position: position,
      };
      anlt.productCard(data);
      window.location.href = href;
    })
  });

  // view|scroll events
  let observerproduct = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      
      if(entry.isIntersecting === true){
        intersecting = 1;

        entry.target.childNodes.forEach((e) => {
          e.childNodes.forEach((z) => {
            if(z.id !== undefined){
              let id = z.id.replace('product', '');
              if (id % 2 === 0 ){
                params.product2 = z.id;
              }else {
                params.product1 = z.id;
              }
            }
          });
        });

        if(entry.target.childNodes.length === 3){
          params.product2 = null;
        }
      }else {
        intersecting = 0;
      }
    });

    if (intersecting === 1){    
      getDataProduct(params)
        .then((result) => {  
          let data = {
            eventLbl: null,
            products: [],
          };
  
          Object.keys(result).forEach(r => {
            let name = area + '-' + family + '-' + result[r].name;
            data.eventLbl = name;
            let d = {
              name: name,
              creative: result[r].creative,
              position: result[r].position,
            };
            data.products.push(d);
          });
  
          anlt.productScroll(data);
        })
        .catch((error) => { console.log(error); });
    }
  },
  {rootMargin: "0px 0px 0px 0px"});

  document.querySelectorAll('*[id^="product-row-"]').forEach(product => {observerproduct.observe(product)});
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


function old () {
          // let params = {
        //   area: area,
        //   landing: landing,
        //   product: entry.target.id,
        // }
        // getDataProduct(params)
        //   .then((result) => {
        //     let name = area + '-' + family + '-' + result.name;
        //     let data = {
        //       eventLbl: name,
        //       name: name,
        //       creative: result.creative,
        //       position: result.position,
        //     };
        //     // anlt.productScroll(data);
        //     lo.push(data);
        //   })
        //   .catch((error) => { console.log(error); });
}