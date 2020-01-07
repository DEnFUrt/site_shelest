//CONSTANTS
const portfolios = document.querySelectorAll('.portfolio img');
//console.log(portfolio);
const templateCarousel = document.querySelector('#template-carousel').content;
//console.log(templateCarousel);
const carousel = document.querySelector('.carousel > .carousel-inner');
//console.log(carousel);

//SCRIPTS

function addItemCarousel(imgPortfolio, numberImg) {
  let templateItemCarousel = templateCarousel.cloneNode(true);
  let templateImgCarusel = templateItemCarousel.querySelector('img');
  let templateDivCarousel = templateItemCarousel.querySelector('.carousel-item');
  //console.log(imgPortfolio);
  templateImgCarusel.src = imgPortfolio.getAttribute('src');
  templateDivCarousel.setAttribute('data-number', numberImg);
  //console.log(templateImgCarusel)
  carousel.appendChild(templateItemCarousel);
}

function addImgPortfolioListener(imgPortfolio, numberImg) {
  imgPortfolio.addEventListener('click', () => {
    carousel.querySelector(`div[data-number = "${numberImg}"]`).classList.add('active');
    $('#exampleModalCarousel').modal('show');
  });
}

for (let i = 0; i < portfolios.length; i++) {
  let portfolio = portfolios[i];
  addItemCarousel(portfolio, i);
  addImgPortfolioListener(portfolio, i);
}

$("#exampleModalCarousel").on('hidden.bs.modal', function(){
  carousel.querySelector(`div + .active`).classList.remove('active');
});
