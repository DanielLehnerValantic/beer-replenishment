sap.ui.define([
	"./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "beerreplenishment/model/formatter",
    "sap/ui/model/json/JSONModel"
], function (BaseController, Filter, FilterOperator, Fragment, formatter, JSONModel) {
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
            oBinding.filter(aFilter);

            // get selected model
            var oModel = sap.ui.getCore().getModel(oModel);
            // var oData = oModel.getData();
            this.getView().setModel(oModel, "view");

            // var oModel2 = 

        },

        onOpenDialog: function(e) {
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
			// this.byId("takeDialog").close();
            e.getSource().getParent().destroy();
		},

        onChangeStepInput: function(e) {
            var value = this.getView().byId("stepInputDialog").getValue();
            console.log(value);
        },

        onSubmitDialog: function(e) {
            console.log(this);
            // stepInputDialog
        }

        

	});

});