sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */
		init: function() {

			this.oMockServer = new MockServer({
				rootUri: "/sap/opu/odata/sap/ZEWM_EF_SI01_SRV/"
			});
			var sMetadataRelativePath = "../localService/metadata.xml";
			var oMockSettings = {
				sMockdataBaseUrl: "../localService/data",
				bGenerateMissingMockData: false
			};
			var oMockServer = this.oMockServer;

			oMockServer.simulate(sMetadataRelativePath, oMockSettings);
			oMockServer.start();

		}

	};

});