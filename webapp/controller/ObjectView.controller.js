sap.ui.define([
	"./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "beerreplenishment/model/formatter",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/List",
	"sap/m/StandardListItem",
	"sap/m/Text",
    "sap/m/StepInput",
    "sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
    "sap/m/Label",
    "sap/m/VBox",
    "sap/m/HBox"
], function (BaseController, Filter, FilterOperator, Fragment, formatter, Dialog, Button, mobileLibrary, List, StandardListItem, Text, StepInput, HorizontalLayout, VerticalLayout, Label, VBox, HBox) {
	"use strict";

    // shortcut for sap.m.ButtonType
	var ButtonType = mobileLibrary.ButtonType;

	// shortcut for sap.m.DialogType
	var DialogType = mobileLibrary.DialogType;

	return BaseController.extend("beerreplenishment.controller.ObjectView", {

        formatter: formatter,

		onInit : function () {
            this.getRouter().getRoute("ObjectView").attachMatched(this.onRouteMatched, this);
		},

        onRouteMatched: function(oEvent) {
            // get selected item
            var oArguments = oEvent.getParameter("arguments");
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
            oBinding.filter(aFilter);

            // get selected model
            var oModel = sap.ui.getCore().getModel(oModel);
            var oData = oModel.getData();
            this.getView().setModel(oModel, "view");

            // var Lgtyp = oData.item.Lgtyp;

        },

        onOpenDialog: function(oEvent) {
            Fragment.load({
                id: this.getView().getId(),
                name: "beerreplenishment.view.fragment.Popover",
                controller: this
            }).then(function(oDialog) {
                oDialog.open();
            });
        },

        onCancelDialog : function () {
			this.byId("takeDialog").close();
		}

	});

});