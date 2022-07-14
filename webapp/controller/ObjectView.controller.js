sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"mycompany/myapp/MyWorklistApp/model/formatter",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (
	BaseController, JSONModel, History, formatter, DateFormat, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("beerreplenishment.controller.ObjectView", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
            console.log("22222");

            // var oViewModel = new JSONModel({
            //     worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
            //     tableBusyDelay: 0,
            // });
            // this.setModel(oViewModel, "mainviewView");

            // var oData = sap.ui.getCore().getModel("modelName").getData();
            // console.log("213123213");
            // console.log(oData);
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});

                var oData = sap.ui.getCore().getModel("modelname").getData();
                console.log(oData);

			this.getRouter().getRoute("objectview").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectviewView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
					// Restore original busy indicator delay for the object view
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				}
			);
		},

        _onPostMatched: function (oEvent) {
			var oViewModel = this.getModel("objectview"),
				oDataModel = this.getModel();
                console.log(oDataModel);
                console.log("test123");

			this.getView().bindElement({
				path: "/ZEWMIEFSI01STSet('" + oEvent.getParameter("arguments").postId + "')",
				events: {
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */


		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("mainview", {}, true);
			}
		}

	});

});