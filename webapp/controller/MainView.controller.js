sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("beerreplenishment.controller.MainView", {


            onInit: function() {
    

            },

            onPress: function(oEvent){

                var oItem, oCtx;
                oItem = oEvent.getSource();
                oCtx = oItem.getBindingContext();

                var test = oCtx.getProperty("sPath");
                var oPath = oEvent.getSource().getBindingContext().getPath();
                var selectedObject = oEvent.getSource().getBindingContext().getObject();
                var obj = oCtx.getProperty(oPath);

                var selectedItem = selectedObject.Lgtyp;
                var selectedItem1 = selectedObject.TotalQuan;

                console.log(selectedItem);

                console.log("selectedObject");
                console.log(selectedObject);

                this.getRouter().navTo("ObjectView", {
                    "Lgtyp" : selectedItem
                });

            }
            
        });
    });
