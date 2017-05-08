'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = new _sqlite2.default.Database('database.db');


var check;

var dataBase = function () {
	function dataBase(database) {
		_classCallCheck(this, dataBase);

		this.database = database;
	}

	_createClass(dataBase, [{
		key: 'init',
		value: function init() {
			db.serialize(function () {
				db.run("CREATE TABLE if not exists audits (id INT NOT NULL AUTO_INCREMENT, user_id INT, date DATE, audit_type INT, core_command VARCHAR(20), PRIMARY KEY (id))");
				db.run("CREATE TABLE if not exists audit_args (id INT NOT NULL AUTO_INCREMENT, audit_id INT, arg VARCHAR(255), PRIMARY KEY (id))");
				db.run("CREATE TABLE if not exists message_log (id INT NOT NULL AUTO_INCREMENT, user_id INT, message_content VARCHAR(2000), PRIMARY KEY (id))");
				db.run("CREATE TABLE if not exists msg_count (id INT NOT NULL AUTO_INCREMENT, user_id INT, msg_count INT), PRIMARY KEY (id)");
			});
		}
	}, {
		key: 'newAudit',
		value: function newAudit(userId, date, autiType, coreCommand, argumentList) {
			db.serialize(function () {
				db.run("INSERT INTO audits (user_id, date, audit_type, core_command) VALUES (?)", userId, date, auditType, coreCommand);
				var lastLogID = db.get("SELECT Max(id) AS last_id FROM audits", function (err, row) {
					if (err) {
						console.log(err);
					}
					return row.last_id;
				});
				argumentList.forEach(function (key) {
					db.run("INSERT INTO audit_args (audit_id, arg) VALUES (?)", lastLogID, argumentList[key]);
				});
			});
		}
	}, {
		key: 'getAuditByID',
		value: function getAuditByID(auditId) {
			db.serialize(function () {
				var auditObj = {};
				db.get("SELECT ");
			});
		}
	}, {
		key: 'logMessage',
		value: function logMessage(userId, messageContent) {
			db.serialize(function () {
				db.run("INSERT INTO message_log (user_id, message_content) VALUES (?)", userId, messageContent);
				var newMessageCount = db.get("SELECT COUNT(*) AS count FROM message_log WHERE user_id = (?)", userId, function (err, row) {
					if (err) {
						console.log(err);
					}

					return row.count;
				});
				db.run("UPDATE msg_count SET msg_count = (?) WHERE user_id = (?)", newMessageCount, userId);
			});
		}
	}]);

	return dataBase;
}();