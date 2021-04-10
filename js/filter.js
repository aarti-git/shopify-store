import collections from "../router/collections/controller.js";
const filter = {
  init: function ($view, resp) {
    console.log("filter init done", resp);
    this._view = $view;
    this._resp = resp;
    this._count = 0;
    this._brand = 0;
    this.colorCount = 0;
    this.filterEvents();
  },
  filterEvents: function () {
    const _this = this;

    // radio filter event
    var radioFilter = _this._view.querySelector(".radio-filter");
    var radioFilterInputs = radioFilter.querySelectorAll("input");
    radioFilterInputs.forEach(function (item) {
      item.addEventListener("change", function (event) {
        _this.radioFilter(this, event);
        _this.multipleFilter();
      });
    });

    // barnd and color filter change events
    var brandAndColor = _this._view.querySelectorAll(".brand-and-color");
    brandAndColor.forEach(function (item) {
      var priceInputs = item.querySelectorAll("input");
      priceInputs.forEach(function (item) {
        item.addEventListener("change", function (event) {
          _this.brandColorFilter(this, event);
          _this.multipleFilter();
        });
      });
    });
    // price filter event
    var price = _this._view.querySelector(".price");
    var priceInputs = price.querySelectorAll("input");

    priceInputs.forEach(function (item) {
      item.addEventListener("change", function (event) {
        _this.priceFilter(this, event);
        _this.multipleFilter();
      });
    });
  },
  multipleFilter: function () {
    var filterParent = this._view.querySelector(".Product-filter-weapper");
    var inputs = filterParent.querySelectorAll("input");
    inputs.forEach(function (item) {
      if (item.checked == true) {
        console.log("multipleFilter-item ==", item.dataset);
      }
    });
  },
  radioFilter: function (el, ev) {
    if (this.currentRspo) {
      var productsList = this.currentRspo.products;
    } else {
      productsList = this._resp.products;
    }
    var filterProductList = [];
    var genderProductObj = {};

    if (el.checked == true) {
      productsList.forEach(function (prodcut) {
        var productGender = prodcut.variableValues.handle;
        var item = el.dataset.gender;
        if (productGender == item) {
          filterProductList.push(prodcut);
        }
      });
      console.log("filterProductList", filterProductList);
      genderProductObj.products = filterProductList;
      console.log("priceObj", genderProductObj);
      collections.dataCollection(genderProductObj);
      filterProductList = [];
      this.currentRspo = genderProductObj;
      console.log("this.currentRspo", this.currentRspo);
    }
  },
  brandColorFilter: function (el, ev) {
    // var _this = this;
    if (el.dataset.color) {
      this._brand = 0;
      if (this.colorCount >= 1) {
        this._brand++;
      }
      this.colorCount++;
    }
    if (this.currentRspo && this._brand == 0) {
      var productsList = this.currentRspo.products;
    } else {
      productsList = this._resp.products;
      // var addProduct = true;
    }
    this._brand++;

    console.log("change-event-el == ", el);
    var productList = [];
    const obj = {};
    // var productsList = this._resp.products;
    var item = el.dataset;
    if (el.checked == true) {
      console.log(item, "item");
      productsList.forEach(function (prodcut) {
        var productTags = prodcut.tags;
        productTags.filter(function (tag) {
          var a = tag.value.slice(0, 12);
          var item = el.dataset;
          var key = Object.keys(item);
          if (key == "brand") {
            if (a == "filter-brand") {
              var x = `filter-brand-${item.brand}`;
              if (tag == x) {
                productList.push(prodcut);
              }
            }
          } else {
            item = el.dataset;
            if (a == "filter-color") {
              var x = `filter-color-${item.color}`;
              if (tag == x) {
                productList.push(prodcut);
              }
            }
          }
        });
      });
      // if (addProduct == true) {
      if (this.currentRspo && this._brand > 1) {
        this.currentRspo.products.forEach(function (item) {
          productList.push(item);
        });
      }
      obj.products = productList;
      console.log("obj", obj);
      collections.dataCollection(obj);
      this.currentRspo = obj;
      productList = [];
      console.log("this.currentRspo", this.currentRspo);
      // }
    } else {
      var _this = this;
      this.currentRspo.products.forEach(function (courrentItem) {
        var courrentItemTag = courrentItem.tags;
        courrentItemTag.forEach(function (tagItem) {
          console.log("currenttag", tagItem);
          var ProdName = tagItem.value.slice(13);
          if (el.dataset.brand) {
            if (el.dataset.brand == ProdName) {
              var ProductRemoveindex = _this.currentRspo.products.indexOf(
                courrentItem
              );
              if (ProductRemoveindex > -1) {
                _this.currentRspo.products.splice(ProductRemoveindex, 1);
              }
            }
          } else {
            if (el.dataset.color == ProdName) {
              var ProductRemoveindex = _this.currentRspo.products.indexOf(
                courrentItem
              );
              if (ProductRemoveindex > -1) {
                _this.currentRspo.products.splice(ProductRemoveindex, 1);
              }
            }
          }
        });
      });
      obj.products = this.currentRspo.products;
      collections.dataCollection(obj);
    }
  },
  priceFilter: function (el, ev) {
    if (this.currentRspo && this._count == 0) {
      var productsList = this.currentRspo.products;
    } else {
      productsList = this._resp.products;
    }
    this._count++;
    console.log("change-event-el == ", el);
    var validProduct = [];
    var priceObj = {};
    var item = el.dataset;
    if (el.checked == true) {
      // var productsList = this._resp.productsList;
      for (var i = 0; i < productsList.length; i++) {
        var price = productsList[i].variants[0].price;
        var maxNo = Number(item.max);
        var minNo = Number(item.min);
        console.log("numbers ==", maxNo);
        if (price <= maxNo && price >= minNo) {
          var r = productsList[i];
          validProduct.push(r);
          console.log("priceR==", r);
        }
      }
      if (this.currentRspo && this._count > 1) {
        this.currentRspo.products.forEach(function (item) {
          validProduct.push(item);
        });
      }
      priceObj.products = validProduct;
      console.log("priceObj", priceObj);
      collections.dataCollection(priceObj);
      this.currentRspo = priceObj;
      validProduct = [];
      console.log("this.currentRspo", this.currentRspo);
    } 
    // else {
    //   //
    //   var _this = this;
    //   this.currentRspo.products.forEach(function (courrentItem) {
    //     var courrentItemTag = courrentItem.tags;
    //     courrentItemTag.forEach(function (tagItem) {
    //       console.log("currenttag", tagItem);
    //       var ProdName = tagItem.value.slice(13);
    //       if (el.dataset.price == ProdName) {
    //         var ProductRemoveindex = _this.currentRspo.products.indexOf(
    //           courrentItem
    //         );
    //         if (ProductRemoveindex > -1) {
    //           _this.currentRspo.products.splice(ProductRemoveindex, 1);
    //         }
    //       }
    //     });
    //   });
    //   obj.products = this.currentRspo.products;
    //   collections.dataCollection(obj);
    // } 
  },
};

export default filter;