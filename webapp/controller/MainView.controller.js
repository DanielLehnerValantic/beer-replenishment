sap.ui.define([
	"./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "beerreplenishment/model/formatter",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (BaseController, Filter, FilterOperator, Fragment, formatter, MessageBox, JSONModel) {
	"use strict";

	return BaseController.extend("beerreplenishment.controller.MainView", {

        formatter: formatter,

		onInit: function () {
            
		},

        onAfterRendering: function() {
            var Lgtyp = "VAK1";

            // filter for selected item "Lgtyp"
            var aFilter = [];
            var sQuery = Lgtyp;
            if(sQuery) {
                aFilter.push(new Filter("Lgtyp", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.getView().byId("productTable");
            var oBinding = oList.getBinding("items");

            // activate filter for selected item
            oBinding.filter(aFilter);
        },

        onChangeStepInput: function(e) {
            var valueStepInput = e.getSource().getValue();
            var selectedObject = e.getSource().getBindingContext();
            var sPath = selectedObject.getPath();
            var oModelItem = this.getView().getModel().getProperty(sPath);
            oModelItem.SelectedValue = valueStepInput.toString();
            console.log(oModelItem);
        },

        onSave: function(e) {
            var oList = this.getView().byId("productTable");
            var oBinding = oList.getBinding("items");
            var aKeys = oBinding.aKeys;
            var oModel = this.getOwnerComponent().getModel();
            var oData = this.getView().getModel().oData;
            var oUrlParams = {
                FromWhNo: "VA01",
                FromStorBin: "VAK1-01",
                FromStorType: "VAK1",
                toPositions: []
            }
            
            for(var i = 0; i < Object.keys(aKeys).length; i++) {
                var sPath = aKeys[i];
                var dataObj = oData[sPath];
                var singleData = {
                    StorWhNo: dataObj.Lgnum,
                    StorBin: "VAK1-01",
                    StorType: dataObj.Lgtyp,
                    MatNr: dataObj.Matnr,
                    Quantity: dataObj.SelectedValue,
                    UoM: dataObj.Unit
                }
                oUrlParams.toPositions.push(singleData);
                dataObj.SelectedValue = 0;
            }
            console.log(oUrlParams);

            oModel.create("/LocationSet", oUrlParams, {
                success: fnS,
                error: fnE
            });
            function fnS (oData, response) {
                oModel.refresh(true);
                oModel.updateBindings(true);
                
                MessageBox.success(
                    "Successfully removed drink, enjoy!",
                    {
                        title: "Successful!",
                        emphasizedAction: MessageBox.Action.OK,
                        // onClose: function (oAction) {
                        //     oRouter.navTo("RouteMainView");
                        // }
                });
            };
            function fnE (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error("Something went wrong. Please try again. "+oError.message, {
                    onClose: function (oAction) {
                        
                    }
                });
            };

            
            
        },

        onCancel: function() {
            
        }

	});

});