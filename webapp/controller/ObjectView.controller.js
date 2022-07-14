sap.ui.define([
	"./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
	"sap/m/Button",
    "sap/m/MessageToast",
	"sap/m/Text"
], function (BaseController, Filter, FilterOperator, MessageToast, Text, Dialog, Button) {
	"use strict";

	return BaseController.extend("beerreplenishment.controller.ObjectView", {

		onInit : function () {
            this.getRouter().getRoute("ObjectView").attachMatched(this.onRouteMatched, this);
		},

        onRouteMatched: function(oEvent) {

            // get selected item
            var oArguments = oEvent.getParameter("arguments");
            var Lgtyp = oArguments.Lgtyp;

            // filter for selected item
            var aFilter = [];
            var sQuery = Lgtyp;

            if (sQuery) {
                aFilter.push(new Filter("Lgtyp", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.getView().byId("productTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);



            
        },

        onSearchProduct: function(oEvent) {
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");

            if (sQuery) {
                aFilter.push(new Filter("Lgtyp", FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oList = this.getView().byId("productTable");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },

        openDialog: function(oEvent) {
            console.log("test");
        },

        onApproveDialogPress: function () {
			if (!this.oApproveDialog) {
				this.oApproveDialog = new Dialog({
					type: DialogType.Message,
					title: "Confirm",
					content: new Text({ text: "Do you want to submit this order?" }),
					beginButton: new Button({
						type: ButtonType.Emphasized,
						text: "Submit",
						press: function () {
							MessageToast.show("Submit pressed!");
							this.oApproveDialog.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: "Cancel",
						press: function () {
							this.oApproveDialog.close();
						}.bind(this)
					})
				});
			}

			this.oApproveDialog.open();
		}

	});

});