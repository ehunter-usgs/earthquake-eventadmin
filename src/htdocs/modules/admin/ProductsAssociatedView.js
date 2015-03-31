'use strict';

var CatalogEvent = require('CatalogEvent'),
    Collection = require('mvc/Collection'),
    ProductsView = require('admin/ProductsView'),
    View = require('mvc/View');

var ProductsAssociatedView = function (options) {
  var _this,
      _initialize,

      // variables
      _el,
      _event,
      _products,
      _section,
      //_productsEl,

      // methods
      _deleteProduct,
      _editProduct,
      _getProductViewByType,
      _preferProduct;

  _this = View(options);

  _initialize = function () {

    _el = _this.el;

    _section = document.createElement('section');
    _section.className = 'associated-products';
    _el.appendChild(_section);

    // get event
    _event = CatalogEvent(options.eventDetails);

    // get products
    _products = CatalogEvent.getWithoutSuperseded(
        CatalogEvent.productMapToList(
        _event.getProducts()));

    // _products = CatalogEvent.productMapToList(
    //     _event.getProducts());

    // render the view
    _this.render();

    options = null;
  };

  _preferProduct = function (e) {
    console.log('triggered _preferProduct');
    console.log(e);
  };

  _editProduct = function (e) {
    console.log('triggered _editProduct');
    console.log(e);
  };

  _deleteProduct = function (e) {
    console.log('triggered _deleteProduct');
    console.log(e);
  };

  _getProductViewByType = function (type) {
    var section,
        products = [];

    // Append Products Collection Table
    section = _section.querySelector('.associated-products-' + type);

    for (var i = 0; i < _products.length; i++) {
      if (type === _products[i].type) {
        products.push(_products[i]);
      }
    }

    // Build Associated Products Collection Table
    ProductsView({
      el: section,
      collection: Collection(products),
      preferredProduct: products[0],
      buttons: [
        {
          title: 'Make Preferred',
          className: 'trump',
          callback: _preferProduct
        },
        {
          title: 'Edit',
          className: 'edit',
          callback: _editProduct
        },
        {
          title: 'Delete',
          className: 'delete',
          callback: _deleteProduct
        }
      ]
    });
  };

  _this.render = function () {
    var type = null,
        product = null,
        i;

    // Append Header
    _section.innerHTML = '<h3>Products Associated</h3>';

    for(i = 0; i < _products.length; i++) {
      product = _products[i];
      if (type !== product.type) {
        type = product.type;
        _section.innerHTML = _section.innerHTML + '<h4>' + type + '</h4>' +
            '<section class="associated-products-' + type + '"></section>';
      }
    }

    for(i = 0; i < _products.length; i++) {
      product = _products[i];
      if (type !== product.type) {
        type = product.type;
        _getProductViewByType(type);
      }
    }

  };

  _initialize();
  return _this;
};

module.exports = ProductsAssociatedView;