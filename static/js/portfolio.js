import addErrElem from '../js/error.js';

//CONSTANTS
const templateAlbum = document.querySelector('#template-album').content,
  album = document.querySelector('#portfolio-row'),  
  templateCarousel = document.querySelector('#template-carousel').content,
  carousel = document.querySelector('.carousel > .carousel-inner');


//SCRIPTS

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function json(response) {  
  return response.json()  
}

fetch('findfile.php')  
  .then(status) 
  .then(json)  
  .then((data) => parseListFile(data))
  .catch(function(error) {  
    console.log('Request failed', error); 
    addErrElem(album);
  });

function parseListFile(filesImg) {
  filesImg.sort();
  for (let i = 0; i < filesImg.length; i++) {
    let fileImg = filesImg[i];
    addImgAlbum(fileImg, i);
    addItemCarousel(fileImg, i);    
  }
}

function addImgAlbum(fileImg, numberImg) {
  const templateItemAlbum = templateAlbum.cloneNode(true);
  const templateImgAlbum = templateItemAlbum.querySelector('img');
  
  templateImgAlbum.src = fileImg;
  templateImgAlbum.id = numberImg;
  album.appendChild(templateItemAlbum);
}

//Цикл перебора инлайновых элементов в index.html версия до 210120
/* for (let i = 0; i < portfolios.length; i++) {
  let portfolio = portfolios[i];
  addItemCarousel(portfolio, i);
  addImgPortfolioListener(portfolio, i);
} */

function addItemCarousel(imgPortfolio, numberImg) {
  const templateItemCarousel = templateCarousel.cloneNode(true);
  const templateImgCarusel = templateItemCarousel.querySelector('img');
  const templateDivCarousel = templateItemCarousel.querySelector('.carousel-item');
  
  //templateImgCarusel.src = imgPortfolio.getAttribute('src'); //версия до 210120
  templateImgCarusel.src = imgPortfolio;
  templateDivCarousel.setAttribute('data-number', numberImg);
  carousel.appendChild(templateItemCarousel);
}

// навешивание эвента на инлайновые элементы в index.html версия до 210120
/* function addImgPortfolioListener(imgPortfolio, numberImg) {
  imgPortfolio.addEventListener('click', () => {
    carousel.querySelector(`div[data-number = "${numberImg}"]`).classList.add('active');
    $('#exampleModalCarousel').modal('show').modal('handleUpdate'); //функция jquery из пакета bootstrap активирует модальное окно с каруселью
  });
} */

function handlerAlbum(e) {
  const target = e.target;
  if (target.nodeName === 'IMG') {
    carousel.querySelector(`div[data-number = "${target.id}"]`).classList.add('active');
    $('#exampleModalCarousel').modal('show').modal('handleUpdate'); //функция jquery из пакета bootstrap активирует модальное окно с каруселью
  }
}

album.addEventListener('click', handlerAlbum);

$('#exampleModalCarousel').on('hidden.bs.modal', function() {         //функция jquery из пакета bootstrap реагирует на закрытие карусели
  carousel.querySelector(`div + .active`).classList.remove('active');
});
