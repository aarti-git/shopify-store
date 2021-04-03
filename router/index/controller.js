import slider from "@js/slider"
import shopifyBuy from "@js/shopify-buy"
const app = {
  init: function ($view) {
    slider.init($view);
    shopifyBuy.init()
    // shopifyBuy.getData().then(resp => console.log('resp=>', resp))
    // shopifyBuy.id().then(resp => console.log('idResp=>', resp))
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
  // data:function(){
  //   var _data = shopifyBuy.getData();
  //   console.log("_data",_data)
  // }
};
export default app;