"use strict";
var MAX_THREADS = 5;
var SHEET_URL_KEY = "_sheet_url";


var sheetHelper;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SheetHelper = function () {
  function SheetHelper(sheet, _ref) {
    var idColumn = _ref.idColumn;

    _classCallCheck(this, SheetHelper);

    this.sheet = sheet;
    this.idColumn = idColumn || 0;
  }

  /**
   * Create an item in sheet as Row,
   * @param item
   */


  _createClass(SheetHelper, [{
    key: "create",
    value: function create(item) {
      this.sheet.appendRow(item);
    }

    /**
     * Read A Row by id
     * @param id
     * @returns {*}
     */

  }, {
    key: "read",
    value: function read(id) {
      return this.findByColumnName(this.idColumn, id)[0];
    }

    /**
     * This will find a value in a specif column, Will return an array of all matches
     * @param column
     * @param value
     * @returns {Array}
     */

  }, {
    key: "findByColumnName",
    value: function findByColumnName(column, value) {

      var values = this.sheet.getDataRange().getValues();
      var rows = [];
      values.forEach(function (item, row) {
        if (item[column] == value) {
          rows.push({ item:item, row: row + 1 });
        }
      });
      return rows;
    }

    /** *
     * This will find a value in a specif column, Will return an array of all matches
     * @param column
     * @param value
     * @returns {Array}
     */

  }, {
    key: "find",
    value: function find(column, value) {
      return this.findByColumnName(column, value);
    }

    /**
     * Update a row by Row
     * @param row
     * @param item
     */

  }, {
    key: "updateByRow",
    value: function updateByRow(row, item) {
      var range = this.sheet.getRange(row, 1, 1, item.length);
      range.setValues([item]);
    }

    /**
     * Update a row by ID
     * @param id
     * @param item
     */

  }, {
    key: "updateById",
    value: function updateById(id, item) {
      var sheetItem = this.read(id);
       console.log(id,item,sheetItem);
      if (sheetItem.row !== undefined) {
        return this.updateByRow(sheetItem.row, item);
      }

      return false;
    }

    /**
     * Delete a row by ID
     * @param id
     * @returns {boolean}
     */

  }, {
    key: "deleteById",
    value: function deleteById(id) {
      var item = this.read(id);
      if (item && item.row) {
        this.sheet.deleteRow(item.row);
        return true;
      }

      return false;
    }
  }]);

  return SheetHelper;
}();

function getSheetHelper() {
    if (!sheetHelper)
        sheetHelper = new SheetHelper(createOrGetSheet().getSheets()[0], {idColumn: 0});
    return sheetHelper;
}


function createOrGetSheet() {
    var userProperties = PropertiesService.getUserProperties();

    var sheetUrl = userProperties.getProperty(SHEET_URL_KEY);
    var sheet;
    if (sheetUrl == undefined) {
        sheet = SpreadsheetApp.create("Contacts DB");
        sheetUrl = sheet.getUrl();
        userProperties.setProperty(SHEET_URL_KEY, sheetUrl);
        createInitialSheet(sheet)
    } else {
        sheetUrl = "https://docs.google.com/spreadsheets/d/1YSkzNVfPmZfCUEhcpUUn-Q4rwGXB-eYLrvhIoTlopD8/edit#gid=0";
        sheet = SpreadsheetApp.openByUrl(sheetUrl);
    }

    return sheet;
}

function createInitialSheet(sheet) {
    sheet.appendRow(["Email", "Name", "Mobile", "Twitter", "Tags", "Comments", "Added At"])

}

function sendNotification(text, type) {
    return CardService.newActionResponseBuilder()
        .setNotification(CardService.newNotification()
            .setType(type)
            .setText(text))
        .build();
}
function getThread(threadId) {
    return GmailApp.getThreadById(threadId);
}

function parseItem(sheetItem) {
  if(!sheetItem)
      return;
  var item = sheetItem.item;
    return {
        email: item[0],
        name: item[1],
        mobile: item[2],
        twitter: item[3],
        //addedAt:item[7],
        //messagesCount:item[5],
        //status:item[6],
        item_array:item
    }
}

