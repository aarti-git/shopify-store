import { setupLink } from '@js/utils.js'
import popup from'@js/popup.js'
const layout = {
  init: function ($view) {
		popup.init();
	  	var _this = this;
		this.row = $view.querySelector(".row");
		this._searchInput = $view.querySelector("#searchBarInput");
		this._searchResult = $view.querySelector(".searchResult");
		this._headerIconsGroup = $view.querySelector(".header-group");
		this._searchbar = $view.querySelector(".search-bar");
		this._searchFont = $view.querySelector(".mobile-search-parent");
		this._searchFont.addEventListener("click", function () {
			_this.mobileSearchOpen();
		});
		this._mobileSearchBarRemove = $view.querySelector(".mobile-search-removeBtn");
		this._mobileSearchBarRemove.addEventListener("click", function () {
		  _this.mobileSearchClose();
		});
		
		// mobile menu popup open
		const MobileMenuBar = $view.querySelector(".menu-bar-svg");
		MobileMenuBar.addEventListener("click",function(){
			_this.mobilePopup();
		})

		// mobile-menu popup close
		const MobileMenuRemove =$view.querySelector('.remove-form');
		MobileMenuRemove.addEventListener("click",function() {
			_this.mobilePopupRemove();
		})

		const mobileManuList =$view.querySelectorAll('.mobile-menu-list li');
		mobileManuList.forEach(function(item){
			item.addEventListener("click",function() {
				_this.mobilePopupRemove();
			})
		})
		

		setupLink($view)
	},
	mobilePopup:function(){
		popup.open(".menu-bar-overlay");
	},
	mobilePopupRemove:function(){
		const ActionEl= '.menu-bar-overlay';
		popup.close(ActionEl);
	},
	mobileSearchOpen: function () {
		this._searchFont.classList.add("hide");
		this._searchbar.style.display = "block";
		this._headerIconsGroup.classList.add("hide");
		this._mobileSearchBarRemove.classList.remove("hide");
		this.row.firstElementChild.classList.add("hide");
		this.row.lastElementChild.classList.add("col-xs-12");
		this._searchInput.style.background= "white";
		// this._searchInput.style.padding= "10px 0";
	},
	mobileSearchClose: function () {
		this._searchFont.classList.remove("hide");
		this._searchbar.style.display = "none";
		this._headerIconsGroup.classList.remove("hide");
		this.row.firstElementChild.classList.remove("hide");
		this.row.lastElementChild.classList.remove("col-xs-12");
		this._searchInput.style.background= "";
		// this._searchInput.style.padding= "0";
		this._searchInput.value = "";
		this.clearSearchBtn();
	},
	clearSearchBtn: function () {
		this._searchInput.value = "";
		this._searchResult.innerHTML = "";
		this._searchResult.classList.add("hide");
	},
};
export default layout;
