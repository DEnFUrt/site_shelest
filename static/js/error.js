export default function addErrElem(hendlerElem) {

  const errElem = `<div class="error-elem"><div class="content">
    <div><p class="lead">Обрыв связи...</p></div>
    <div><a href="/">Перезагрузите страницу</a></div></div></div>`;
  
  hendlerElem.innerHTML = errElem;
}
