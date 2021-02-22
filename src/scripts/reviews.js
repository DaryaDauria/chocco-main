const findBlockByAlias = alias => {

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
});