sap.ui.define([
    "./BaseController",
    "beerreplenishment/model/formatter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, formatter, JSONModel) {
        "use strict";

        return BaseController.extend("beerreplenishment.controller.MainView", {

            formatter: formatter,

            onInit: function() {
    
            },

            onPress: function(e){
                // selected item data
                var selectedObject = e.getSource().getBindingContext().getObject();
                console.log(selectedObject);

                var capacity = 80;
                var capacityVal = (selectedObject.TotalQuan * 100) / capacity;

                // creating new data object with selected data
                var oData = {
                    item : {
                        Lgtyp: selectedObject.Lgtyp,
                        Lgnum: selectedObject.Lgnum,
                        TotalQuan: selectedObject.TotalQuan,
                        Unit: selectedObject.Unit,
                        Capacity: capacity,
                        CapacityVal: capacityVal
                    }
                };

                console.log(oData);

                // creating new model with selected data
                var oModel = new JSONModel(oData);

                // making the model available for other views
                sap.ui.getCore().setModel(oModel);

                this.getRouter().navTo("ObjectView", {
                    "Lgtyp": selectedObject.Lgtyp
                });
            }
        });
    });
