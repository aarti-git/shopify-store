import collections from "../router/collections/controller.js";
const filter = {
  init: function ($view, resp) {
    console.log("filter init done", resp);
    this._view = $view;
    this._resp = resp;
    this.appFilter(resp);
    this.priceFilter(resp);
  },
  appFilter: function (resp) {
    var _this = this;
    var array = [];
    const obj = {};
    // var previousfilterP = [];
    var productsList = resp.products;
    var input = this._view.querySelectorAll("input");
    input.forEach(function (item) {
      item.addEventListener("change", function (item) {
        if (item.target.checked == true) {
          // console.log(item, "item");
          // console.log(itemName,"itemName")
          productsList.forEach(function (prodcut) {
            var productTags = prodcut.tags;
            productTags.filter(function (tag) {
              var a = tag.value.slice(0, 12);
              var itemName = item.target.parentElement.nextElementSibling.innerText.toLowerCase();
              if (itemName) {
                if (a == "filter-brand") {
                  var x = `filter-brand-${itemName}`;
                  if (tag == x) {
                    // console.log("tag", tag);
                    // console.log("product", prodcut);
                    array.push(prodcut);
                  }
                }
              } else {
                var itemName = item.target.parentElement.nextElementSibling.nextElementSibling.innerText.toLowerCase();
                if (a == "filter-color") {
                  var x = `filter-color-${itemName}`;
                  if (tag == x) {
                    // console.log("tag", tag);
                    // console.log("product", prodcut);
                    array.push(prodcut);
                  }
                }
              }
            });
          });
          // console.log("array", array);
          obj["products"] = array;
          console.log("obj", obj);
          collections.dataCollection(obj);
          // _this.priceFilter(obj);
          // previousfilterP.push(array);
          // console.log("previousfilterP = ",previousfilterP)
          array = [];
        } else {
          collections.dataCollection(resp);
        }
      });
    });
  },
  priceFilter: function (resp) {
    var validProduct = [];
    var priceObj ={}
    var price = this._view.querySelector(".price");
    var priceInputs = price.querySelectorAll("input");
    priceInputs.forEach(function (item) {
      item.addEventListener("change", function (event) {
        var item = this.dataset;

        if (event.target.checked == true) {
          var products = resp.products;
          for (var i = 0; i < products.length; i++) {
            var price = products[i].variants[0].price;
            var maxNo = Number(item.max)
            var minNo = Number(item.min)
            console.log("numbers ==", maxNo);
            if(price <= maxNo && price >= minNo){
              var r = products[i];
                validProduct.push(r);
                console.log("priceR==", r);
            }
          }
          priceObj.products = validProduct;
          console.log("priceObj", priceObj);
          collections.dataCollection(priceObj);
          validProduct = [];
        }else{
          collections.dataCollection(resp);
        }
      });
    });
  },
};

export default filter;
