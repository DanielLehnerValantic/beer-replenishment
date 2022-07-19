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

        },

        // onSearchProduct: function(oEvent) {
        //     var aFilter = [];
        //     var sQuery = oEvent.getParameter("query");

        //     if (sQuery) {
        //         aFilter.push(new Filter("Lgtyp", FilterOperator.Contains, sQuery));
        //     }

        //     // filter binding
        //     var oList = this.getView().byId("productTable");
        //     var oBinding = oList.getBinding("items");
        //     oBinding.filter(aFilter);
        // },

        // if (!this.pDialog) {
        //     this.pDialog = this.loadFragment({
        //         name: "sap.ui.demo.walkthrough.view.HelloDialog"
        //     });
        // }

        // this.pDialog.then(function(oDialog) {
        //     oDialog.open();
        // });

        onOpenDialog: function(oEvent) {

            Fragment.load({
                id: this.getView().getId(),
                name: "beerreplenishment.view.fragment.Popover",
                controller: this
            }).then(function(oDialog) {
                oDialog.open();
            });



            // if (!this.oDefaultDialog) {
			// 	this.oDefaultDialog = new Dialog({
            //         type: DialogType.Message,
			// 		title: "Confirm",
            //         class: "testDialog",
            //         content: [
			// 			new HorizontalLayout({
            //                 // width: "150px",
			// 				content: [
			// 					new VerticalLayout({
			// 						width: "120px",
			// 						content: [
			// 							new Text({ text: "Type: " }),
			// 							new Text({ text: "Delivery: " }),
			// 							new Text({ text: "Available: " })
			// 						]
			// 					}),
			// 					new VerticalLayout({
			// 						content: [
			// 							new Text({ text: "Tegernseer hell" }),
			// 							new Text({ text: "Jun 26, 2013" }),
			// 							new Text({ text: "8" })
			// 						]
			// 					})
			// 				]
			// 			}),
			// 			new VerticalLayout({
            //                 // width: "100%",
            //                 // textAlign: "center",
            //                 content: [
            //                     new VerticalLayout({
            //                         // width: "100%",
            //                         // text: "center",
			// 						content: [
            //                             new Label({
            //                                 text: "How much beer do you want to withdraw?"
            //                             }),
			// 							new StepInput({
            //                                 value: "1",
            //                                 change: "onChangeStepInput",
            //                                 textAlign: "Center",
            //                                 width: "50%",
            //                                 class: "sapUiSmallMarginTop"
                                            
            //                             })
			// 						]
			// 					})
            //                 ]
            //             })
			// 		],
			// 		beginButton: new Button({
			// 			type: ButtonType.Emphasized,
			// 			text: "Submit",
			// 			press: function () {
			// 				this.oDefaultDialog.close();
			// 			}.bind(this)
			// 		}),
			// 		endButton: new Button({
            //             // type: ButtonType.Reject,
			// 			text: "Cancel",
			// 			press: function () {
			// 				this.oDefaultDialog.close();
			// 			}.bind(this)
			// 		})
			// 	});

			// 	// to get access to the controller's model
			// 	this.getView().addDependent(this.oDefaultDialog);
			// }

			// this.oDefaultDialog.open();
        },

        onCancelDialog : function () {
			this.byId("takeDialog").close();
		}

	});

});