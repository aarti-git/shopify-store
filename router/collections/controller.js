import { setupLink } from "@js/utils.js";
import shopifyBuy from "@js/shopify-buy";
import filter from "@js/filter";
import mustache from "mustache";
import iconsUrl from "../../img/icons.svg";
const collections = {
  init: function ($view, $param) {
    var _this = this;
    shopifyBuy.init();
    this.baseContaint($view);
    shopifyBuy.getCollectionByHandle($param.handle).then(function (resp) {
      _this.dynamicBrandList(resp);
      _this.dynamicColorList(resp);
      _this.dataCollection(resp);
      _this.dynamicPriceList(resp);
      filter.init($view, resp);
      setupLink($view);
    });
  },
  baseContaint: function ($view) {
    var _this = this;
    this._brand = $view.querySelector(".brand");
    this._price = $view.querySelector(".price");
    this._brandSearchParentEl = $view.querySelector(".brand-search-div");
    this._brandSearchBar = $view.querySelector(".barnd-search-bar");
    this._brandSearchicon = $view.querySelector(".brand-search-icon");
    this._brandSearchRemoveBtn = $view.querySelector(".brand-search-remove");
    this._pathDetails = $view.querySelector(".path-details");
    this._filterColorList = $view.querySelector(".filter-color-list");
    this._moreColoursBtn = $view.querySelector(".more-colors");
    this.showMore = false;
    this._brandSearchicon.addEventListener("click", function () {
      _this.barndSearchBarOpen();
    });
    this._brandSearchRemoveBtn.addEventListener("click", function () {
      _this.barndSearchBarClose();
    });
    // this._moreColoursBtn.addEventListener("click", function () {
    //   _this.showMoreLess();
    // });
  },
  barndSearchBarOpen: function () {
    this._brandSearchBar.classList.remove("hide");
    this._brandSearchParentEl.classList.add("hide");
  },
  barndSearchBarClose: function () {
    this._brandSearchBar.classList.add("hide");
    this._brandSearchParentEl.classList.remove("hide");
  },
  dataCollection: function (resp) {
    console.log("resp = ", resp);
    const row = document.querySelector(".addHeare");
    if (resp.products.length == 0) {
      var template = `product is not available ...Sorry!`;
    } else {
      var template = `{{#products}}
    <div class="col-sm-12 col-md-4 col-lg-3">
     <a href="/products/{{handle}}">
        <div class="categaries-parent">
          <div class="categaries-img-parent">
              <img class="categaries-img" src={{images.0.src}}>
          </div>
          <div class="display-product-details">
              <div>
                  <p class="product-name">{{handle}}</p>
                  <p class="product-discription">{{description}}</p>
              </div>
              <div class="product-details-onhover">
                  <button>WISHLIST</button>
                  <div>
                      <span>size:</span>
                      <span class="size-no">S,</span>
                      <span class="size-no">M,</span>
                      <span class="size-no">L,</span>
                      <span class="size-no">XL,</span>
                  </div>
              </div>
              <div>
                  <span class="product-current-cost"> {{variants.0.price}}</span>
                  <span class="product-real-cost">{{variants.0.compareAtPrice}}</span>
                  <span class="discount">30%</span>
              </div>
          </div>
        </div>
      </a>
    </div>
    {{/products}}`;
    }
    row.innerHTML = mustache.render(template, resp);
    this._pathDetails.innerHTML = mustache.render(
      `
      <div class="Link-steps">
          <div class="product-Link-steps"> <a href="/">Home</a> / {{products.0.productType}} / {{title}} </div>
      </div>
      <div class="product-name-count">
                <b> {{title}}</b>
                <span> - {{products.length}} items</span>
      </div>
      `,
      resp
    );
  },
  dynamicBrandList: function (resp) {
    var obj = {
      handleProdArray: [],
    };
    var products = resp.products;
    for (var i = 0; i < products.length; i++) {
      var PItem = products[i].tags;
      PItem.filter(function (x) {
        var a = x.value.slice(0, 12);
        if (a == "filter-brand") {
          var sliceBrandName = x.value.slice(13);
          // console.log("y==", sliceBrandName);

          const index = obj.handleProdArray.indexOf(sliceBrandName);
          if (index > -1) {
            obj.handleProdArray.splice(index, 1);
          }
          obj.handleProdArray.push(sliceBrandName);
          return true;
        }
      });
    }
    const template = ` {{#handleProdArray}} <div class="filter-div">
          <label>
              <div class="input-cheked-div">
                  <div class="checkboxIndicator-parent"></div>
                  <input type="checkbox" name="brand" />
                  <div class="after-checkboxIndicator">
                      <svg class="chiled-checkboxIndicator">
                          <use xlink:href="${iconsUrl}#check"></use>
                      </svg>
                  </div>
              </div>
              <span>{{.}}</span>
              <span class="brand-num">(1200)</span>
          </label>
      </div> {{/handleProdArray}} `;
    this._brand.innerHTML = mustache.render(template, obj);
  },
  dynamicColorList: function (resp) {
    const ProductColor = {
      colors: [],
    };
    //
    var products = resp.products;
    for (var i = 0; i < products.length; i++) {
      var PItem = products[i].tags;
      PItem.filter(function (x) {
        var a = x.value.slice(0, 12);
        if (a == "filter-color") {
          var sliceColorName = x.value.slice(13);
          // console.log("y==", sliceColorName);

          const index = ProductColor.colors.indexOf(sliceColorName);
          if (index > -1) {
            ProductColor.colors.splice(index, 1);
          }
          ProductColor.colors.push(sliceColorName);
          return true;
        }
      });
    }
    //
    const template = `{{#colors}}
        <div class="filter-div">
          <label>
              <div class="input-cheked-div">
                  <div class="checkboxIndicator-parent"></div>
                  <input type="checkbox" name="brand" />
                  <div class="after-checkboxIndicator">
                      <svg class="chiled-checkboxIndicator">
                          <use xlink:href="${iconsUrl}#check"></use>
                      </svg>
                  </div>
              </div>
              <div class="color-shades" style="background-color: {{.}};"></div>
              <span>{{.}}</span>
              <span class="brand-num">(212)</span>
          </label>
      </div>
      {{/colors}}
    `;
    this._filterColorList.innerHTML = mustache.render(template, ProductColor);
  },
  dynamicPriceList: function (resp) {
    var ProductPrice = [];
    var ProductPriceObj = {};
    var products = resp.products;
    for (var i = 0; i < products.length; i++) {
      var price = products[i].variants[0].price;
      ProductPrice.push(price);
      // console.log("price",price)
    }
    var maxprice = Math.max(...ProductPrice);
    var result = this.priceDivision(maxprice, 500);
    console.log("result==", result);
    ProductPriceObj["price"] = result;
    // ProductPriceObj.price.push(result);
    var template = `{{#price}}<div class="filter-div">
    <label>
      <div class="input-cheked-div">
          <div class="checkboxIndicator-parent"></div>
          <input data-min="{{min}}" data-max="{{max}}" type="checkbox" name="brand" />
          <div class="after-checkboxIndicator">
              <svg class="chiled-checkboxIndicator">
                  <use xlink:href="${iconsUrl}#check"></use>
              </svg>
          </div>
      </div>
      <span>Rs. {{min}} To Rs. {{max}}</span>
      <span class="brand-num">(5120)</span>
    </label>
</div>
{{/price}}`;
    this._price.innerHTML = mustache.render(template, ProductPriceObj);
  },
  priceDivision: function (maxprice, limit) {
    var priceDivisionArray = [];
    var priceList = [];
    var loopLength = maxprice / limit;
    for (var i = 0; i <= loopLength; i++) {
      var noDivisoin = i * limit;
      priceDivisionArray.push(noDivisoin);
    }
    for (var j = 0; j < priceDivisionArray.length - 1; j++) {
      priceList.push({
        min: priceDivisionArray[j], 
        max: priceDivisionArray[j + 1]
      });
    }
    return priceList;
  },
};
export default collections;