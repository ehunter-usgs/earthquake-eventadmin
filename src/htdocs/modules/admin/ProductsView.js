'use strict';

var View = require('mvc/View');

var ProductsView = function (options) {
  var _this,
      _initialize,

      // variables
      _el,
      _productsEl;

  _this = View(options);

  _initialize = function () {

    _productsEl = document.createElement('section');
    _productsEl.className = 'products-view';

    _el = _this.el;
    _el.appendChild(_productsEl);

    // render the view
    _this.render();

    options = null;
  };

  _this.render = function () {
    _productsEl.innerHTML = '<h3>Products Associated</h3><p>Event\'s products go here</p>';
  };

  _initialize();
  return _this;
};

module.exports = ProductsView;