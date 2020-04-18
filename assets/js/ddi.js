document.addEventListener("DOMContentLoaded", function(event) {

  let ddi = document.querySelector('.ddi-desktop');
  ddi.addEventListener('click', (e) => {
    $('#click-to-call-popup').modal('show');

    let C2cDeskop = document.querySelector('.click-to-call-desktop');
    let C2cSide = document.querySelector('.click-to-call-btn');
    C2cDeskop.classList.add('c2c-collapsed');
    C2cSide.classList.add('c2c-size-open');
  });

  // let ddimobile = document.querySelector('.ddi-mobile');
  // console.log(ddimobile);
  // ddimobile.addEventListener('click', (e) => {
  //   console.log('clicked ddi mobile');
  // });
});