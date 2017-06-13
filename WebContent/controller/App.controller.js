sap.ui.define([
	"com/liu/CRUD/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("com.liu.CRUD.controller.App", {
		onPress : function(oEvent){
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("detail",{
				carrId : oCtx.getProperty("Carrid")				
			});
		},
		onAdd : function(oEvent){
			this.getRouter().navTo("add");
		}
	});
});