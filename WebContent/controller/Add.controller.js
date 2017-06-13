sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, History, MessageToast) {
	"use strict";
	return Controller.extend("com.liu.CRUD.controller.Add", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("add").attachMatched(this._onRouteMatched, this);
			// Hint: we don't want to do it this way
			/*
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);
			*/
		},
		
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		_onNavBack: function() {
			this.getView().getModel().deleteCreatedEntry(this._oContext);
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined){
				window.history.go(-1);
			}else{
				this.getRouter().navTo("app", {}, true);
			}
		},
		
		_onRouteMatched : function (oEvent) {
			var oModel = this.getView().getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded: function () {

			// create default properties
			/*var oProperties = {
				ProductID: "" + parseInt(Math.random() * 1000000000, 10),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "EUR",
				MeasureUnit: "EA"
			};*/

			// create new entry in the model
			this._oContext = this.getView().getModel().createEntry("/FlightCarrierSet");
			
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		
		onSave: function (oEvent){
			var self = this;
			this.getView().getModel().submitChanges({
				success: function (){
					var sMsg = 'Create Successfull';
					MessageToast.show(sMsg);
					self._onNavBack();
				},
				error: function (oError){
					var message = jQuery.parseJSON(oError.responseText).error.message.value;
					MessageBox.error(message);
				}
			});
			
		}
		
	});
});