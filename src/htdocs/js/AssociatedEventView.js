'use strict';

var EventComparisonView = require('./EventComparisonView'),
    CatalogEvent = require('./CatalogEvent'),
    Collection = require('mvc/Collection'),
    ModalView = require('mvc/ModalView'),
    Util = require('util/Util'),
    View = require('mvc/View');

var AssociatedEventView = function (options) {
  var _this,
      _initialize,

      // variables
      _associatedEventsEl,
      _dialog,
      _el,
      _event,
      _subEvents,

      // methods
      _disassociateCallback,
      _disassociateEvent,
      _getModalContent,
      _createView,
      _onCancel,
      _onConfirm;

  options = Util.extend({}, options);
  _this = View(options);


  _initialize = function () {
    var section = document.createElement('section');

    _el = _this.el;
    _el.appendChild(section);
    _event = CatalogEvent(options.eventDetails);

    section.className = 'associated-event-view';
    section.innerHTML = '<h3>Associated Events</h3>' +
        '<div class="associated-events"></div>';
    _associatedEventsEl = section.querySelector('.associated-events');

    // build the collection table of associated events
    _createView();
    options = null;
  };

  /**
   * Create the associated events table, this table contains all sub-events
   * a disassociate button.
   */
  _createView = function () {
    var id = null,
        events = [];

    _subEvents = _event.getSubEvents();

    for (id in _subEvents) {
      events.push(_subEvents[id].getSummary());
    }

    // Collection table inserts markup via innerHTML
    EventComparisonView({
      el: _associatedEventsEl,
      referenceEvent: _event.getSummary(),
      collection: new Collection(events),
      buttons: [
        {
          title: 'Disassociate',
          className: 'disassociate',
          callback: _disassociateCallback
        }
      ]
    });
  };

  /**
   * Opens a dialog to confirm the disassociation
   *
   * @param  {object} eventSummary,
   *         summary of the event to be removed
   */

  _disassociateCallback = function (eventSummary) {

    _dialog = new ModalView(_getModalContent(eventSummary), {
      title: 'Disassociate ' + eventSummary.id + '?',
      classes: ['disassociate-modal-view'],
      closable: true,
      buttons: [
        {
          text: 'Yes',
          classes: [
            'confirm',
            'green'
          ],
          callback: function () { _onConfirm(eventSummary); }
        },
        {
          text: 'No',
          classes: [
            'cancel',
            'red'
          ],
          callback: _onCancel
        }
      ]
    });

    _dialog.show();
  };


  /**
   * Build content for a modal dialog with detailed information about the
   * event to be disassociated.
   *
   * @param  {object} eventSummary,
   *         The eventdetails required to send a disassociate product.
   *
   * @return {String}
   *         The markup generated for the disassociate modal dialog.
   */
  _getModalContent = function (eventSummary) {
    var products = _subEvents[eventSummary.id].getProducts();

    // TODO, display collection of products inside ProductsView
    return '<p>The following products will be removed from this ' +
        'event with the disassociation:</p>' +
        '<pre><code>' + JSON.stringify(products, null, '  ') + '</code></pre>';
  };

  /**
   * Closes the disassociate model dialog when a user does not confirm the
   * event disassociation.
   */
  _onCancel = function () {
    // close the form
    _dialog.hide();
  };

  /**
   * Passes along event details for the event to be disassociated. This method
   * should is called after confirming the disassociate.
   *
   * @param  {object} eventSummary,
   *         the eventdetails required to send a disassociate product.
   *
   */
  _onConfirm = function (eventSummary) {
    //TODO, call send products page with a disassociate product
    console.log('disassociating the following event: ' + eventSummary.id);
    // close the form
    _dialog.hide();
  };

  /**
   * Clean up private variables, methods, and remove event listeners.
   */
  _this.destroy = function () {

    // methods
    _disassociateCallback = null;
    _disassociateEvent = null;
    _getModalContent = null;
    _createView = null;
    _onCancel = null;
    _onConfirm = null;

    // variables
    _associatedEventsEl = null;
    _dialog = null;
    _el = null;
    _event = null;
    _subEvents = null;
  };


  _initialize();
  return _this;
};


module.exports = AssociatedEventView;
