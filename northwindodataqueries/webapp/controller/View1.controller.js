sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel"
], function (Controller, Filter, FilterOperator, JSONModel) {
	"use strict";

	return Controller.extend("northwindodataqueries.controller.View1", {
		onInit: function () {
			var that = this;

			//Filter
			this.getOwnerComponent().getModel().read("/Products", {
				filters: [
					new Filter("ProductID", FilterOperator.EQ, 1)
				],
				success: function (oData) {
					var productModel = new JSONModel(oData);
					that.getView().setModel(productModel, "productModel");
					that.getView().getModel("productModel").refresh();
				}
			});
			//OrderBy
			this.getOwnerComponent().getModel().read("/Customers", {
				urlParameters: {
					$orderby: "Country"
				},
				success: function (oData) {
					var customerModel = new JSONModel(oData);
					that.getView().setModel(customerModel, "customerModel");
					that.getView().getModel("customerModel").refresh();
				}
			});
			//Select 
			this.getOwnerComponent().getModel().read("/Orders", {
				urlParameters: {
					$select: "OrderID,CustomerID,Freight"
				},
				success: function (oData) {
					var orderModel = new JSONModel(oData);
					that.getView().setModel(orderModel, "orderModel");
					that.getView().getModel("orderModel").refresh();
				}
			});
			//Top & Skip
			this.getOwnerComponent().getModel().read("/Regions", {
				urlParameters: {
					$skip: "2",
					$top: "1"
				},
				success: function (oData) {
					var regionModel = new JSONModel(oData);
					that.getView().setModel(regionModel, "regionModel");
					that.getView().getModel("regionModel").refresh();
				}
			});
			//Expand
			this.getOwnerComponent().getModel().read("/Customers", {
				urlParameters: {
					$expand: "Orders"
				},
				success: function (oData) {
					var expandModel = new JSONModel(oData);
					that.getView().setModel(expandModel, "expandModel");
					that.getView().getModel("expandModel").refresh();
				}
			});
			//Count
			this.getOwnerComponent().getModel().read("/Orders", {
				urlParameters: {
					$count: true
				},
				success: function (oData) {
					var countModel = new JSONModel(oData);
					that.getView().setModel(countModel, "countModel");
					that.getView().byId("titleCount").setTitle(that.getView().getModel("countModel").getData().results.length);
					that.getView().getModel("countModel").refresh();
				}
			});
			//All
			this.getOwnerComponent().getModel().read("/Suppliers", {
				filters: [
					new Filter("SupplierID", FilterOperator.EQ, 1)
				],
				urlParameters: {
					$expand: "Products",
					$top: "1",
					$orderby: "CompanyName",
					$select: "ContactName"

				},
				success: function (oData) {
					var allModel = new JSONModel(oData);
					that.getView().setModel(allModel, "allModel");
					that.getView().getModel("allModel").refresh();
				}
			});
		}
	});
});

//https://community.sap.com/t5/technology-blogs-by-members/implemention-of-odata-queries-in-sap-ui5-app/ba-p/13412764