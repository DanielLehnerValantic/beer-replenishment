sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "beerreplenishment/model/formatter",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterType",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter, Filter, FilterOperator, FilterType, JSONModel, BaseController) {
        "use strict";

        return BaseController.extend("beerreplenishment.controller.MainView", {

            formatter: formatter,

            onInit: function() {

                var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table");

                // Put down worklist table's original value for busy indicator delay,
                // so it can be restored later on. Busy handling on the table is
                // taken care of by the table itself.
                
                // iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
                this._oTable = oTable;
                // keeps the search state
                this._aTableSearchState = [];

                // Model used to manipulate control states
                oViewModel = new JSONModel({
                    worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
                    tableBusyDelay: 0,
                });
                this.setModel(oViewModel, "mainviewView");

    

            },

            onUpdateFinished : function (oEvent) {
                // update the worklist's object counter after the table update
                var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");

                // only update the counter if the length is final and
                // the table is not empty
                if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                    sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
                } else {
                    sTitle = this.getResourceBundle().getText("worklistTableTitle");
                }
                this.getModel("mainviewView").setProperty("/worklistTableTitle", sTitle);
            },

            onPress: function(oEvent){


                var oItem, oCtx;
                oItem = oEvent.getSource();
                oCtx = oItem.getBindingContext();
                console.log("oCtx");
                console.log(oCtx);
                var oData = oCtx.oModel.oData;
                console.log("oData");
                console.log(oData);

                var oPath = oEvent.getSource().getBindingContext().getPath();
                var obj = oCtx.getProperty(oPath);
                var oModel1 = new sap.ui.model.json.JSONModel(oData);
                sap.ui.getCore().setModel(oModel1, "modelname");
                console.log(oModel1);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);  

                oRouter.navTo("ObjectView", {
                    TotalQuan: obj.TotalQuan,
                    path: window.encodeURIComponent(oPath)
                });
                // this.getRouter().navTo("ObjectView");
            }
            
        });
    });
