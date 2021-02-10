import root from "@temp/main.html";
const app = {
  init: function () {
		this.loadRoot()
	},
	loadRoot: function(){
		document.body.innerHTML = root
	},
};
export default app;
