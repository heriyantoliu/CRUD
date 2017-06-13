sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, JSONModel) {
	"use strict";

	return UIComponent.extend("com.liu.CRUD.Component", {

		metadata: {
			manifest: "json"
		},
		init: function () {
			
		    //var oManifestUi5 = this.getMetadata().getManifestEntry("sap.ui5");
		    //oManifestUi5.models[""].settings["user"] = "GGP-09936";
		    //oManifestUi5.models[""].settings["password"] = "google";
			
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();
            
            var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			this.setModel(oModel,"device");
        },
        
        getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
        

	});

});
