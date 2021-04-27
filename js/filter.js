import collections from "../router/collections/controller.js";
const filter = {
  init: function ($view, resp) {
    console.log("filter init done", resp);
    this._view = $view;
    this._resp = resp;
    this._count = 0;
    this._brand = 0;
    this._color = 0;
    this.isColorCal = 0;
    this.isbrandCal =0;
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
    // var brandAndColor = _this._view.querySelectorAll(".brand-and-color");
    // brandAndColor.forEach(function (item) {
    //   var priceInputs = item.querySelectorAll("input");
    //   priceInputs.forEach(function (item) {
    //     item.addEventListener("change", function (event) {
    //       _this.brandColorFilter(this, event);
    //       _this.multipleFilter();
    //     });
    //   });
    // });

    // brand
    var brand = _this._view.querySelector(".brand");
    var brandInputs = brand.querySelectorAll("input");

    brandInputs.forEach(function (item) {
      item.addEventListener("change", function (event) {
        _this.barndFilter(this, event);
        _this.multipleFilter();
      });
    });

    // color
    var color = _this._view.querySelector(".color");
    var colorInputs = color.querySelectorAll("input");

    colorInputs.forEach(function (item) {
      item.addEventListener("change", function (event) {
        _this.ColorFilter(this, event);
        _this.multipleFilter();
      });
    });

    // price filter event
    var price = _this._view.querySelector(".price");
    var priceInputs = price.querySelectorAll("input");

    priceInputs.forEach(function (item) {
      item.addEventListener("change", function (event) {
        _this.priceFilter(this, event);
        // _this.multipleFilter();
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
      this._radioPreviousL = productsList;
    } else {
      productsList = this._radioPreviousL;
      if (productsList == undefined) {
        productsList = this._resp.products;
      }
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
      this.currentRspo = genderProductObj;
      if (filterProductList.length == 0) {
        this.currentRspo = undefined;
      }
      filterProductList = [];
      console.log("this.currentRspo", this.currentRspo);
    }
  },
  barndFilter: function (el, ev) {
    var _this = this;
    var brandValidproductList = [];
    const barndObj = {};
    // if(!el.checked){
    //   this._brand = 0;
    // }
    if (this.currentRspo && this._brand == 0) {
      var productsList = this.currentRspo.products;
      this._brandPreviousL = productsList;
    } else {
      productsList = this._brandPreviousL;
      if (productsList == undefined) {
        // var newproductsList = this._resp.products;
        productsList = this._resp.products;
      }
    }
    this._brand++;
    console.log("change-event-el == ", el);
    var item = el.dataset;
    if (el.checked == true) {
      this.isbrandCal++
      console.log(item, "item");
      productsList.forEach(function (prodcut) {
        var productTags = prodcut.tags;
        productTags.filter(function (tag) {
          var a = tag.value.slice(0, 12);
          if (a == "filter-brand") {
            var x = `filter-brand-${item.brand}`;
            if (tag == x) {
              brandValidproductList.push(prodcut);
            }
          }
        });
      });
      // this._brand > 1
      if (this.currentRspo && this.isbrandCal > 1) {
        this.currentRspo.products.forEach(function (item) {
          brandValidproductList.push(item);
        });
      }
      barndObj.products = brandValidproductList;
      console.log("barndObj", barndObj);
      collections.dataCollection(barndObj);
      this.currentRspo = barndObj;
      brandValidproductList = [];
      console.log("this.currentRspo", this.currentRspo);
    } else {
      var _this = this;
      this.isbrandCal-- 
      if (this._brandPreviousL) {
        this.currentRspo.products = this._brandPreviousL;
      }

      if(this.isbrandCal == 0 && this.currentRspo){
        if(this._brandPreviousL == undefined){
          this._brandPreviousL = this._resp.products;
        }
        this.currentRspo.products =  this._brandPreviousL;
        barndObj.products =  this._brandPreviousL;
        collections.dataCollection(barndObj);
        // this._previousColor = undefined;
        return;
      }


      for (var i = 0; i < this.currentRspo.products.length; i++) {
        var courrentItem = this.currentRspo.products[i];
        var courrentItemTag = courrentItem.tags;
        courrentItemTag.forEach(function (tagItem) {
          console.log("currenttag", tagItem);
          var ProdName = tagItem.value.slice(13);
          if (el.dataset.brand == ProdName) {
            var ProductRemoveindex = _this.currentRspo.products.indexOf(
              courrentItem
            );
            if (ProductRemoveindex > -1) {
              _this.currentRspo.products.splice(ProductRemoveindex, 1);
              i = -1;
            }
          }
        });
      }
      barndObj.products = this.currentRspo.products;
      collections.dataCollection(barndObj);
    }
  },
  ColorFilter: function (el, ev) {
    var _this = this;
    var colorvalidProductList = [];
    const colorObj = {};
    // if(!el.checked){
    //   this._color = 0;
    // }
    if (this.currentRspo && this._color == 0) {
      var productsList = this.currentRspo.products;
      this._ColorPreviousL = productsList;
    } else {
      productsList = this._ColorPreviousL;
      if (productsList == undefined) {
        productsList = this._resp.products;
      }
    }

    this._color++;
    if (el.checked == true) {
      this.isColorCal++
      // console.log(item, "item");
      productsList.forEach(function (prodcut) {
        var productTags = prodcut.tags;
        productTags.filter(function (tag) {
          var a = tag.value.slice(0, 12);
          var item = el.dataset;
          _this._key = Object.keys(item);
          if (_this._key == "color") {
            // item = el.dataset;
            if (a == "filter-color") {
              var x = `filter-color-${item.color}`;
              if (tag == x) {
                colorvalidProductList.push(prodcut);
              }
            }
          }
        });
      });
      if (this.currentRspo && this.isColorCal > 1) {
        this.currentRspo.products.forEach(function (item) {
          colorvalidProductList.push(item);
        });
      }
      colorObj.products = colorvalidProductList;
      console.log("colorObj", colorObj);
      collections.dataCollection(colorObj);
      this.currentRspo = colorObj;
      colorvalidProductList = [];
      console.log("this.currentRspo", this.currentRspo);
      // }
    } else {
      this.isColorCal--;
      var _this = this;
      if (this._ColorPreviousL) {
        this.currentRspo.products = this._ColorPreviousL;
      }

      if(this.isColorCal == 0 && this.currentRspo){
        if(this._ColorPreviousL == undefined){
          this._ColorPreviousL = this._resp.products;
        }
        this.currentRspo.products =  this._ColorPreviousL;
        colorObj.products =  this._ColorPreviousL;
        collections.dataCollection(colorObj);
        return;
      }

      // this.currentRspo.products.forEach(function (courrentItem) {
      for (var i = 0; i < this.currentRspo.products.length; i++) {
        var courrentItem = this.currentRspo.products[i];
        var courrentItemTag = courrentItem.tags;
        courrentItemTag.forEach(function (tagItem) {
          console.log("currenttag", tagItem);
          var ProdName = tagItem.value.slice(13);
          if (el.dataset.color == ProdName) {
            var ProductRemoveindex = _this.currentRspo.products.indexOf(
              courrentItem
            );
            console.log(ProductRemoveindex);
            if (ProductRemoveindex > -1) {
              _this.currentRspo.products.splice(ProductRemoveindex, 1);
              i = -1;
            }
          }
        });
      }

      colorObj.products = this.currentRspo.products;
      collections.dataCollection(colorObj);
     
    }
    // this._previousColor = el.dataset;
  },

  brandColorFilter: function (el, ev) {
    var _this = this;
    var ValidProductList = [];
    const obj = {};
    if (el.dataset.color) {
      this._brand = 0;
      if (this.colorCount >= 1) {
        this._brand++;
      }
      this.colorCount++;
    }
    if (this.currentRspo && this._brand == 0) {
      var productsList = this.currentRspo.products;
      this._brandColorPreviousL = productsList;
    } else {
      productsList = this._brandColorPreviousL;
      if (productsList == undefined) {
        var newproductsList = this._resp.products;
        productsList = this._resp.products;
      }
    }
    this._brand++;

    console.log("change-event-el == ", el);
    var item = el.dataset;
    if (el.checked == true) {
      console.log(item, "item");
      productsList.forEach(function (prodcut) {
        var productTags = prodcut.tags;
        productTags.filter(function (tag) {
          var a = tag.value.slice(0, 12);
          item = el.dataset;
          _this._key = Object.keys(item);
          if (_this._key == "brand") {
            if (a == "filter-brand") {
              var x = `filter-brand-${item.brand}`;
              if (tag == x) {
                ValidProductList.push(prodcut);
              }
            }
          } else {
            item = el.dataset;
            if (a == "filter-color") {
              var x = `filter-color-${item.color}`;
              if (tag == x) {
                ValidProductList.push(prodcut);
              }
            }
          }
        });
      });
      // if (addProduct == true) {
      // this._key == "brand"
      if (this.currentRspo && this._brand > 1) {
        this.currentRspo.products.forEach(function (item) {
          ValidProductList.push(item);
        });
      }
      obj.products = ValidProductList;
      console.log("obj", obj);
      collections.dataCollection(obj);
      this.currentRspo = obj;
      ValidProductList = [];
      console.log("this.currentRspo", this.currentRspo);
      // }
    } else {
      var _this = this;
      if (this._brandColorPreviousL) {
        this.currentRspo.products = this._brandColorPreviousL;
      }

      if (newproductsList) {
        obj.products = newproductsList;
        collections.dataCollection(obj);
      }

      // this.currentRspo.products.forEach(function (courrentItem) {
      for (var i = 0; i < this.currentRspo.products.length; i++) {
        var courrentItem = this.currentRspo.products[i];
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
                i = -1;
              }
            }
          } else {
            if (el.dataset.color == ProdName) {
              var ProductRemoveindex = _this.currentRspo.products.indexOf(
                courrentItem
              );
              // if (ProductRemoveindex > -1) {
              //   _this.currentRspo.products.splice(ProductRemoveindex, 1);
              //   i = -1;
              // }
            }
          }
        });
      }
      obj.products = this.currentRspo.products;
      collections.dataCollection(obj);
    }
  },
  priceFilter: function (el, ev) {
    if (this.currentRspo && this._count == 0) {
      var productsList = this.currentRspo.products;
      this._previousList = productsList;
    } else {
      productsList = this._previousList;
      if (productsList == undefined) {
        productsList = this._resp.products;
      }
    }
    this._count++;
    console.log("change-event-el == ", el);
    var validProduct = [];
    var priceObj = {};
    // var n = [];
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
    } else {
      //
      var a = [];
      var _this = this;
      if (this._previousList == undefined) {
        this._previousList = productsList;
      }
      this._previousList.forEach(function (courrentItem) {
        var courrentItemPrice = courrentItem.variants[0].price;
        if (
          courrentItemPrice <= Number(el.dataset.max) &&
          courrentItemPrice >= Number(el.dataset.min)
        ) {
          // a.push(courrentItem);
          var ProductRemoveprice = _this.currentRspo.products.indexOf(
            courrentItem
          );
          if (ProductRemoveprice > -1) {
            _this.currentRspo.products.splice(ProductRemoveprice, 1);
          }
        }
      });
      if (this.currentRspo.products.length == 0) {
        priceObj.products = this._previousList;
        this.currentRspo = undefined;
      } else {
        priceObj.products = this.currentRspo.products;
      }
      // this.currentRspo.products = priceObj.products;
      collections.dataCollection(priceObj);
    }
  },
};

export default filter;
