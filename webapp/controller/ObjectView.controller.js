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
            var oModel = sap.ui.getCore().getModel(oModel);
            this.getView().setModel(oModel, "view");


            // TEST
            // var oModel1 = this.getView().getModel();
            // var oModel2 = sap.ui.getCore().getModel();
            // // var oModel = this.getOwnerComponent().getModel();
            // var oDataModel1 = oModel1.oData;
            // var oDataModel2 = oModel2.oData;

            // console.log(oDataModel1);
            // console.log(oDataModel2);
            // var test = oDataModel1["ZEWMIEFSI01STOCKSet(Lgnum='VA01',Lgtyp='VAK1',Matid='CHIEMSEER_HELL')"]

            // console.log(test);

            // var test1 = oModel1.getProperty("ZEWMIEFSI01STOCKSet(Lgnum='VA01',Lgtyp='VAK1',Matid='CHIEMSEER_HELL')");

            // console.log(test1);

        },

        onOpenDialog: function(e) {
            // selected item data
            var selectedObject = e.getSource().getBindingContext().getObject();
            console.log(selectedObject);

            // var oData = {
            //     item: {
            //         ID: selectedObject.ID,
            //         Lgtyp: selectedObject.Lgtyp,
            //         // Lgnum: selectedObject.Lgnum,
            //         TotalQuan: selectedObject.TotalQuan,
            //         Unit: selectedObject.Unit,
            //         // Matid: selectedObject.Matid,
            //         // Mandt: selectedObject.Mandt,
            //         SelectedValue: selectedObject.SelectedValue,
            //         // Items: selectedObject.Items,
            //         NameItem: selectedObject.NameItem,
            //         Name: selectedObject.Name,
            //         Rating: selectedObject.Rating,
            //         Description: selectedObject.Description,
            //         Alcohol: selectedObject.Alcohol,
            //         Category: selectedObject.Category,
            //         NameContainer: selectedObject.NameContainer,
            //         UnitsOnOrder: selectedObject.UnitsOnOrder,
            //         LastRefill: selectedObject.LastRefill
            //     }
            // };

            // console.log(oData);
            // // creating new model with selected data
            // var oModel = new JSONModel(oData);

            // // making the model available for other views
            // sap.ui.getCore().setModel(oModel);
            // this.getView().setModel(oModel, "objectView");
            
            // load and open fragment
            Fragment.load({
                id: this.getView().getId(),
                name: "beerreplenishment.view.fragment.Popover",
                controller: this
            }).then(function(oDialog) {
                oDialog.open();
            });
        },

        onAfterRendering: function(e) {

        },

        onCancelDialog: function(e) {
            e.getSource().getParent().destroy();
		},

        onChangeStepInput: function(e) {
            // show footer
            // var oObjectPageLayout = this.byId("ObjectPageLayout");
			// oObjectPageLayout.setShowFooter();

            // get stepinput value
            var valueStepInput = e.getSource().getValue();

            // selected item data
            var selectedObject = e.getSource().getBindingContext().getObject();
            console.log(selectedObject);

            var oDataItem = {
                Mandt: selectedObject.Mandt,
                Matnr: selectedObject.Matnr,
                Quan: selectedObject.Quan,
                Description: selectedObject.Description,
                Lgnum: selectedObject.Lgnum,
                Lgtyp: selectedObject.Lgtyp,
                Lastrefill: selectedObject.Lastrefill,
                Matid: selectedObject.Matid,
                Openreplenishment: selectedObject.Openreplenishment,
                Unit: selectedObject.Unit,
                SelectedValue: valueStepInput
            };

            console.log(oDataItem);
            // creating new model with selected data
            var oModelItem = new JSONModel(oDataItem);
            // making the model available for other views
            sap.ui.getCore().setModel(oModelItem);
            // this.getView().setModel(oModel, "objectView");
        },

        onSave: function(e) {
            sap.ui.core.BusyIndicator.show();

            var oModelView = this.getView().getModel();
            var oModel = sap.ui.getCore().getModel();
            // var oModel = this.getOwnerComponent().getModel();
            var oDataModel = oModel.oData;
            
            console.log(oModel);
            console.log(oDataModel);

            var oUrlParams = {
                FromWhNr: oDataModel.Lgnum,
                FromStorType: oDataModel.Lgtyp,
                MaterialID: oDataModel.Matid,
                Quantity: oDataModel.SelectedValue,
                UoM: oDataModel.Unit
            }

            console.log(oUrlParams);

            var oModel1 = this.getOwnerComponent().getModel();
            console.log(oModel1);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oModel1.callFunction("/ConsumeDrinks", {
                method: "POST",
                urlParameters: oUrlParams,
                success: fnS,
                error: fnE
            });
            function fnS (oData, response) {
                console.log(response);
                sap.ui.core.BusyIndicator.hide();
                oModel1.refresh();
                MessageBox.success(
                    "Successfully removed drink, enjoy!",
                    {
                        title: "Successful!",
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (oAction) {
                            oRouter.navTo("RouteMainView");
                        }
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