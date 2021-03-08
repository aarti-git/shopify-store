const slider = {
  init: function ($view) {
    // console.log("view", $view)
    const _this = this;
    this._view = $view;
    this._TranslateX = 100;
    this._bannerParent = $view.querySelector(".banner-parent");
    this._bannerItemList = $view.querySelectorAll(".banner-item");
    console.log("this._bannerItemList", this._bannerItemList);
    this._bannerItemConut = this._bannerItemList.length;

    // dynamic slider buttons
    const sliderBtn = $view.querySelector(".banner-buts");
    this._bannerItemList.forEach(function (item, id) {
      var dot = document.createElement("button");
      dot.classList.add('dot-btn')
      sliderBtn.append(dot);
      if (id == 0) {
        dot.classList.add("active");
      }
      dot.addEventListener("click", function () {
        _this.bannerSlider(this, id);
        // console.log("id = ", id);
      });
    });

    this.bannerAtomaticSlider();
  },
  bannerSlider: function (el, id) {
    var dotBtns = this._view.querySelector(".active");
    dotBtns.classList.remove("active")
    this.activeBtn(el);
    clearInterval(this._interval);
    var datasetV = this._bannerParent.dataset.slidepos;
    if (datasetV === undefined) {
      datasetV = 0;
    } else {
      datasetV = Number(datasetV);
    }
    if (id == 0) {
      datasetV = 0;
    } else {
      datasetV = -(this._TranslateX * id);
    }
    this._bannerParent.dataset.slidepos = datasetV;

    for (var i = 0; i < this._bannerItemList.length; i++) {
      this._bannerItemList[i].style.transform = "translateX(" + datasetV + "%)";
    }
    this.bannerAtomaticSlider(id);
  },
  bannerAtomaticSlider: function (x) {
    const _this = this;
    var dotBtns = this._view.querySelectorAll(".dot-btn");
    var count = 1;
    var prv;
    if(x){
      count= x+1;
    }
    this._interval = setInterval(function () {
      //slider  active button
      if (prv == undefined) {
        var firstBtn = _this._view.querySelector(".active");
        firstBtn.classList.remove("active");
      }
      var currentbtn = dotBtns[count];
      currentbtn.classList.add("active");
      if (prv) {
        prv.classList.remove("active");
      }
      count++;
      if (count == dotBtns.length) {
        count = 0;
      }
      prv = currentbtn;
      // atomatic slider
      var datasetV = _this._bannerParent.dataset.slidepos;
      if (datasetV === undefined) {
        datasetV = 0;
      } else {
        datasetV = Number(datasetV);
      }
      datasetV -= _this._TranslateX;
      if (datasetV == -(_this._TranslateX * _this._bannerItemConut)) {
        datasetV = 0;
      }
      _this._bannerParent.dataset.slidepos = datasetV;

      for (var i = 0; i < _this._bannerItemList.length; i++) {
        _this._bannerItemList[i].style.transform = "translateX(" + datasetV + "%)";
      }
    }, 5000);
  },
  activeBtn: function (el) {
    // active button
    el.classList.add("active");
    if (this._pItem !== el) {
      if (this._pItem !== undefined) {
        this._pItem.classList.remove("active");
      }
    }
    this._pItem = el;
  },
};
export default slider;
