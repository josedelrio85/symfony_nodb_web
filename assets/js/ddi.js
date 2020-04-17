document.addEventListener("DOMContentLoaded", function(event) {
  let ddi = document.querySelector('.ddi-desktop');
  console.log(ddi);
  ddi.addEventListener('click', (e) => {
    console.log('must launch c2c popup');
  });

  // let ddimobile = document.querySelector('.ddi-mobile');
  // console.log(ddimobile);
  // ddimobile.addEventListener('click', (e) => {
  //   console.log('clicked ddi mobile');
  // });
});