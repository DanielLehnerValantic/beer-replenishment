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
            // var oList = sap.ui.getCore().byId("productTable");
            var oList = this.getView().byId("productTable");
            console.log(oList);
            // var oBinding = oList.getBinding("items");

            // activate filter for selected item
            // oBinding.filter(aFilter);

            // get selected model
            var oModel = sap.ui.getCore().getModel(oModel);
            // var oData = oModel.getData();
            this.getView().setModel(oModel, "view");

        },

        onOpenDialog: function(e) {
            // selected item data
            var selectedObject = e.getSource().getBindingContext().getObject();
            console.log(selectedObject);

            var oData = {
                item: {
                    Lgtyp: selectedObject.Lgtyp,
                    Lgnum: selectedObject.Lgnum,
                    TotalQuan: selectedObject.TotalQuan,
                    Unit: selectedObject.Unit,
                    Matid: selectedObject.Matid,
                    Mandt: selectedObject.Mandt,
                    SelectedValue: 0,
                    Items: selectedObject.Items
                }
            };

            console.log(oData);
            // creating new model with selected data
            var oModel = new JSONModel(oData);

            // making the model available for other views
            sap.ui.getCore().setModel(oModel);
            this.getView().setModel(oModel, "objectView");
            
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
			// this.byId("takeDialog").close();
            e.getSource().getParent().destroy();
		},

        onChangeStepInput: function(e) {
            // var valueStepInput = this.getView().byId("stepInputDialog").getValue();

            // var selectedValModel = this.getModel("SelectedValue");
            // selectedValModel.setData({
            //     SelectedValue: valueStepInput
            // });
        },

        onSubmitDialog: function(e) {
            // get Dialog Stepinput value
            var valueStepInput = this.getView().byId("stepInputDialog").getValue();
            // this.getView().getModel().getData();

            var oModel = this.getView().getModel("objectView");
            oModel.setProperty("/item/SelectedValue", valueStepInput);
            console.log(oModel);

            // var oTable = this.getView().byId("productTable"),
                // oModel = oTable.getModel();
                
            // console.log(oTable);
            // console.log(oModel);
            // console.log(aItems);

            // insert Stepinput value into data model
            // var selectedValModel = this.getModel("SelectedValue");
            // selectedValModel.setData({
            //     SelectedValue: valueStepInput
            // });

            // var createSelectedItemModel = this.getModel("selectedItem");
            // console.log(createSelectedItemModel);
            // oModel.setData({
            //     item1: {
            //         SelectedValue: valueStepInput
            //     }
            // });

            // console.log(createSelectedItemModel);
            
            e.getSource().getParent().destroy();
        }

        

	});

});