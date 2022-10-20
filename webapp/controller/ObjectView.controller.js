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

	return BaseController.extend("beerreplenishment.controller.ObjectView", {

        formatter: formatter,

		onInit : function () {
            this.getRouter().getRoute("ObjectView").attachMatched(this.onRouteMatched, this);
		},

        onRouteMatched: function(e) {
            // get selected item
            var oArguments = e.getParameter("arguments");
            var Lgtyp = oArguments.Lgtyp;

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

            // get selected model
            var oModel = sap.ui.getCore().getModel("view");
            this.getView().setModel(oModel, "view");
        },

        onChangeStepInput: function(e) {
            var valueStepInput = e.getSource().getValue();
            var selectedObject = e.getSource().getBindingContext();
            var sPath = selectedObject.getPath();
            var oModelItem = this.getView().getModel().getProperty(sPath);
            oModelItem.SelectedValue = valueStepInput.toString();

            console.log(oModelItem);

            var test = [];

            test.push();

        },

        onSave: function(e) {
            var oModel = this.getOwnerComponent().getModel();
            console.log(oModel);
            var oModelFridge = sap.ui.getCore().getModel("view").oData;
            var oModelChiem = this.getView().getModel().getProperty("/ZEWMIEFSI01STOCKSet(Lgnum='VA01',Lgtyp='VAK1',Matid='CHIEMSEER_HELL')");
            var oModelTeger = this.getView().getModel().getProperty("/ZEWMIEFSI01STOCKSet(Lgnum='VA01',Lgtyp='VAK1',Matid='TEGERNSEER_HELL')");

            var oUrlParams = {
                FromWhNo: oModelFridge.Lgnum,
                FromStorBin: "VAK1-01",
                FromStorType: oModelFridge.Lgtyp,
                toPositions: []
            }

            var chiem = {
                StorWhNo: oModelChiem.Lgnum,
                StorBin: "VAK1-01",
                StorType: oModelChiem.Lgtyp,
                MatNr: oModelChiem.Matnr,
                Quantity: oModelChiem.SelectedValue,
                UoM: oModelChiem.Unit
            }

            var teger = {
                StorWhNo: oModelTeger.Lgnum,
                StorBin: "VAK1-01",
                StorType: oModelTeger.Lgtyp,
                MatNr: oModelTeger.Matnr,
                Quantity: oModelTeger.SelectedValue,
                UoM: oModelTeger.Unit
            }

            oUrlParams.toPositions.push(chiem);
            oUrlParams.toPositions.push(teger);

            console.log(oUrlParams);

            oModel.create("/LocationSet", oUrlParams, {
                success: fnS,
                error: fnE
            });
            function fnS (oData, response) {
                console.log(response);
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