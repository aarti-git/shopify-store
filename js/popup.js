/**
 * creat overlay
 * which elent want to on the to of overlay
 * this fuction append to end of body(document.body.)
 * 
 */

const popup = {
    init: function(){
        var creatPopup = document.createElement("div");
        var ovaralyaDesplayElParent = document.createElement("section");

        creatPopup.classList.add("overlay");
        creatPopup.classList.add("hide");
        ovaralyaDesplayElParent.classList.add("DesplayElcss");
        ovaralyaDesplayElParent.classList.add("hide");
        

        this._overlay = creatPopup;
        this.Parent = ovaralyaDesplayElParent;

        document.body.append(creatPopup);
        document.body.append(ovaralyaDesplayElParent);
    },
    open: function(openOverlay){
        var popupElement = document.querySelector(openOverlay);
        if(!popupElement){
            return;
        }
        
        popupElement.classList.remove("hide");
        this._overlay.classList.remove("hide");
        this.Parent.classList.remove("hide");
        this.Parent.append(popupElement);
        this.popupElement =popupElement ;
    },
    close: function(closeOverlay){
        var popupRemove = document.querySelector(closeOverlay);
        if(!popupRemove){
            return;
        };
        this._overlay.classList.add("hide");
        popupRemove.classList.add("hide");
        this.popupElement.classList.add("hide");
        this.Parent.classList.add("hide");
    }
}

// popup.open('.slector')
// popup.close('.slector')

export default popup;