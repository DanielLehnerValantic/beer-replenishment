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
            // console.log(oModel); 



            // TESTING
            console.log(oBinding);
            var oTable  = this.getView().byId("productTable");
            console.log(oTable);
            var items = oTable.getSelectedItems();
            console.log(items);
            var sPath = oTable.getBindingPath("items");
            console.log(sPath);

            var test123 = oBinding.getModel();
            console.log(test123);

            var oModelObject = test123.getProperty("/ZEWMIEFSI01STOCKSet");;
            console.log(oModelObject);


            var test2 = oList.getModel();
            console.log(test2);

            // oDataModel.getProperty("/EntitySet");

            // making the model available for other views
            // sap.ui.getCore().setModel(oModelContainer);

            var test = sap.ui.getCore().getModel();
            console.log(test);
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
            var oModel = sap.ui.getCore().getModel();
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
            // oModel1.callFunction("/ConsumeDrinks", {
            //     method: "POST",
            //     urlParameters: oUrlParams,
            //     success: fnS,
            //     error: fnE
            // });
            // function fnS (oData, response) {
            //     console.log(response);
            //     MessageBox.success(
            //         "Successfully removed drink, enjoy!",
            //         {
            //             title: "Successful!",
            //             emphasizedAction: MessageBox.Action.OK
            //     });
            // };
            // function fnE (oError) {
            //     MessageBox.error("Something went wrong. Please try again."+oError.message);
            // };
            
        




            // if (oData1.SelectedValue !== 0) {
            //     oModel1.update("/ZEWMIEFSI01STOCKSet(ID=1,Lgtyp='VAK1')", testData, {
            //         method: "PUT",
            //         success: function(data) {
            //             // oData.selectedValue = 0;
            //             // oData.TotalQuan = 1;
            //             // test2.TotalQuan = aEntries.SelectedValue;
                        
            //             MessageBox.success(
            //                 "Successfully removed drink, enjoy!",
            //                 {
            //                     title: "Successful!",
            //                     emphasizedAction: MessageBox.Action.OK
            //                 });
            //                 // oModel1.updateBindings();
            //             // alert("success");
            //         },
            //         error: function(e) {
            //             MessageBox.error("Something went wrong. Please try again.");
            //         }
            //     });
            // } else {
            //     MessageBox.error(
            //         "Please select a Drink first.",
            //         {
            //             title: "Error!",
            //             emphasizedAction: MessageBox.Action.CANCEL
            //         });
            // }

            // // var oModel = sap.ui.getCore().getModel(oModel);
            // // this.getView().setModel(oModel, "view");

            // var oModel2 = sap.ui.getCore().getModel(oModel2);
            // console.log(oModel2);
            // var oData4 = oModel2.oData;
            // console.log(oData4);

            // var oModel1 = this.getView().getModel(oModel1, "/ZEWMIEFSI01STOCKSet");
            // var oData1 = oModel1.oData["ZEWMIEFSI01STOCKSet(ID=1,Lgtyp='VAK1')"];
            // var oData2 = oModel1.oData["ZEWMIEFSI01STOCKSet(ID=2,Lgtyp='VAK1')"];
            // var oData3 = oModel1.oData["ZEWMIEFSI01STOCKSet(ID=3,Lgtyp='VAK1')"];

            // oData1.TotalQuan = oData1.TotalQuan - oData1.SelectedValue;
            // oData2.TotalQuan = oData2.TotalQuan - oData2.SelectedValue;
            // oData3.TotalQuan = oData3.TotalQuan - oData3.SelectedValue;
            // oModel1.updateBindings();


            // // var oDataTest = {
            // //     item : {
            // //         TotalQuan: oData1.TotalQuan + oData2.TotalQuan + oData3.TotalQuan
            // //     }
            // // };
            // var totalQuan = oData1.TotalQuan + oData2.TotalQuan + oData3.TotalQuan;
            // oData4.item.TotalQuan = totalQuan;
            // oData4.item.CapacityVal = (totalQuan * 100) / 80;
            // oData4.item.Items[0].TotalQuan = oData1.TotalQuan;
            // oData4.item.Items[0].TotalQuanPerc = (oData1.TotalQuan * 100) / 80;
            // oData4.item.Items[1].TotalQuan = oData2.TotalQuan;
            // oData4.item.Items[1].TotalQuanPerc = (oData2.TotalQuan * 100) / 80;
            // oData4.item.Items[2].TotalQuan = oData3.TotalQuan;
            // oData4.item.Items[2].TotalQuanPerc = (oData3.TotalQuan * 100) / 80;

            // // oData4[item].TotalQuan = 1;
            // oModel2.updateBindings();
            // // this.getView().setModel(oModel2, "view");
            // // this.getView().setModel(oModel2, "view");
            // console.log(oModel2);

            // if (oData1.SelectedValue !== 0 || oData2.SelectedValue !== 0 || oData3.SelectedValue !== 0) {
            //     oData1.SelectedValue = 0;
            //     oData2.SelectedValue = 0;
            //     oData3.SelectedValue = 0;
            //     oModel1.updateBindings();
            //     oModel2.updateBindings();
            //     MessageBox.success(
            //         "Successfully removed drink, enjoy!",
            //         {
            //             title: "Successful!",
            //             emphasizedAction: MessageBox.Action.OK
            //     });
            // } else {
            //     MessageBox.error(
            //         "Please select a Drink first.",
            //         {
            //             title: "Error!",
            //             emphasizedAction: MessageBox.Action.CANCEL
            //         });
            // }
            
            


            
        },

        onCancel: function() {
            
        }

        

	});

});