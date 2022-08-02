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
            console.log(oModel);

            var test = oModel.getData();
            var test2 = test.item.Items;
            console.log(test2);
            var sum = 0;
            console.log(test2[0].TotalQuan);

            for (var i = 0; i < test2.length; i++) {
                sum = sum + test2[i].TotalQuan;
                // console.log(test2[i].TotalQuan);
            }
            console.log(sum);

            var oDataLocal = {
                item: {
                    Capacity: sum,

                }
            }
        },

        onOpenDialog: function(e) {
            // selected item data
            var selectedObject = e.getSource().getBindingContext().getObject();
            console.log(selectedObject);

            var oData = {
                item: {
                    ID: selectedObject.ID,
                    Lgtyp: selectedObject.Lgtyp,
                    // Lgnum: selectedObject.Lgnum,
                    TotalQuan: selectedObject.TotalQuan,
                    Unit: selectedObject.Unit,
                    // Matid: selectedObject.Matid,
                    // Mandt: selectedObject.Mandt,
                    SelectedValue: selectedObject.SelectedValue,
                    // Items: selectedObject.Items,
                    NameItem: selectedObject.NameItem,
                    Name: selectedObject.Name,
                    Rating: selectedObject.Rating,
                    Description: selectedObject.Description,
                    Alcohol: selectedObject.Alcohol,
                    Category: selectedObject.Category,
                    NameContainer: selectedObject.NameContainer,
                    UnitsOnOrder: selectedObject.UnitsOnOrder,
                    LastRefill: selectedObject.LastRefill
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
            e.getSource().getParent().destroy();
		},

        onChangeStepInput: function(e) {
            var valueStepInput = e.getSource().getValue();
            console.log(valueStepInput);

            var oModel = this.getModel();
            var path = e.getSource().getBindingContext().getPath();
            var obj = oModel.getProperty(path);

            obj.SelectedValue = valueStepInput;
            
            console.log(obj);
        },

        onSave: function(e) {

            var oModel = this.getView().getModel(oModel, "/ZEWMIEFSI01STOCKSet");
            console.log(oModel);
            var oData = oModel.oData["ZEWMIEFSI01STOCKSet(ID=1,Lgtyp='VAK1')"];
            console.log(oData);

            var testData = {
                TotalQuan: oData.SelectedValue
            }
            console.log(testData);

            oData.TotalQuan = testData.TotalQuan;


            if (oData.SelectedValue !== 0) {
                oModel.update("/ZEWMIEFSI01STOCKSet(ID=1,Lgtyp='VAK1')", testData, {
                    method: "PUT",
                    success: function(data) {
                        // test2.TotalQuan = aEntries.SelectedValue;
                        MessageBox.success(
                            "Successfully removed drink, enjoy!",
                            {
                                title: "Successful!",
                                emphasizedAction: MessageBox.Action.OK
                            });
                        // alert("success");
                    },
                    error: function(e) {
                        MessageBox.error("Something went wrong. Please try again.");
                    }
                });
            } else {
                MessageBox.error("Please select a Drink first.",
                {
                    title: "Error!",
                });
            }
        }

        

	});

});