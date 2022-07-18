sap.ui.define([
	"./BaseController",
    "sap/ui/core/Core",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
	"sap/m/Button",
    "sap/m/MessageToast",
	"sap/m/Text",
    "sap/m/DialogType",
    "sap/m/ButtonType",
    "sap/ui/core/Fragment",
    "sap/m/library",
    "sap/m/TextArea",
    "sap/ui/layout/HorizontalLayout",
	"sap/ui/layout/VerticalLayout",
    "sap/m/Label",
    "beerreplenishment/model/formatter"
], function (BaseController, Core, Filter, FilterOperator, MessageToast, Text, Dialog, Button, DialogType, ButtonType, Fragment, mobileLibrary, TextArea, HorizontalLayout, VerticalLayout, Label, formatter) {
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

        onOpenDialog: function(oEvent) {
            // create dialog lazily
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "beerreplenishment.view.fragment.Popover"
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});


            	// var oButton = oEvent.getSource(),
				// oView = this.getView();

                // if (!this._pPopover) {
                //     this._pPopover = Fragment.load({
                //         id: oView.getId(),
                //         name: "beerreplenishment.view.fragment.Popover",
                //         controller: this
                //     }).then(function(oPopover) {
                //         oView.addDependent(oPopover);
                //         oPopover.bindElement("test");
                //         return oPopover;
                //     });
                // }
                // this._pPopover.then(function(oPopover) {
                //     oPopover.openBy(oButton);
                // });
        },
        

        // onApproveDialogPress: function (oEvent) {
		// 	if (!this.oApproveDialog) {
		// 		this.oApproveDialog = new Dialog({
		// 			type: DialogType.Message,
		// 			title: "Confirm",
		// 			content: new Text({ text: "Do you want to submit this order?" }),
		// 			beginButton: new Button({
		// 				type: ButtonType.Emphasized,
		// 				text: "Submit",
		// 				press: function () {
		// 					MessageToast.show("Submit pressed!");
		// 					this.oApproveDialog.close();
		// 				}.bind(this)
		// 			}),
		// 			endButton: new Button({
		// 				text: "Cancel",
		// 				press: function () {
		// 					this.oApproveDialog.close();
		// 				}.bind(this)
		// 			})
		// 		});
		// 	}

		// 	this.oApproveDialog.open();
		// },

        // onPressButtonDialog: function (oEvent) {
		// 	var oButton = oEvent.getSource(),
		// 		oView = this.getView();

		// 	if (!this._pPopover) {
		// 		this._pPopover = Fragment.load({
		// 			id: oView.getId(),
		// 			name: "beerreplenishment.view.fragment.Popover",
		// 			controller: this
		// 		}).then(function(oPopover) {
		// 			oView.addDependent(oPopover);
		// 			oPopover.bindElement("test");
		// 			return oPopover;
		// 		});
		// 	}
		// 	this._pPopover.then(function(oPopover) {
		// 		oPopover.openBy(oButton);
		// 	});
		// },

		// handleCloseButton: function (oEvent) {
		// 	// note: We don't need to chain to the _pPopover promise, since this event-handler
		// 	// is only called from within the loaded dialog itself.
		// 	this.byId("myPopover").close();
		// }

	});

});