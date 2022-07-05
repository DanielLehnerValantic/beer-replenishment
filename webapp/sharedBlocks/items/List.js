sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var itemsList = BlockBase.extend("beerreplenishment.sharedBlocks.items.List", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "beerreplenishment.sharedBlocks.items.List",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "beerreplenishment.sharedBlocks.items.List",
					type: ViewType.XML
				}
			}
		}
	});
	return itemsList;
});
