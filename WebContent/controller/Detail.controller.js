sap.ui.define([
	"com/liu/CRUD/controller/BaseController",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (BaseController, MessageToast, MessageBox) {
	"use strict";
	return BaseController.extend("com.liu.CRUD.controller.Detail", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
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
		_onRouteMatched : function (oEvent) {
			var oArgs, oView, sPath;
			
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();			
			
			oView.bindElement({
				path : "/FlightCarrierSet(Carrid='"+ oArgs.carrId + "')",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						
					},
					dataReceived: function (oEvent) {
						
					}
				}
			});
			/*sPath = oEvent.getParameter("arguments").contextPath;
			sPath = sPath + "/HeaderSet(Bukrs='"+ oArgs.bukrs +"',Spkid='" + oArgs.spkId + "')";
			oView.byId("aktTable").bindRows(sPath+'/Aktivitas');*/
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		
		onEditToggled: function (oEvent){
			var sEdit = oEvent.getParameter("editable");			
			var oSave = this.getView().byId("save");
			oSave.setVisible(sEdit);
		},
		
		onSave: function (oEvent){
			var sPath = this.getView().getBindingContext().sPath;
			var oModel = this.getView().getBindingContext().getObject();
			var oSave = this.getView().byId("save");
			var oSmartform = this.getView().byId("smartForm");
			this.getView().getModel().update(sPath,oModel,{
				success: function (){					
					oSmartform.setEditable(false);
					oSave.setVisible(false);
					var sMsg = 'Update Successfull';
					MessageToast.show(sMsg);
					
				},
				error: function (oError){
					var message = jQuery.parseJSON(oError.responseText).error.message.value;
					MessageBox.error(message);
				}
			});
		},
		
		onDelete: function (oEvent){
			var sPath = this.getView().getBindingContext().sPath;
			var self = this;
			this.getView().getModel().remove(sPath,{
				success: function  (oData,oResponse){
					self.onNavBack();
					var sMsg = 'Delete Successfull';
					MessageToast.show(sMsg);
				},
				error: function (oError){
					var message = jQuery.parseJSON(oError.responseText).error.message.value;
					MessageBox.error(message);
				}
			})
		}
		
	});
});