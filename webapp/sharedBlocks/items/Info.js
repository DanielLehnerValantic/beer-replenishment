sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var itemsList = BlockBase.extend("beerreplenishment.sharedBlocks.items.Info", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "beerreplenishment.sharedBlocks.items.Info",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "beerreplenishment.sharedBlocks.items.Info",
					type: ViewType.XML
				}
			}
		}
	});
	return itemsList;
});
