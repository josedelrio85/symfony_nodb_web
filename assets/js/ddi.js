document.addEventListener("DOMContentLoaded", function(event) {

  let ddi = document.querySelector('.ddi-desktop');
  ddi.addEventListener('click', (e) => {
    $('#click-to-call-popup').modal('show');
    
    let C2cDeskop = document.querySelector('.click-to-call-desktop');
    let C2cSide = document.querySelector('.click-to-call-btn');

    C2cDeskop.classList.add('c2c-collapsed');
    C2cSide.classList.add('c2c-size-open');
  });

//   let ddimobile = document.querySelector('.ddi-mobile');
//   ddimobile.addEventListener('click', (e) => {
//     e.preventDefault();

//     window.dataLayer = window.dataLayer || [];
//     const dataLayer = {
//       event: "event",
//       eventCategory: "ddi",
//       eventAction: "click",
//       eventLabel: window.location.pathname === '/' ? 'index' : window.location.pathname ,
//     }
//     window.dataLayer.push(dataLayer);

//     let href = null;
//     if (e.target.nodeName === "A") {
//       href = e.target.href;
//     } else if(e.target.nodeName === "SPAN") {
//       href = e.target.parentNode.href;
//     }
    
//     setTimeout(() => {
//       window.location.href = href;
//     }, 1000);
//   });
});