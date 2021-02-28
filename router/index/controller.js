import slider from "@js/slider"
const app = {
  init: function ($view) {
    slider.init($view);
    // console.log(slider, "slider")
  },
  afterRoute: function () {
    const allAnchorTags = document.querySelectorAll("a");
    allAnchorTags.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        const href = "#" + this.getAttribute("href");
        location.hash = href;
      });
    });
  },
};
export default app;