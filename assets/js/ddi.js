document.addEventListener("DOMContentLoaded", function(event) {
  let ddi = document.querySelector('.ddi-button');
  console.log(ddi);
  ddi.addEventListener('click', (e) => {
    console.log('clicked ddi');
  });
});