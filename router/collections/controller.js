import { setupLink } from '@js/utils.js'
const collections = {
    init:function($view, $param){
        console.log('$param', $param)
        var _this = this;
        // var checkboxIndicator = document.querySelectorAll(".checkboxIndicator-parent");
        this._brandSearchParentEl = $view.querySelector(".brand-search-div");
        this._brandSearchBar = $view.querySelector(".barnd-search-bar");
        this._brandSearchicon = $view.querySelector(".brand-search-icon");
        this._brandSearchRemoveBtn = $view.querySelector(".brand-search-remove");
        this._brandSearchicon.addEventListener("click",function(){
           _this.barndSearchBarOpen();
        })
        this._brandSearchRemoveBtn.addEventListener("click",function(){
            _this.barndSearchBarClose();
        })

        setupLink($view)
    },
    barndSearchBarOpen:function(){
        this._brandSearchBar.classList.remove("hide");
        this._brandSearchParentEl.classList.add("hide");
    },
    barndSearchBarClose:function(){
        this._brandSearchBar.classList.add("hide");
        this._brandSearchParentEl.classList.remove("hide");
    }
}
export default collections;