let hamburger = document.querySelector('.hamburger');

let overlay = document.querySelector('.overlay');
// let body = document.querySelector('body');




let links = document.querySelectorAll('.menu__link-overlay');

links.forEach(function(element){
  element.addEventListener('click' , toggleMenu);
})

function toggleMenu(){
  hamburger.classList.toggle('hamburger--active');
  overlay.classList.toggle('overlay--active');
//  body.classList.toggle('body--active-menu');

}

hamburger.addEventListener('click' , toggleMenu);
;// let myMap;
//  const init = () => {

// myMap = new ymaps.Map("map", {
//   center: [55.76, 37.64],
 
//   zoom: 11,
//   controls: []
// });

// const coords = [

// ];

// const myCollection = new ymaps.GeoObjectCollection({}, {
//   draggable: false,
//   iconLayout: 'default#image',
//   iconImageHref: './image/marker.svg',
//   iconImageSize: 
//   iconImageOffset: 
// });

// for (let i = 0; i < coords.length; i++) {
//   myCollection.add(new ymaps.Placemark(coords[i]));
// }

// myMap.geoObjects.add(myCollection);

// myMap.behaviors.disable('scrollZoom');
// };

// ymaps.ready(init);


let myMap;
const init = () => {
 myMap = new ymaps.Map("map", {
   center: [59.93916998692174, 30.309015096732622],
   zoom: 11,
   controls: [],
 });
 
 let coords = [
     [59.94554327989287, 30.38935262114668],
     [59.91142323563909, 30.50024587065841],
     [59.88693161784606, 30.319658102103713],
     [59.97033574821672, 30.315194906302924],
   ],
   myCollection = new ymaps.GeoObjectCollection({}, {
     draggable: false,
     iconLayout: 'default#image',
     iconImageHref: '../image/marker.svg',
     iconImageSize: [46, 57],
     iconImageOffset: [-35, -52]
   });
 
 for (let i = 0; i < coords.length; i++) {
   myCollection.add(new ymaps.Placemark(coords[i]));
 }
 
 myMap.geoObjects.add(myCollection);
 
 myMap.behaviors.disable('scrollZoom');
};
 
ymaps.ready(init);
;function validateFields(form, fieldsArray) {

  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if (field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$('.form').submit(e => {
  e.preventDefault();


const form = $(e.currentTarget);
const name = form.find("[name='name']");
const phone = form.find("[name='phone']");
const comment = form.find("[name='comment']");
const to = form.find("[name='to']");

const modal = $("#modal");
const content = modal.find(".modal__content");
modal.removeClass("error-modal");

const isValid = validateFields(form, [name, phone, comment, to]);

if (isValid) {
  $.ajax({
    url: "https://webdev-api.loftschool.com/sendmail",
    method: "post",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val(),
    },

    success: data => {
      content.text(data.message)

 
$. fancybox.open({
  src: "#modal",
  type: "inline"
 
})

document.getElementById('row').value = '';
document.getElementById('rot').value = '';
document.getElementById('rol').value = '';
document.getElementById('ror').value = '';
document.getElementById('ros').value = '';
document.getElementById('roz').value = '';
document.getElementById('rox').value = '';
document.getElementById('rov').value = '';




    },
     error: data => {
       const message = data.responseJSON.message;
       content.text(message);
       modal.addClass("error-modal");
    

       $. fancybox.open({
        src: "#modal",
        type: "inline"

       
      });

     }
   });
}

 


    
  
});

$(".app-close-modal").click(e => {
  e.preventDefault();

$.fancybox.close();



});;const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find("fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
const position = sectionEq * -100;

if (isNaN(position)) {
  console.error("передано неверное значение");
  return 0;
}

  return position;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
   const activeClass = ("fixed-menu--shadowed")
    
    if (menuTheme == "black"){
      sideMenu.addClass(activeClass);
    
    } else {
      sideMenu.removeClass("fixed-menu--shadowed");
    }
};


const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass)
}

const performTransition = sectionEq => {
  if (inScroll) return;

const transitionOver = 1000;
const mouseInertionOver = 300;

    inScroll = true;


    const position = countSectionPosition(sectionEq);

  
changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`
    });

resetActiveClassForItem(sections, sectionEq, "active");

    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

    setTimeout(() => {
inScroll = false;

resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active")



    }, transitionOver + mouseInertionOver);
  }
;

const vieportScroller = () => { 
  const activeSection = sections.filter(".active");
const nextSection = activeSection.next();
const prevSection = activeSection.prev();

return {
  next() {
    if (nextSection.length) {
      performTransition(nextSection.index());
    }
  },
  prev(){
    if (prevSection.length) {
      performTransition(prevSection.index());
    }
  },
};
};



$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = vieportScroller();

if (deltaY > 0) {
  scroller.next();
 
}

if (deltaY < 0) {
scroller.prev();
}

});

$(window).on("keydown", e => {

  const tagName = e.target.tagName.toLowerCase();

  const userTypingInInputs = tagName == "input" ||  tagName == "texrarea";

  if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 38: 
  scroller.prev();
      break;
  
      case 40: 
      scroller.next();
      break;
    }   
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if(isMobile){
  $("body").swipe({
    swipe: function(
      event, direction) {
const scroller = vieportScroller();
let scrollDirection ="";

if (direction == "up") scrollDirection = "next";
if (direction == "duwn") scrollDirection = "prev";


   scroller[scrollDirection]();
    },
  });
}
  
;let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $(".player__start").click(e => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
     
      player.pauseVideo();
    } else {
      playerContainer.addClass("paused");
      player.playVideo();
    }
  });

  $(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;

    const newPlaybackPositionSec =
   (player.getDuration() / 100) * newButtonPositionPercent;
 
 $(".player__playback-button").css({
   left: `${newButtonPositionPercent}%`
 });

  player.seekTo(newPlaybackPositionSec);
  });

  $(".player__splash").click(e => {
    player.playVideo();
  })

 };



 const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  
  const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }
  
  return `${minutes} : ${seconds}`;

}



 const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();
  

  $(".player__duration-estimate").text(formatTime(durationSec));
if (typeof interval !== "undefined") {
  clearInterval(interval);
}

interval = setInterval(() => {
  const completedSec = player.getCurrentTime();
  const completedPercent = (completedSec / durationSec) * 100;

  $(".player__playback-button").css({
    left: `${completedPercent}%`
  });

$(".player__duration-completed").text(formatTime(completedSec));
}, 1000);
};

const onPlayerStateChange = event => {
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;
  
    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
 };

function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
    controls: 0,
    disablekb: 0,
    showinfo: 0,
    rel: 0,
    autoplay: 0,
    modestbranding: 0
  }
 });
}


eventsInit();;


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
});;const findBlockByAlias = alias => {

  return $(".reviews__item").filter((ndx, item) => {
    return $(item).attr("data-linked-width") === alias;
  });
};

$(".reviews__switcher-link").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
const target = $this.attr("data-open");
const itemToShow = findBlockByAlias(target);
  const current = $this.closest(".reviews__switcher-item");

itemToShow.addClass("active").siblings().removeClass("active");
  current.addClass("active").siblings().removeClass("active");
});;const slider = $('.products').bxSlider({
  pager: false,
  controls: false
});

$('.products-slider__arrow--direction--prev').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})



$('.products-slider__arrow--direction--next').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
});const openItem = item => {
const team = item.closest(".team__item");
const contentBlock = team.find(".team__content");
const textBlock = contentBlock.find(".team__content-block");
const reqHeight = textBlock.height();

team.addClass("active");
contentBlock.height(reqHeight);
};

const closeEveryItem = team => {
  const items = team.find('.team__content');
  const itemTeam = team.find(".team__item");

  itemTeam.removeClass("active");
 items.height(0);
};

$('.team__name').click(e => {

  const $this = $(e.currentTarget);
  const team = $this.closest('.team__list');
const elemTeam = $this.closest(".team__item");

  if (elemTeam.hasClass ("active")) {
    closeEveryItem(team);
  } else {
    closeEveryItem(team);
    openItem($this);
  }





});



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNob2Njby5qcyIsIm1hcC5qcyIsIm1vZGFsLmpzIiwib3BzLmpzIiwicGxheWVyLmpzIiwicHJvZHVjdHMtbWVudS5qcyIsInJldmlld3MuanMiLCJzbGlkZXIuanMiLCJ0ZWFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0N0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKTtcclxuXHJcbmxldCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm92ZXJsYXknKTtcclxuLy8gbGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG5cclxuXHJcblxyXG5sZXQgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudV9fbGluay1vdmVybGF5Jyk7XHJcblxyXG5saW5rcy5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snICwgdG9nZ2xlTWVudSk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVNZW51KCl7XHJcbiAgaGFtYnVyZ2VyLmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlci0tYWN0aXZlJyk7XHJcbiAgb3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdvdmVybGF5LS1hY3RpdmUnKTtcclxuLy8gIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYm9keS0tYWN0aXZlLW1lbnUnKTtcclxuXHJcbn1cclxuXHJcbmhhbWJ1cmdlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycgLCB0b2dnbGVNZW51KTtcclxuIiwiLy8gbGV0IG15TWFwO1xyXG4vLyAgY29uc3QgaW5pdCA9ICgpID0+IHtcclxuXHJcbi8vIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XHJcbi8vICAgY2VudGVyOiBbNTUuNzYsIDM3LjY0XSxcclxuIFxyXG4vLyAgIHpvb206IDExLFxyXG4vLyAgIGNvbnRyb2xzOiBbXVxyXG4vLyB9KTtcclxuXHJcbi8vIGNvbnN0IGNvb3JkcyA9IFtcclxuXHJcbi8vIF07XHJcblxyXG4vLyBjb25zdCBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbih7fSwge1xyXG4vLyAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbi8vICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4vLyAgIGljb25JbWFnZUhyZWY6ICcuL2ltYWdlL21hcmtlci5zdmcnLFxyXG4vLyAgIGljb25JbWFnZVNpemU6IFxyXG4vLyAgIGljb25JbWFnZU9mZnNldDogXHJcbi8vIH0pO1xyXG5cclxuLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspIHtcclxuLy8gICBteUNvbGxlY3Rpb24uYWRkKG5ldyB5bWFwcy5QbGFjZW1hcmsoY29vcmRzW2ldKSk7XHJcbi8vIH1cclxuXHJcbi8vIG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblxyXG4vLyBteU1hcC5iZWhhdmlvcnMuZGlzYWJsZSgnc2Nyb2xsWm9vbScpO1xyXG4vLyB9O1xyXG5cclxuLy8geW1hcHMucmVhZHkoaW5pdCk7XHJcblxyXG5cclxubGV0IG15TWFwO1xyXG5jb25zdCBpbml0ID0gKCkgPT4ge1xyXG4gbXlNYXAgPSBuZXcgeW1hcHMuTWFwKFwibWFwXCIsIHtcclxuICAgY2VudGVyOiBbNTkuOTM5MTY5OTg2OTIxNzQsIDMwLjMwOTAxNTA5NjczMjYyMl0sXHJcbiAgIHpvb206IDExLFxyXG4gICBjb250cm9sczogW10sXHJcbiB9KTtcclxuIFxyXG4gbGV0IGNvb3JkcyA9IFtcclxuICAgICBbNTkuOTQ1NTQzMjc5ODkyODcsIDMwLjM4OTM1MjYyMTE0NjY4XSxcclxuICAgICBbNTkuOTExNDIzMjM1NjM5MDksIDMwLjUwMDI0NTg3MDY1ODQxXSxcclxuICAgICBbNTkuODg2OTMxNjE3ODQ2MDYsIDMwLjMxOTY1ODEwMjEwMzcxM10sXHJcbiAgICAgWzU5Ljk3MDMzNTc0ODIxNjcyLCAzMC4zMTUxOTQ5MDYzMDI5MjRdLFxyXG4gICBdLFxyXG4gICBteUNvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0Q29sbGVjdGlvbih7fSwge1xyXG4gICAgIGRyYWdnYWJsZTogZmFsc2UsXHJcbiAgICAgaWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG4gICAgIGljb25JbWFnZUhyZWY6ICcuLi9pbWFnZS9tYXJrZXIuc3ZnJyxcclxuICAgICBpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuICAgICBpY29uSW1hZ2VPZmZzZXQ6IFstMzUsIC01Ml1cclxuICAgfSk7XHJcbiBcclxuIGZvciAobGV0IGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgIG15Q29sbGVjdGlvbi5hZGQobmV3IHltYXBzLlBsYWNlbWFyayhjb29yZHNbaV0pKTtcclxuIH1cclxuIFxyXG4gbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlDb2xsZWN0aW9uKTtcclxuIFxyXG4gbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcclxufTtcclxuIFxyXG55bWFwcy5yZWFkeShpbml0KTtcclxuIiwiZnVuY3Rpb24gdmFsaWRhdGVGaWVsZHMoZm9ybSwgZmllbGRzQXJyYXkpIHtcclxuXHJcbiAgZmllbGRzQXJyYXkuZm9yRWFjaCgoZmllbGQpID0+IHtcclxuICAgIGZpZWxkLnJlbW92ZUNsYXNzKFwiaW5wdXQtZXJyb3JcIik7XHJcbiAgICBpZiAoZmllbGQudmFsKCkudHJpbSgpID09PSBcIlwiKSB7XHJcbiAgICAgIGZpZWxkLmFkZENsYXNzKFwiaW5wdXQtZXJyb3JcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGVycm9yRmllbGRzID0gZm9ybS5maW5kKFwiLmlucHV0LWVycm9yXCIpO1xyXG5cclxuICByZXR1cm4gZXJyb3JGaWVsZHMubGVuZ3RoID09PSAwO1xyXG59XHJcblxyXG4kKCcuZm9ybScpLnN1Ym1pdChlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cclxuY29uc3QgZm9ybSA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuY29uc3QgbmFtZSA9IGZvcm0uZmluZChcIltuYW1lPSduYW1lJ11cIik7XHJcbmNvbnN0IHBob25lID0gZm9ybS5maW5kKFwiW25hbWU9J3Bob25lJ11cIik7XHJcbmNvbnN0IGNvbW1lbnQgPSBmb3JtLmZpbmQoXCJbbmFtZT0nY29tbWVudCddXCIpO1xyXG5jb25zdCB0byA9IGZvcm0uZmluZChcIltuYW1lPSd0byddXCIpO1xyXG5cclxuY29uc3QgbW9kYWwgPSAkKFwiI21vZGFsXCIpO1xyXG5jb25zdCBjb250ZW50ID0gbW9kYWwuZmluZChcIi5tb2RhbF9fY29udGVudFwiKTtcclxubW9kYWwucmVtb3ZlQ2xhc3MoXCJlcnJvci1tb2RhbFwiKTtcclxuXHJcbmNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0ZUZpZWxkcyhmb3JtLCBbbmFtZSwgcGhvbmUsIGNvbW1lbnQsIHRvXSk7XHJcblxyXG5pZiAoaXNWYWxpZCkge1xyXG4gICQuYWpheCh7XHJcbiAgICB1cmw6IFwiaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsXCIsXHJcbiAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBuYW1lOiBuYW1lLnZhbCgpLFxyXG4gICAgICBwaG9uZTogcGhvbmUudmFsKCksXHJcbiAgICAgIGNvbW1lbnQ6IGNvbW1lbnQudmFsKCksXHJcbiAgICAgIHRvOiB0by52YWwoKSxcclxuICAgIH0sXHJcblxyXG4gICAgc3VjY2VzczogZGF0YSA9PiB7XHJcbiAgICAgIGNvbnRlbnQudGV4dChkYXRhLm1lc3NhZ2UpXHJcblxyXG4gXHJcbiQuIGZhbmN5Ym94Lm9wZW4oe1xyXG4gIHNyYzogXCIjbW9kYWxcIixcclxuICB0eXBlOiBcImlubGluZVwiXHJcbiBcclxufSlcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3cnKS52YWx1ZSA9ICcnO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm90JykudmFsdWUgPSAnJztcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbCcpLnZhbHVlID0gJyc7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3InKS52YWx1ZSA9ICcnO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9zJykudmFsdWUgPSAnJztcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JveicpLnZhbHVlID0gJyc7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3gnKS52YWx1ZSA9ICcnO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm92JykudmFsdWUgPSAnJztcclxuXHJcblxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgIGVycm9yOiBkYXRhID0+IHtcclxuICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnJlc3BvbnNlSlNPTi5tZXNzYWdlO1xyXG4gICAgICAgY29udGVudC50ZXh0KG1lc3NhZ2UpO1xyXG4gICAgICAgbW9kYWwuYWRkQ2xhc3MoXCJlcnJvci1tb2RhbFwiKTtcclxuICAgIFxyXG5cclxuICAgICAgICQuIGZhbmN5Ym94Lm9wZW4oe1xyXG4gICAgICAgIHNyYzogXCIjbW9kYWxcIixcclxuICAgICAgICB0eXBlOiBcImlubGluZVwiXHJcblxyXG4gICAgICAgXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICB9XHJcbiAgIH0pO1xyXG59XHJcblxyXG4gXHJcblxyXG5cclxuICAgIFxyXG4gIFxyXG59KTtcclxuXHJcbiQoXCIuYXBwLWNsb3NlLW1vZGFsXCIpLmNsaWNrKGUgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiQuZmFuY3lib3guY2xvc2UoKTtcclxuXHJcblxyXG5cclxufSk7IiwiY29uc3Qgc2VjdGlvbnMgPSAkKFwic2VjdGlvblwiKTtcclxuY29uc3QgZGlzcGxheSA9ICQoXCIubWFpbmNvbnRlbnRcIik7XHJcbmNvbnN0IHNpZGVNZW51ID0gJChcIi5maXhlZC1tZW51XCIpO1xyXG5jb25zdCBtZW51SXRlbXMgPSBzaWRlTWVudS5maW5kKFwiZml4ZWQtbWVudV9faXRlbVwiKTtcclxuXHJcbmNvbnN0IG1vYmlsZURldGVjdCA9IG5ldyBNb2JpbGVEZXRlY3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG5jb25zdCBpc01vYmlsZSA9IG1vYmlsZURldGVjdC5tb2JpbGVcclxuXHJcbmxldCBpblNjcm9sbCA9IGZhbHNlO1xyXG5cclxuc2VjdGlvbnMuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbmNvbnN0IGNvdW50U2VjdGlvblBvc2l0aW9uID0gKHNlY3Rpb25FcSkgPT4ge1xyXG5jb25zdCBwb3NpdGlvbiA9IHNlY3Rpb25FcSAqIC0xMDA7XHJcblxyXG5pZiAoaXNOYU4ocG9zaXRpb24pKSB7XHJcbiAgY29uc29sZS5lcnJvcihcItC/0LXRgNC10LTQsNC90L4g0L3QtdCy0LXRgNC90L7QtSDQt9C90LDRh9C10L3QuNC1XCIpO1xyXG4gIHJldHVybiAwO1xyXG59XHJcblxyXG4gIHJldHVybiBwb3NpdGlvbjtcclxufVxyXG5cclxuY29uc3QgY2hhbmdlTWVudVRoZW1lRm9yU2VjdGlvbiA9IHNlY3Rpb25FcSA9PiB7XHJcbiAgY29uc3QgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9ucy5lcShzZWN0aW9uRXEpO1xyXG4gICAgY29uc3QgbWVudVRoZW1lID0gY3VycmVudFNlY3Rpb24uYXR0cihcImRhdGEtc2lkZW1lbnUtdGhlbWVcIik7XHJcbiAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gKFwiZml4ZWQtbWVudS0tc2hhZG93ZWRcIilcclxuICAgIFxyXG4gICAgaWYgKG1lbnVUaGVtZSA9PSBcImJsYWNrXCIpe1xyXG4gICAgICBzaWRlTWVudS5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNpZGVNZW51LnJlbW92ZUNsYXNzKFwiZml4ZWQtbWVudS0tc2hhZG93ZWRcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgcmVzZXRBY3RpdmVDbGFzc0Zvckl0ZW0gPSAoaXRlbXMsIGl0ZW1FcSwgYWN0aXZlQ2xhc3MpID0+IHtcclxuICBpdGVtcy5lcShpdGVtRXEpLmFkZENsYXNzKGFjdGl2ZUNsYXNzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGFjdGl2ZUNsYXNzKVxyXG59XHJcblxyXG5jb25zdCBwZXJmb3JtVHJhbnNpdGlvbiA9IHNlY3Rpb25FcSA9PiB7XHJcbiAgaWYgKGluU2Nyb2xsKSByZXR1cm47XHJcblxyXG5jb25zdCB0cmFuc2l0aW9uT3ZlciA9IDEwMDA7XHJcbmNvbnN0IG1vdXNlSW5lcnRpb25PdmVyID0gMzAwO1xyXG5cclxuICAgIGluU2Nyb2xsID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgY29uc3QgcG9zaXRpb24gPSBjb3VudFNlY3Rpb25Qb3NpdGlvbihzZWN0aW9uRXEpO1xyXG5cclxuICBcclxuY2hhbmdlTWVudVRoZW1lRm9yU2VjdGlvbihzZWN0aW9uRXEpO1xyXG5cclxuICAgIGRpc3BsYXkuY3NzKHtcclxuICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke3Bvc2l0aW9ufSUpYFxyXG4gICAgfSk7XHJcblxyXG5yZXNldEFjdGl2ZUNsYXNzRm9ySXRlbShzZWN0aW9ucywgc2VjdGlvbkVxLCBcImFjdGl2ZVwiKTtcclxuXHJcbiAgICBzZWN0aW9ucy5lcShzZWN0aW9uRXEpLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbmluU2Nyb2xsID0gZmFsc2U7XHJcblxyXG5yZXNldEFjdGl2ZUNsYXNzRm9ySXRlbShtZW51SXRlbXMsIHNlY3Rpb25FcSwgXCJmaXhlZC1tZW51X19pdGVtLS1hY3RpdmVcIilcclxuXHJcblxyXG5cclxuICAgIH0sIHRyYW5zaXRpb25PdmVyICsgbW91c2VJbmVydGlvbk92ZXIpO1xyXG4gIH1cclxuO1xyXG5cclxuY29uc3QgdmllcG9ydFNjcm9sbGVyID0gKCkgPT4geyBcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gc2VjdGlvbnMuZmlsdGVyKFwiLmFjdGl2ZVwiKTtcclxuY29uc3QgbmV4dFNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLm5leHQoKTtcclxuY29uc3QgcHJldlNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLnByZXYoKTtcclxuXHJcbnJldHVybiB7XHJcbiAgbmV4dCgpIHtcclxuICAgIGlmIChuZXh0U2VjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgcGVyZm9ybVRyYW5zaXRpb24obmV4dFNlY3Rpb24uaW5kZXgoKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcmV2KCl7XHJcbiAgICBpZiAocHJldlNlY3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgIHBlcmZvcm1UcmFuc2l0aW9uKHByZXZTZWN0aW9uLmluZGV4KCkpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn07XHJcbn07XHJcblxyXG5cclxuXHJcbiQod2luZG93KS5vbignd2hlZWwnLCBlID0+IHtcclxuICBjb25zdCBkZWx0YVkgPSBlLm9yaWdpbmFsRXZlbnQuZGVsdGFZO1xyXG4gIGNvbnN0IHNjcm9sbGVyID0gdmllcG9ydFNjcm9sbGVyKCk7XHJcblxyXG5pZiAoZGVsdGFZID4gMCkge1xyXG4gIHNjcm9sbGVyLm5leHQoKTtcclxuIFxyXG59XHJcblxyXG5pZiAoZGVsdGFZIDwgMCkge1xyXG5zY3JvbGxlci5wcmV2KCk7XHJcbn1cclxuXHJcbn0pO1xyXG5cclxuJCh3aW5kb3cpLm9uKFwia2V5ZG93blwiLCBlID0+IHtcclxuXHJcbiAgY29uc3QgdGFnTmFtZSA9IGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgY29uc3QgdXNlclR5cGluZ0luSW5wdXRzID0gdGFnTmFtZSA9PSBcImlucHV0XCIgfHwgIHRhZ05hbWUgPT0gXCJ0ZXhyYXJlYVwiO1xyXG5cclxuICBpZiAodXNlclR5cGluZ0luSW5wdXRzKSByZXR1cm47XHJcblxyXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcclxuICAgICAgY2FzZSAzODogXHJcbiAgc2Nyb2xsZXIucHJldigpO1xyXG4gICAgICBicmVhaztcclxuICBcclxuICAgICAgY2FzZSA0MDogXHJcbiAgICAgIHNjcm9sbGVyLm5leHQoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9ICAgXHJcbn0pO1xyXG5cclxuJChcIi53cmFwcGVyXCIpLm9uKFwidG91Y2htb3ZlXCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuXHJcbiQoXCJbZGF0YS1zY3JvbGwtdG9dXCIpLmNsaWNrKGUgPT4ge1xyXG5cclxuICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICBjb25zdCB0YXJnZXQgPSAkdGhpcy5hdHRyKFwiZGF0YS1zY3JvbGwtdG9cIik7XHJcbiAgY29uc3QgcmVxU2VjdGlvbiA9ICQoYFtkYXRhLXNlY3Rpb24taWQ9JHt0YXJnZXR9XWApO1xyXG5cclxuICBwZXJmb3JtVHJhbnNpdGlvbihyZXFTZWN0aW9uLmluZGV4KCkpO1xyXG59KTtcclxuXHJcbmlmKGlzTW9iaWxlKXtcclxuICAkKFwiYm9keVwiKS5zd2lwZSh7XHJcbiAgICBzd2lwZTogZnVuY3Rpb24oXHJcbiAgICAgIGV2ZW50LCBkaXJlY3Rpb24pIHtcclxuY29uc3Qgc2Nyb2xsZXIgPSB2aWVwb3J0U2Nyb2xsZXIoKTtcclxubGV0IHNjcm9sbERpcmVjdGlvbiA9XCJcIjtcclxuXHJcbmlmIChkaXJlY3Rpb24gPT0gXCJ1cFwiKSBzY3JvbGxEaXJlY3Rpb24gPSBcIm5leHRcIjtcclxuaWYgKGRpcmVjdGlvbiA9PSBcImR1d25cIikgc2Nyb2xsRGlyZWN0aW9uID0gXCJwcmV2XCI7XHJcblxyXG5cclxuICAgc2Nyb2xsZXJbc2Nyb2xsRGlyZWN0aW9uXSgpO1xyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG4gIFxyXG4iLCJsZXQgcGxheWVyO1xyXG5jb25zdCBwbGF5ZXJDb250YWluZXIgPSAkKCcucGxheWVyJyk7XHJcblxyXG5sZXQgZXZlbnRzSW5pdCA9ICgpID0+IHtcclxuICAkKFwiLnBsYXllcl9fc3RhcnRcIikuY2xpY2soZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKHBsYXllckNvbnRhaW5lci5oYXNDbGFzcyhcInBhdXNlZFwiKSkge1xyXG4gICAgIFxyXG4gICAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGxheWVyQ29udGFpbmVyLmFkZENsYXNzKFwicGF1c2VkXCIpO1xyXG4gICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoXCIucGxheWVyX19wbGF5YmFja1wiKS5jbGljayhlID0+IHtcclxuICAgIGNvbnN0IGJhciA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICAgIGNvbnN0IGNsaWNrZWRQb3NpdGlvbiA9IGUub3JpZ2luYWxFdmVudC5sYXllclg7XHJcbiAgICBcclxuICAgIGNvbnN0IG5ld0J1dHRvblBvc2l0aW9uUGVyY2VudCA9IChjbGlja2VkUG9zaXRpb24gLyBiYXIud2lkdGgoKSkgKiAxMDA7XHJcblxyXG4gICAgY29uc3QgbmV3UGxheWJhY2tQb3NpdGlvblNlYyA9XHJcbiAgIChwbGF5ZXIuZ2V0RHVyYXRpb24oKSAvIDEwMCkgKiBuZXdCdXR0b25Qb3NpdGlvblBlcmNlbnQ7XHJcbiBcclxuICQoXCIucGxheWVyX19wbGF5YmFjay1idXR0b25cIikuY3NzKHtcclxuICAgbGVmdDogYCR7bmV3QnV0dG9uUG9zaXRpb25QZXJjZW50fSVgXHJcbiB9KTtcclxuXHJcbiAgcGxheWVyLnNlZWtUbyhuZXdQbGF5YmFja1Bvc2l0aW9uU2VjKTtcclxuICB9KTtcclxuXHJcbiAgJChcIi5wbGF5ZXJfX3NwbGFzaFwiKS5jbGljayhlID0+IHtcclxuICAgIHBsYXllci5wbGF5VmlkZW8oKTtcclxuICB9KVxyXG5cclxuIH07XHJcblxyXG5cclxuXHJcbiBjb25zdCBmb3JtYXRUaW1lID0gdGltZVNlYyA9PiB7XHJcbiAgY29uc3Qgcm91bmRUaW1lID0gTWF0aC5yb3VuZCh0aW1lU2VjKTtcclxuICBcclxuICBjb25zdCBtaW51dGVzID0gYWRkWmVybyhNYXRoLmZsb29yKHJvdW5kVGltZSAvIDYwKSk7XHJcbiBjb25zdCBzZWNvbmRzID0gYWRkWmVybyhyb3VuZFRpbWUgLSBtaW51dGVzICogNjApO1xyXG5cclxuICBmdW5jdGlvbiBhZGRaZXJvKG51bSkge1xyXG4gICAgcmV0dXJuIG51bSA8IDEwID8gYDAke251bX1gIDogbnVtO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gYCR7bWludXRlc30gOiAke3NlY29uZHN9YDtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuIGNvbnN0IG9uUGxheWVyUmVhZHkgPSAoKSA9PiB7XHJcbiAgbGV0IGludGVydmFsO1xyXG4gIGNvbnN0IGR1cmF0aW9uU2VjID0gcGxheWVyLmdldER1cmF0aW9uKCk7XHJcbiAgXHJcblxyXG4gICQoXCIucGxheWVyX19kdXJhdGlvbi1lc3RpbWF0ZVwiKS50ZXh0KGZvcm1hdFRpbWUoZHVyYXRpb25TZWMpKTtcclxuaWYgKHR5cGVvZiBpbnRlcnZhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG59XHJcblxyXG5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICBjb25zdCBjb21wbGV0ZWRTZWMgPSBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKTtcclxuICBjb25zdCBjb21wbGV0ZWRQZXJjZW50ID0gKGNvbXBsZXRlZFNlYyAvIGR1cmF0aW9uU2VjKSAqIDEwMDtcclxuXHJcbiAgJChcIi5wbGF5ZXJfX3BsYXliYWNrLWJ1dHRvblwiKS5jc3Moe1xyXG4gICAgbGVmdDogYCR7Y29tcGxldGVkUGVyY2VudH0lYFxyXG4gIH0pO1xyXG5cclxuJChcIi5wbGF5ZXJfX2R1cmF0aW9uLWNvbXBsZXRlZFwiKS50ZXh0KGZvcm1hdFRpbWUoY29tcGxldGVkU2VjKSk7XHJcbn0sIDEwMDApO1xyXG59O1xyXG5cclxuY29uc3Qgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IGV2ZW50ID0+IHtcclxuICBzd2l0Y2ggKGV2ZW50LmRhdGEpIHtcclxuICAgIGNhc2UgMTpcclxuICAgICAgcGxheWVyQ29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBwbGF5ZXJDb250YWluZXIuYWRkQ2xhc3MoXCJwYXVzZWRcIik7XHJcbiAgICAgIGJyZWFrO1xyXG4gIFxyXG4gICAgY2FzZSAyOlxyXG4gICAgICBwbGF5ZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgIHBsYXllckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcInBhdXNlZFwiKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gfTtcclxuXHJcbmZ1bmN0aW9uIG9uWW91VHViZUlmcmFtZUFQSVJlYWR5KCkge1xyXG4gcGxheWVyID0gbmV3IFlULlBsYXllcihcInl0LXBsYXllclwiLCB7XHJcbiAgIGhlaWdodDogXCI0MDVcIixcclxuICAgd2lkdGg6IFwiNjYwXCIsXHJcbiAgIHZpZGVvSWQ6IFwiTFhiM0VLV3NJblFcIixcclxuICAgZXZlbnRzOiB7XHJcbiAgICAgb25SZWFkeTogb25QbGF5ZXJSZWFkeSxcclxuICAgICBvblN0YXRlQ2hhbmdlOiBvblBsYXllclN0YXRlQ2hhbmdlXHJcbiAgIH0sXHJcbiAgIHBsYXllclZhcnM6IHtcclxuICAgIGNvbnRyb2xzOiAwLFxyXG4gICAgZGlzYWJsZWtiOiAwLFxyXG4gICAgc2hvd2luZm86IDAsXHJcbiAgICByZWw6IDAsXHJcbiAgICBhdXRvcGxheTogMCxcclxuICAgIG1vZGVzdGJyYW5kaW5nOiAwXHJcbiAgfVxyXG4gfSk7XHJcbn1cclxuXHJcblxyXG5ldmVudHNJbml0KCk7IiwiXHJcblxyXG5cclxuLy8gJChcIi5wcm9kdWN0cy1tZW51X190aXRsZVwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xyXG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gfSlcclxuXHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0cy1tZW51JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4geyBcclxuXHJcbi8vICAgY29uc3QgdHJpZ2dlciA9IGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXRyaWdnZXJdJylcclxuXHJcbi8vICBpZiAoIXRyaWdnZXIpIHJldHVyblxyXG5cclxuLy8gIGNvbnN0IGl0ZW4gPSB0cmlnZ2VyLnBhcmVudE5vZGVcclxuXHJcbi8vIGlmIChpdGVuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpe1xyXG4vLyAgIGNsb3NlSXRlbihpdGVuKVxyXG4vLyB9IGVsc2Uge1xyXG4vLyAgIGNsb3NlQWN0aXZlSXRlbihpdGVuKVxyXG4vLyAgIG9wZW5JdGVuKGl0ZW4pXHJcbi8vIH1cclxuLy8gfSlcclxuXHJcbi8vIGZ1bmN0aW9uIGNsb3NlQWN0aXZlSXRlbihpdGVuKXtcclxuLy8gICBjb25zdCBsaXN0ID0gaXRlbi5wYXJlbnROb2RlXHJcbi8vIGNvbnN0IGFjdGl2ZSA9ICBsaXN0LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKVxyXG5cclxuXHJcbi8vIGlmIChhY3RpdmUpIHtcclxuLy8gICBjbG9zZUl0ZW4oYWN0aXZlKVxyXG4vLyB9XHJcblxyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBvcGVuSXRlbihpdGVuKXtcclxuLy8gICBjb25zdCBjb250ZW50V3JhcCA9IGl0ZW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3Blbl0nKVxyXG4vLyAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50V3JhcC5maXJzdEVsZW1lbnRDaGlsZFxyXG4vLyAgIGNvbnN0IG9wZW5XaWR0aCA9IGNhbGNXaWR0aChpdGVuKVxyXG4gXHJcblxyXG4vLyBjb250ZW50LnN0eWxlLm1pbldpZHRoID0gYCR7b3BlbldpZHRofXB4YFxyXG5cclxuLy8gY29udGVudFdyYXAuc3R5bGUud2lkdGggPSBgJHtvcGVuV2lkdGh9cHhgXHJcblxyXG4vLyBpdGVuLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gY2xvc2VJdGVuKGl0ZW4pe1xyXG4vLyAgIGNvbnN0IGNvbnRlbnRXcmFwID0gaXRlbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcGVuXScpXHJcblxyXG4vLyAgIGNvbnRlbnRXcmFwLnN0eWxlLndpZHRoID0gMFxyXG4vLyBpdGVuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbi8vIH1cclxuXHJcbi8vIGZ1bmN0aW9uIGNhbGNXaWR0aChpdGVuKXtcclxuLy8gICBjb25zdCBsaXN0ID0gaXRlbi5wYXJlbnROb2RlXHJcbi8vICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxyXG4vLyAgIGNvbnN0IHRyaWdnZXJzID0gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmlnZ2VyXScpXHJcbi8vICAgY29uc3QgdHJpZ2dlcnNXaWR0aCA9IHRyaWdnZXJzWzBdLmNsaWVudFdpZHRoICogdHJpZ2dlcnMubGVuZ3RoXHJcbi8vICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYSgnbWF4LXdpZHRoOiA3NjhweCcpLm1hdGNoZXNcclxuIFxyXG4vLyBpZiAoaXNNb2JpbGUpIHtcclxuLy8gICByZXR1cm4gd2luZG93V2lkdGggLSB0cmlnZ2Vyc1dpZHRoXHJcbi8vIH1cclxuXHJcbi8vICAgcmV0dXJuIDUwMFxyXG4vLyB9O1xyXG5cclxuLy8gJChcIi5wcm9kdWN0cy1tZW51X19jbG9zZVwiKS5vbignY2xpY2snLCBlID0+IHtcclxuLy8gICBjbG9zZUl0ZW4oJCgnLnByb2R1Y3RzLW1lbnUnKSk7XHJcblxyXG4vLyB9KVxyXG5cclxuXHJcblxyXG5jb25zdCBtZXN1cmVXaWR0aCA9IChpdGVuKSA9PiB7XHJcbiAgbGV0IHJlcUl0ZW5XaWR0aCA9IDA7XHJcblxyXG4gIGNvbnN0IHNjcmVlbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgY29uc3QgY29udGFpbmVyID0gaXRlbi5jbG9zZXN0KFwiLnByb2R1Y3RzLW1lbnVcIik7XHJcbiAgY29uc3QgdGl0bGVzQmxvY2tzID0gY29udGFpbmVyLmZpbmQoXCIucHJvZHVjdHMtbWVudV9fdGl0bGVcIik7XHJcbiAgY29uc3QgdGl0bGVzV2lkdGggPSB0aXRsZXNCbG9ja3Mud2lkdGgoKSAqIHRpdGxlc0Jsb2Nrcy5sZW5ndGg7XHJcblxyXG5jb25zdCB0ZXh0Q29udGFpbmVyID0gaXRlbi5maW5kKFwiLnByb2R1Y3RzLW1lbnVfX2NvbnRhaW5lclwiKTtcclxuY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUludCh0ZXh0Q29udGFpbmVyLmNzcyhcInBhZGRpbmctbGVmdFwiKSk7XHJcbmNvbnN0IHBhZGRpbmdSaWdodCA9IHBhcnNlSW50KHRleHRDb250YWluZXIuY3NzKFwicGFkZGluZy1yaWdodFwiKSk7XHJcblxyXG5jb25zdCBpc01vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzY4cHgpXCIpLm1hdGNoZXM7XHJcblxyXG5pZiAoaXNNb2JpbGUpIHtcclxuICByZXFJdGVuV2lkdGggPSBzY3JlZW5XaWR0aCAtIHRpdGxlc1dpZHRoO1xyXG59IGVsc2Uge1xyXG4gIHJlcUl0ZW5XaWR0aCA9IDUwMDtcclxufVxyXG5cclxucmV0dXJuIHtcclxuICBjb250YWluZXI6IHJlcUl0ZW5XaWR0aCxcclxuICB0ZXh0Q29udGFpbmVyOiByZXFJdGVuV2lkdGggLSBwYWRkaW5nUmlnaHQgLSBwYWRkaW5nTGVmdFxyXG59XHJcbiBcclxufTtcclxuXHJcbmNvbnN0IGNsb3NlRXZlcnlJdGVuSW5Db250YWluZXIgPSAoY29udGFpbmVyKSA9PiB7XHJcbiAgY29uc3QgaXRlbnMgPSBjb250YWluZXIuZmluZChcIi5wcm9kdWN0cy1tZW51X19pdGVuXCIpO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gY29udGFpbmVyLmZpbmQoXCIucHJvZHVjdHMtbWVudV9fY29udGVudFwiKTtcclxuXHJcbiAgaXRlbnMucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgY29udGVudC53aWR0aCgwKTtcclxufVxyXG5cclxuY29uc3Qgb3Blbkl0ZW4gPSAoaXRlbikgPT4ge1xyXG4gIGNvbnN0IGhpZGRlbkNvbnRlbnQgPSBpdGVuLmZpbmQoXCIucHJvZHVjdHMtbWVudV9fY29udGVudFwiKTtcclxuICBjb25zdCByZXFXaWR0aCA9IG1lc3VyZVdpZHRoKGl0ZW4pO1xyXG4gIGNvbnN0IHRleHRCbG9jayA9IGl0ZW4uZmluZChcIi5wcm9kdWN0cy1tZW51X19jb250YWluZXJcIik7XHJcblxyXG4gIGl0ZW4uYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgaGlkZGVuQ29udGVudC53aWR0aChyZXFXaWR0aC5jb250YWluZXIpO1xyXG4gIHRleHRCbG9jay53aWR0aChyZXFXaWR0aC50ZXh0Q29udGFpbmVyKTtcclxufTtcclxuXHJcblxyXG4kKFwiLnByb2R1Y3RzLW1lbnVfX3RpdGxlXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICBjb25zdCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcclxuICBjb25zdCBpdGVuID0gJHRoaXMuY2xvc2VzdChcIi5wcm9kdWN0cy1tZW51X19pdGVuXCIpO1xyXG4gIGNvbnN0IGl0ZW5PcGVuZWQgPSBpdGVuLmhhc0NsYXNzKFwiYWN0aXZlXCIpO1xyXG5jb25zdCBjb250YWluZXIgPSAkdGhpcy5jbG9zZXN0KFwiLnByb2R1Y3RzLW1lbnVcIik7XHJcblxyXG4gIGlmIChpdGVuT3BlbmVkKSB7XHJcbiAgICBjbG9zZUV2ZXJ5SXRlbkluQ29udGFpbmVyKGNvbnRhaW5lcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlRXZlcnlJdGVuSW5Db250YWluZXIoY29udGFpbmVyKTtcclxuICAgIG9wZW5JdGVuKGl0ZW4pO1xyXG4gIH1cclxuIFxyXG59KTtcclxuXHJcbiQoXCIucHJvZHVjdHMtbWVudV9fY2xvc2VcIikub24oXCJjbGlja1wiLCBlID0+IHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIGNsb3NlRXZlcnlJdGVuSW5Db250YWluZXIoJChcIi5wcm9kdWN0cy1tZW51XCIpKVxyXG59KTsiLCJjb25zdCBmaW5kQmxvY2tCeUFsaWFzID0gYWxpYXMgPT4ge1xyXG5cclxuICByZXR1cm4gJChcIi5yZXZpZXdzX19pdGVtXCIpLmZpbHRlcigobmR4LCBpdGVtKSA9PiB7XHJcbiAgICByZXR1cm4gJChpdGVtKS5hdHRyKFwiZGF0YS1saW5rZWQtd2lkdGhcIikgPT09IGFsaWFzO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuJChcIi5yZXZpZXdzX19zd2l0Y2hlci1saW5rXCIpLmNsaWNrKGUgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XHJcbmNvbnN0IHRhcmdldCA9ICR0aGlzLmF0dHIoXCJkYXRhLW9wZW5cIik7XHJcbmNvbnN0IGl0ZW1Ub1Nob3cgPSBmaW5kQmxvY2tCeUFsaWFzKHRhcmdldCk7XHJcbiAgY29uc3QgY3VycmVudCA9ICR0aGlzLmNsb3Nlc3QoXCIucmV2aWV3c19fc3dpdGNoZXItaXRlbVwiKTtcclxuXHJcbml0ZW1Ub1Nob3cuYWRkQ2xhc3MoXCJhY3RpdmVcIikuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICBjdXJyZW50LmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbn0pOyIsImNvbnN0IHNsaWRlciA9ICQoJy5wcm9kdWN0cycpLmJ4U2xpZGVyKHtcclxuICBwYWdlcjogZmFsc2UsXHJcbiAgY29udHJvbHM6IGZhbHNlXHJcbn0pO1xyXG5cclxuJCgnLnByb2R1Y3RzLXNsaWRlcl9fYXJyb3ctLWRpcmVjdGlvbi0tcHJldicpLmNsaWNrKGUgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBzbGlkZXIuZ29Ub1ByZXZTbGlkZSgpO1xyXG59KVxyXG5cclxuXHJcblxyXG4kKCcucHJvZHVjdHMtc2xpZGVyX19hcnJvdy0tZGlyZWN0aW9uLS1uZXh0JykuY2xpY2soZSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHNsaWRlci5nb1RvTmV4dFNsaWRlKCk7XHJcbn0pIiwiY29uc3Qgb3Blbkl0ZW0gPSBpdGVtID0+IHtcclxuY29uc3QgdGVhbSA9IGl0ZW0uY2xvc2VzdChcIi50ZWFtX19pdGVtXCIpO1xyXG5jb25zdCBjb250ZW50QmxvY2sgPSB0ZWFtLmZpbmQoXCIudGVhbV9fY29udGVudFwiKTtcclxuY29uc3QgdGV4dEJsb2NrID0gY29udGVudEJsb2NrLmZpbmQoXCIudGVhbV9fY29udGVudC1ibG9ja1wiKTtcclxuY29uc3QgcmVxSGVpZ2h0ID0gdGV4dEJsb2NrLmhlaWdodCgpO1xyXG5cclxudGVhbS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuY29udGVudEJsb2NrLmhlaWdodChyZXFIZWlnaHQpO1xyXG59O1xyXG5cclxuY29uc3QgY2xvc2VFdmVyeUl0ZW0gPSB0ZWFtID0+IHtcclxuICBjb25zdCBpdGVtcyA9IHRlYW0uZmluZCgnLnRlYW1fX2NvbnRlbnQnKTtcclxuICBjb25zdCBpdGVtVGVhbSA9IHRlYW0uZmluZChcIi50ZWFtX19pdGVtXCIpO1xyXG5cclxuICBpdGVtVGVhbS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuIGl0ZW1zLmhlaWdodCgwKTtcclxufTtcclxuXHJcbiQoJy50ZWFtX19uYW1lJykuY2xpY2soZSA9PiB7XHJcblxyXG4gIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xyXG4gIGNvbnN0IHRlYW0gPSAkdGhpcy5jbG9zZXN0KCcudGVhbV9fbGlzdCcpO1xyXG5jb25zdCBlbGVtVGVhbSA9ICR0aGlzLmNsb3Nlc3QoXCIudGVhbV9faXRlbVwiKTtcclxuXHJcbiAgaWYgKGVsZW1UZWFtLmhhc0NsYXNzIChcImFjdGl2ZVwiKSkge1xyXG4gICAgY2xvc2VFdmVyeUl0ZW0odGVhbSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNsb3NlRXZlcnlJdGVtKHRlYW0pO1xyXG4gICAgb3Blbkl0ZW0oJHRoaXMpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG59KTtcclxuXHJcblxyXG4iXX0=
