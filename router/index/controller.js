const app = {
  init: function () {},
  afterRoute: function () {
    const allAnchorTags = document.querySelectorAll("a");
	allAnchorTags.forEach(function(a){
		a.addEventListener("click", function (e) {
			e.preventDefault();
			const href = '#' + this.getAttribute('href')
			location.hash = href
		});
	})
  },
};
export default app;
