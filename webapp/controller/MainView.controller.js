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

                var capacity = 40;
                var quantity = parseFloat(selectedObject.TotalQuan).toFixed(0);
                var capacityVal = (quantity * 100) / capacity;

                // creating new data object with selected data
                var oDataContainer = {
                    Lgtyp: selectedObject.Lgtyp,
                    Lgnum: selectedObject.Lgnum,
                    TotalQuan: quantity,
                    Unit: selectedObject.Unit,
                    Capacity: capacity,
                    CapacityVal: capacityVal
                };

                console.log(oDataContainer);

                // creating new model with selected data
                var oModelContainer = new JSONModel(oDataContainer);

                // making the model available for other views
                sap.ui.getCore().setModel(oModelContainer, "view");

                this.getRouter().navTo("ObjectView", {
                    "Lgtyp": selectedObject.Lgtyp
                });
            }
        });
    });
