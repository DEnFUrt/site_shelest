//CONSTANTS
const portfolios = document.querySelectorAll('.portfolio img'),
  templateCarousel = document.querySelector('#template-carousel').content,
  carousel = document.querySelector('.carousel > .carousel-inner');


//SCRIPTS

function addItemCarousel(imgPortfolio, numberImg) {
  let templateItemCarousel = templateCarousel.cloneNode(true);
  let templateImgCarusel = templateItemCarousel.querySelector('img');
  let templateDivCarousel = templateItemCarousel.querySelector('.carousel-item');
  templateImgCarusel.src = imgPortfolio.getAttribute('src');
  templateDivCarousel.setAttribute('data-number', numberImg);
  carousel.appendChild(templateItemCarousel);
}

function addImgPortfolioListener(imgPortfolio, numberImg) {
  imgPortfolio.addEventListener('click', () => {
    carousel.querySelector(`div[data-number = "${numberImg}"]`).classList.add('active');
    $('#exampleModalCarousel').modal('show').modal('handleUpdate'); //функция jquery из пакета bootstrap активирует модальное окно с каруселью
  });
}

for (let i = 0; i < portfolios.length; i++) {
  let portfolio = portfolios[i];
  addItemCarousel(portfolio, i);
  addImgPortfolioListener(portfolio, i);
}

$("#exampleModalCarousel").on('hidden.bs.modal', function() {         //функция jquery из пакета bootstrap реагирует на закрытие карусели
  carousel.querySelector(`div + .active`).classList.remove('active');
});
