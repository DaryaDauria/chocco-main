const openItem = item => {
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


