import shopifyBuy from "@js/shopify-buy";
import mustache from "mustache";
// import slider from "@js/slider"
const products = {
  init: function ($view, $param) {
    var _this = this;
    this._view = $view;
    // slider.init($view);
    console.log("$param", $param);
    shopifyBuy.init();
    shopifyBuy.getProductsByHandle($param.handle).then(function (resp) {
      _this.creatProduct(resp);
    });
  },
  creatProduct:function(resp){
    console.log("product-resp = ",resp);
    var container = this._view.querySelector(".container");
    const template = `<div class="product-Link-steps"><a href="/">Home</a> / {{productType}} / {{title}}</div>
    <div class="row">
        <div class="col-xs-12 col-md-5">
            <img class="product-img" src="{{images.0.src}}"/>
        </div>
        <div class="col-xs-12 col-md-7">
            <div class="product-information">
                <div class="brand-name-div">
                    <h1>{{title}}</h1>
                    <span class="one-line-discripton">{{description}}</span>
                </div>
                <div class="product-details">
                    <div class="product-price">Rs.{{variants.0.price}}<span class="real-cost">Rs. {{variants.0.compareAtPrice}}</span><span class="discount-off">(60% OFF)</span></div>
                    <span class="about-tax">inclusive of all taxes</span>
                    <span class="size">SELECT SIZE <i>SIZE CHART</i></span>
                    <div class="size-options">
                        <ul class="size-options-ul">
                            <li>XS</li>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                            <li>XL</li>
                            <li>XXL</li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-md-4">
                            <button class="move-to-bag-btn">
                
                                <svg class="icons">
                                    <use xlink:href="../../img//icons.svg#bag"></use>
                                </svg>
                        
                                ADD TO BAG
                            </button>
                        </div>
                        <div class="col-xs-12 col-md-4">
                            <button class="wishlist-btn">
                                    <svg class="icons">
                                        <use xlink:href="../../img//icons.svg#heart"></use>
                                    </svg>
                                    WISHLIST
                                </button>
                        </div>
                    </div>
                    <div class="dilivery-options">DELIVERY OPTIONS
                        <svg class="icons vertical-align">
                            <use xlink:href="../../img//icons.svg#truck"></use>
                        </svg>
                    </div>
                    <div class="size">
                        <div class="best-about-us">
                        <p><b>100% ORIGINAL </b>guarantee for all products at ShoppingApp.co</p>
                        <p><b>Return within 30days </b> of receiving your order</p>
                        <p><b>Get free delivery  </b> for every order above Rs. 799</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    // container.append(creatproduct);
    container.innerHTML = mustache.render(template,resp);
  }
};
export default products;


{/* <div class="banner-section">
<div class="banner-parent">
    <div class="banner-item">
        <img class="product-img" src="${resp.images[0].src}" />
    </div>
    <div class="banner-item">
        <img class="product-img" src="${resp.images[0].src}" />
    </div>
    <div class="banner-item">
        <img class="product-img" src="${resp.images[0].src}" />
    </div>
</div>
</div>
<div class="banner-buts"></div> */}