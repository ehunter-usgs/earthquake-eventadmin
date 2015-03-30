'use strict';

var AssociatedEventView = require('admin/AssociatedEventView'),
    ProductsView = require('admin/ProductsView'),
    EventModulePage = require('base/EventModulePage'),
    Util = require('util/Util');


var AdminSummaryPage = function (options) {
  options = Util.extend({}, options || {});

  EventModulePage.call(this, options);
};

AdminSummaryPage.prototype = Object.create(EventModulePage.prototype);

AdminSummaryPage.prototype._setContentMarkup = function () {

  AssociatedEventView({
    el: this._content,
    eventDetails: this._event
  });

  ProductsView({
    el: this._content,
    eventDetails: this._event
  });

};


module.exports = AdminSummaryPage;
