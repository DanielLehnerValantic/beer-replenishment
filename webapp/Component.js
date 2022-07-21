sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "beerreplenishment/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("beerreplenishment.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // set the selected value model
                this.setModel(models.createSelectedValModel(), "selectedValue");

                // set the selected item model
                this.setModel(models.createSelectedItemModel(), "selectedItem");
                
            }
        });
    }
);