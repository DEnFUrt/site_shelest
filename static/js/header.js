$(document).ready(function () {
  $('.header').height($(window).height());
})

$(".navbar a").click(function () {
  $("body,html").animate({
    scrollTop: $("#" + $(this).data('value')).offset().top
  }, 1000)

})

$(".description button").click(function () {
  $("body,html").animate({
    scrollTop: $("#" + $(this).data('value')).offset().top
  }, 1000)

})

//при нажатии на ссылку
$(".navbar-collapse a").click(function() {
  //если она не имеет класс dropdown-toggle
  if (!$(this).hasClass("dropdown-toggle")) {
    //то закрыть меню
    $(".navbar-collapse").collapse('hide');
  }
});

$("body").click(function() {
  //если она не имеет класс dropdown-toggle
  if (!$(this).hasClass("dropdown-toggle")) {
    //то закрыть меню
    $(".navbar-collapse").collapse('hide');
  }
});

// $(function() {
//   // путь текущей страницы
//   let pathPage = location.pathname.slice(1);
//   let parentUl = $(`.navbar-nav a[href*='${pathPage}']`).closest('li').addClass('active').parent('ul');
//   if (parent.closest('.navbar-nav li').length) {
//     parentUl.closest('li').addClass('active');
//   }
// });


