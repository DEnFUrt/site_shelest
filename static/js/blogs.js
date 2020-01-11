//CONSTANTS

const templateCard = document.querySelector('#template-cards').content,
  blog = document.querySelector('.blog .row'),
  modal = document.querySelector('#exampleModalPosts'),
  modalTitle = modal.querySelector('#exampleModalPostsLabel'),
  modalText = modal.querySelector('.modal-body');
    
  //console.log(blog)


//SCRIPTS

// Load json
// fetch('https://denfurt.github.io/site_shelest/static/js/blogs.json')  
//   .then(  
//     function(response) {  
//       if (response.status !== 200) {  
//         console.log('Looks like there was a problem. Status Code: ' +  
//           response.status);  
//         return;  
//       }

//       // Examine the text in the response  
//       /* response.json().then(function(data) {  
//         console.table(data);  
//       }); */
//       const blogs = response.json(); 
//       console.log(blogs)
//     }  
//   )  
//   .catch(function(err) {  
//     console.log('Fetch Error :-S', err);  
//   });

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
  //let templateDivCarousel = templateItemCarousel.querySelector('.carousel-item');
  
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
  modalText.innerText = post.postText;

    $('#exampleModalPosts').modal('show').modal('handleUpdate'); //функция jquery из пакета bootstrap активирует модальное окно с каруселью
  });
}


