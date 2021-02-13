import popup from'@js/popup.js'
const layout = {
  init: function () {
	  	var _this = this;
		// mobile menu popup open
		const MobileMenuBar = document.querySelector(".menu-bar-svg");
		MobileMenuBar.addEventListener("click",function(){
			_this.mobilePopup();
		})

		// mobile-menu popup close
		const MobileMenuRemove =document.querySelector('.remove-form');
		MobileMenuRemove.addEventListener("click",function() {
			_this.mobilePopupRemove();
		})
	},
	mobilePopup:function(){
		popup.open(".menu-bar-overlay");
	},
	mobilePopupRemove:function(){
		const ActionEl= '.menu-bar-overlay';
		popup.close(ActionEl);
	},
};
export default layout;
