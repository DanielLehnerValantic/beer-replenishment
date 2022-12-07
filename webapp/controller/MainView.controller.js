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

    // var fridgeSvg = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 71.54 122.88\" style=\"enable-background:new 0 0 71.54 122.88\" xml:space=\"preserve\"><g><path d=\"M6.14,0H65.4c1.69,0,3.23,0.69,4.34,1.8c1.11,1.11,1.8,2.65,1.8,4.34v29.67v73.73c0,1.69-0.69,3.23-1.8,4.34 c-1.11,1.11-2.65,1.8-4.34,1.8h-4.89v2.72c0,2.47-2.02,4.49-4.49,4.49l0,0c-2.47,0-4.49-2.02-4.49-4.49v-2.72H20.17v2.72 c0,2.47-2.02,4.49-4.49,4.49l0,0c-2.47,0-4.49-2.02-4.49-4.49v-2.72H6.14c-1.69,0-3.23-0.69-4.34-1.8c-1.11-1.11-1.8-2.65-1.8-4.34 V35.81V6.14C0,4.45,0.69,2.91,1.8,1.8C2.91,0.69,4.45,0,6.14,0L6.14,0z M10.2,44.89c0-1.34,1.09-2.43,2.43-2.43 c1.34,0,2.43,1.09,2.43,2.43v20.4c0,1.34-1.09,2.43-2.43,2.43c-1.34,0-2.43-1.09-2.43-2.43V44.89L10.2,44.89z M10.2,10.39 c0-1.34,1.09-2.43,2.43-2.43c1.34,0,2.43,1.09,2.43,2.43v15.15c0,1.34-1.09,2.43-2.43,2.43c-1.34,0-2.43-1.09-2.43-2.43V10.39 L10.2,10.39z M4.87,33.37h61.81V6.14c0-0.35-0.14-0.67-0.38-0.9c-0.23-0.23-0.55-0.38-0.9-0.38H6.14c-0.35,0-0.67,0.14-0.9,0.38 c-0.23,0.23-0.38,0.55-0.38,0.9V33.37L4.87,33.37z M66.67,38.24H4.87v71.29c0,0.35,0.14,0.67,0.38,0.9 c0.23,0.23,0.55,0.38,0.9,0.38H65.4c0.35,0,0.67-0.14,0.9-0.38c0.23-0.23,0.38-0.55,0.38-0.9V38.24L66.67,38.24z\"/></g></svg>";

    var fridgeSvg = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 71.54 122.88\" style=\"enable-background:new 0 0 71.54 122.88\" xml:space=\"preserve\"><g><path d=\"M6.14,0H65.4c1.69,0,3.23,0.69,4.34,1.8c1.11,1.11,1.8,2.65,1.8,4.34v29.67v73.73c0,1.69-0.69,3.23-1.8,4.34 c-1.11,1.11-2.65,1.8-4.34,1.8h-4.89v2.72c0,2.47-2.02,4.49-4.49,4.49l0,0c-2.47,0-4.49-2.02-4.49-4.49v-2.72H20.17v2.72 c0,2.47-2.02,4.49-4.49,4.49l0,0c-2.47,0-4.49-2.02-4.49-4.49v-2.72H6.14c-1.69,0-3.23-0.69-4.34-1.8c-1.11-1.11-1.8-2.65-1.8-4.34 V35.81V6.14C0,4.45,0.69,2.91,1.8,1.8C2.91,0.69,4.45,0,6.14,0L6.14,0z M10.2,44.89c0-1.34,1.09-2.43,2.43-2.43 c1.34,0,2.43,1.09,2.43,2.43v20.4c0,1.34-1.09,2.43-2.43,2.43c-1.34,0-2.43-1.09-2.43-2.43V44.89L10.2,44.89z M10.2,10.39 c0-1.34,1.09-2.43,2.43-2.43c1.34,0,2.43,1.09,2.43,2.43v15.15c0,1.34-1.09,2.43-2.43,2.43c-1.34,0-2.43-1.09-2.43-2.43V10.39 L10.2,10.39z M4.87,33.37h61.81V6.14c0-0.35-0.14-0.67-0.38-0.9c-0.23-0.23-0.55-0.38-0.9-0.38H6.14c-0.35,0-0.67,0.14-0.9,0.38 c-0.23,0.23-0.38,0.55-0.38,0.9V33.37L4.87,33.37z M66.67,38.24H4.87v71.29c0,0.35,0.14,0.67,0.38,0.9 c0.23,0.23,0.55,0.38,0.9,0.38H65.4c0.35,0,0.67-0.14,0.9-0.38c0.23-0.23,0.38-0.55,0.38-0.9V38.24L66.67,38.24z\"/></g></svg>";

	return BaseController.extend("beerreplenishment.controller.MainView", {

        formatter: formatter,

        _setCustomShapeDefinition:  function (sShapeId, sSvg) {
            var oCustomShape = this.getView().byId(sShapeId);
            oCustomShape.setDefinition(sSvg);
        },
        
		onInit: function () {
            this._setCustomShapeDefinition("customShape0", fridgeSvg);
            
            var oRootPath = jQuery.sap.getModulePath("beerreplenishment"); // your resource root
            var oImageModel = new sap.ui.model.json.JSONModel({
                path : oRootPath,
            });
            this.setModel(oImageModel, "imageModel");
            
		},

        onAfterRendering: function() {
            var Lgtyp = "VAK1";

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

            console.log(oBinding);
            var oList = this.getView().byId("productTable");
            var oBinding = oList.getBinding("items");
            var aKeys = oBinding.aKeys;
            var oModel = this.getOwnerComponent().getModel();
            var oData = this.getView().getModel().oData;
            console.log(aKeys);
            console.log(oData);
            var oUrlParams = {
                FromWhNo: "VA01",
                FromStorBin: "VAK1-01",
                FromStorType: "VAK1",
                toPositions: []
            }
            
            for(var i = 0; i < Object.keys(aKeys).length; i++) {
                var sPath = aKeys[i];
                var dataObj = oData[i];
                var singleData = {
                    Description: dataObj.Description,
                    StorBin: "VAK1-01",
                    StorType: dataObj.Lgtyp,
                    MatNr: dataObj.Matnr,
                    Quantity: dataObj.SelectedValue,
                    UoM: dataObj.Unit
                }
                oUrlParams.toPositions.push(singleData);
                dataObj.SelectedValue = 0;
            }
            console.log(oUrlParams);
        },

        onChangeStepInput: function(e) {
            var valueStepInput = e.getSource().getValue();
            var selectedObject = e.getSource().getBindingContext();
            var sPath = selectedObject.getPath();
            var oModelItem = this.getView().getModel().getProperty(sPath);
            oModelItem.SelectedValue = valueStepInput.toString();
            console.log(oModelItem);
        },

        onSave: function(e) {
            var oList = this.getView().byId("productTable");
            var oBinding = oList.getBinding("items");
            var aKeys = oBinding.aKeys;
            var oModel = this.getOwnerComponent().getModel();
            var oData = this.getView().getModel().oData;
            var oUrlParams = {
                FromWhNo: "VA01",
                FromStorBin: "VAK1-01",
                FromStorType: "VAK1",
                toPositions: []
            }
            
            for(var i = 0; i < Object.keys(aKeys).length; i++) {
                var sPath = aKeys[i];
                var dataObj = oData[sPath];
                var singleData = {
                    StorWhNo: dataObj.Lgnum,
                    StorBin: "VAK1-01",
                    StorType: dataObj.Lgtyp,
                    MatNr: dataObj.Matnr,
                    Quantity: dataObj.SelectedValue,
                    UoM: dataObj.Unit
                }
                oUrlParams.toPositions.push(singleData);
                dataObj.SelectedValue = 0;
            }
            console.log(oUrlParams);

            oModel.create("/LocationSet", oUrlParams, {
                success: fnS,
                error: fnE
            });
            function fnS (oData, response) {
                oModel.refresh(true);
                oModel.updateBindings(true);
                
                MessageBox.success(
                    "Successfully removed drink, enjoy!",
                    {
                        title: "Successful!",
                        emphasizedAction: MessageBox.Action.OK,
                        // onClose: function (oAction) {
                        //     oRouter.navTo("RouteMainView");
                        // }
                });
            };
            function fnE (oError) {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.error("Something went wrong. Please try again. "+oError.message, {
                    onClose: function (oAction) {
                        
                    }
                });
            };

            
            
        },

        onCancel: function() {
            
        }

	});

});