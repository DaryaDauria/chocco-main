


// $(".products-menu__title").on("click", e => {
//   e.preventDefault();
// })

// document.querySelector('.products-menu').addEventListener('click', (e) => { 

//   const trigger = e.target.closest('[data-trigger]')

//  if (!trigger) return

//  const iten = trigger.parentNode

// if (iten.classList.contains('active')){
//   closeIten(iten)
// } else {
//   closeActiveIten(iten)
//   openIten(iten)
// }
// })

// function closeActiveIten(iten){
//   const list = iten.parentNode
// const active =  list.querySelector('.active')


// if (active) {
//   closeIten(active)
// }

// }

// function openIten(iten){
//   const contentWrap = iten.querySelector('[data-open]')
//   const content = contentWrap.firstElementChild
//   const openWidth = calcWidth(iten)
 

// content.style.minWidth = `${openWidth}px`

// contentWrap.style.width = `${openWidth}px`

// iten.classList.add('active')
// }
// function closeIten(iten){
//   const contentWrap = iten.querySelector('[data-open]')

//   contentWrap.style.width = 0
// iten.classList.remove('active')
// }

// function calcWidth(iten){
//   const list = iten.parentNode
//   const windowWidth = window.innerWidth
//   const triggers = list.querySelectorAll('[data-trigger]')
//   const triggersWidth = triggers[0].clientWidth * triggers.length
//   const isMobile = window.matchMedia('max-width: 768px').matches
 
// if (isMobile) {
//   return windowWidth - triggersWidth
// }

//   return 500
// };

// $(".products-menu__close").on('click', e => {
//   closeIten($('.products-menu'));

// })



const mesureWidth = (iten) => {
  let reqItenWidth = 0;

  const screenWidth = $(window).width();
  const container = iten.closest(".products-menu");
  const titlesBlocks = container.find(".products-menu__title");
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

const textContainer = iten.find(".products-menu__container");
const paddingLeft = parseInt(textContainer.css("padding-left"));
const paddingRight = parseInt(textContainer.css("padding-right"));

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  reqItenWidth = screenWidth - titlesWidth;
} else {
  reqItenWidth = 500;
}

return {
  container: reqItenWidth,
  textContainer: reqItenWidth - paddingRight - paddingLeft
}
 
};

const closeEveryItenInContainer = (container) => {
  const itens = container.find(".products-menu__iten");

  const content = container.find(".products-menu__content");

  itens.removeClass("active");
  content.width(0);
}

const openIten = (iten) => {
  const hiddenContent = iten.find(".products-menu__content");
  const reqWidth = mesureWidth(iten);
  const textBlock = iten.find(".products-menu__container");

  iten.addClass("active");
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
};


$(".products-menu__title").on("click", e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const iten = $this.closest(".products-menu__iten");
  const itenOpened = iten.hasClass("active");
const container = $this.closest(".products-menu");

  if (itenOpened) {
    closeEveryItenInContainer(container);
  } else {
    closeEveryItenInContainer(container);
    openIten(iten);
  }
 
});

$(".products-menu__close").on("click", e => {
  e.preventDefault();

  closeEveryItenInContainer($(".products-menu"))
});