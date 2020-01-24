import addErrElem from '../js/error.js';

//CONSTANTS

const templateCard = document.querySelector('#template-cards').content,
  blog = document.querySelector('.blog .row'),
  modal = document.querySelector('#exampleModalPosts'),
  modalTitle = modal.querySelector('#exampleModalPostsLabel'),
  modalPicture = modal.querySelector('.modal img'),
  modalText = modal.querySelector('.modal-body p'),
  modalEmbed = modal.querySelector('#embed'),
  modalFrame = modal.querySelector('iframe');
    
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

fetch('static/js/blogs.json')  
  .then(status)  
  .then(json)  
  .then(function(data) {  
    parseJson(data.posts);  
  }).catch(function(error) {  
    console.log('Request failed', error);
    addErrElem(blog);
  });

function parseJson (posts) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    addCard(post);
  }
}

function addCard(post) {
  let templateNewCard = templateCard.cloneNode(true);
  let templateImgNewCard = templateNewCard.querySelector('img');
  let templateTitleNewCard = templateNewCard.querySelector('.card-title');
  let templateTextNewCard = templateNewCard.querySelector('.card-text');
  let templateLinkNewCard = templateNewCard.querySelector('.card-link');
    
  templateImgNewCard.src = post.srcImg;
  templateTitleNewCard.innerText = post.cardTitle;
  templateTextNewCard.innerText = post.cardTetx;
  
  addCardListener(templateLinkNewCard, post);

  blog.appendChild(templateNewCard);
}

function addCardListener(linkCard, post) {
  linkCard.addEventListener('click', (e) => {
  e.preventDefault();
    //addContentModal
  modalTitle.innerText = post.cardTitle;
  modalPicture.src = post.srcImg;
  modalText.innerText = post.postText;
  
  if (post.VideoOn === 'on') {
    modalFrame.src = post.srcVideo;
    setOnEmbed(modalEmbed);
  } else {
    setOffEmbed(modalEmbed);
  }

    $('#exampleModalPosts').modal('show').modal('handleUpdate'); //функция jquery из пакета bootstrap активирует модальное окно
  });
}

function setOffEmbed(inputTarget) {
  if (!inputTarget.classList.contains('d-none')) {
      inputTarget.classList.toggle('d-none');
  }
}

function setOnEmbed(inputTarget) {
  if (inputTarget.classList.contains('d-none')) {
      inputTarget.classList.toggle('d-none');
  }
};

$('#exampleModalPosts').on('hidden.bs.modal', function () {
  modalFrame.src = '';
})
  