'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jslint node: true, esversion:6 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db', function () {
	console.log('database opened successfully!');
});

var Database = function () {
	function Database() {
		_classCallCheck(this, Database);
	}

	_createClass(Database, [{
		key: 'init',
		value: function init() {
			db.serialize(function () {
				try {
					db.run("CREATE TABLE if not exists audits (id INT, user_id INT, date DATE, audit_type INT, core_command VARCHAR(20), CONSTRAINT auditConstraint PRIMARY KEY (id))");
					db.run("CREATE TABLE if not exists audit_args (audit_id INT, arg VARCHAR(255), CONSTRAINT auditArgsConstraint PRIMARY KEY (audit_id))");
					db.run("CREATE TABLE if not exists message_log (id INT, msg_id INT, user_id INT, message_content VARCHAR(2000), CONSTRAINT msgLogConstraint PRIMARY KEY (id))");
					db.run("CREATE TABLE if not exists msg_count (id INT, user_id INT, msg_count INT, CONSTRAINT msgCountConstraint PRIMARY KEY (id))");
				} catch (err) {
					console.log(err);
				}
			});
		}
	}, {
		key: 'wipe',
		value: function wipe(table) {
			db.serialize(function () {
				var query = "DROP TABLE main." + table;
				db.run(query, function (err) {
					if (err) {
						console.log(err);
					}
				});
			});
		}
	}, {
		key: 'clean',
		value: function clean(table) {
			db.serialize(function () {
				var query = "DELETE FROM " + table;
				db.run(query, function (err) {
					if (err) {
						console.log(err);
					}
				});
			});
		}
	}, {
		key: 'getMessage',
		value: function getMessage(msgId) {
			db.serialize(function () {
				var msg = db.get("SELECT user_id, msg_content FROM message_log WHERE msg_id = $msgId", {
					$msgId: msgId
				}, function (err, row) {
					if (err) {
						console.log(err);
					}
				});
				return msg;
			});
		}
	}, {
		key: 'getLastMessage',
		value: function getLastMessage() {
			db.serialize(function () {
				var msg = db.get("SELECT user_id AS userId, msg_content AS msgContent FROM message_log WHERE id = (SELECT * FROM message_log ORDER BY column DESC LIMIT 1)", function (err) {
					if (err, row) {
						consol.log(err);
					}
				});
				return msg;
			});
		}
	}, {
		key: 'newAudit',
		value: function newAudit(userId, date, auditType, coreCommand, argumentList) {
			db.serialize(function () {
				db.run("INSERT INTO audits (user_id, date, audit_type, core_command) VALUES ($userId, $date, $auditType, $coreCommand)", {
					$userId: userId,
					$date: date,
					$auditType: auditType,
					$coreCommand: coreCommand
				}, function (err) {
					if (err) {
						console.log(err);
					}
				});
				argumentList.forEach(function (key) {
					db.run("INSERT INTO audit_args (audit_id, arg) VALUES ((SELECT * FROM audits ORDER BY column DESC LIMIT 1), $arg)", {
						$arg: argumentList[key]
					}, function (err) {
						if (err) {
							console.log(err);
						}
					});
				});
			});
		}
	}, {
		key: 'getAuditByID',
		value: function getAuditByID(auditId) {
			db.serialize(function () {
				var auditObj = {};
				var audit = db.get("SELECT id, user_id AS userId, date, audit_type AS auditType, core_command AS coreCommand FROM audits WHERE id = $auditId", {
					$auditId: auditId
				}, function (err, row) {
					if (err) {
						console.log(err);
					}
				});
				var auditArgs = [];
				db.each("SELECT arg FROM audit_args WHERE audit_id = $auditId", { $auditId: auditId }, function (err, row) {
					if (err) {
						console.log(err);
					}
					auditArgs.push(row.arg);
				});
				auditObj = {
					auditId: audit.id,
					userId: audit.userId,
					date: audit.date,
					auditType: audit.auditType,
					coreCommand: audit.coreCommand,
					args: auditArgs
				};
				return auditObj;
			});
		}
	}, {
		key: 'logMessage',
		value: function logMessage(msgId, userId, messageContent) {
			db.serialize(function () {
				console.log('preliminary test: ' + userId + ': ' + messageContent);
				db.run("INSERT INTO message_log (msg_id, user_id, message_content) VALUES ($msgId, $userId, $messageContent)", {
					$msgId: msgId,
					$userId: userId,
					$messageContent: messageContent
				}, function (err) {
					if (err) {
						console.log('insert message');
						console.log(err);
					}
				});
				var msgCount;
				db.get("SELECT COUNT(*) AS count FROM message_log WHERE user_id = $userId", {
					$userId: userId
				}, function (err, row) {
					if (err) {
						console.log('message count');
						console.log(err);
					}
					msgCount = row.count;
					console.log("1: " + row.count);
					return row.count;
				});
				db.run("UPDATE msg_count SET msg_count = $msgCount WHERE user_id = $userId", {
					$msgCount: msgCount,
					$userId: userId
				}, function (err) {
					if (err) {
						console.log('update msg count');
						console.log(err);
					}
				});
			});
		}
	}, {
		key: 'getMessageCount',
		value: function getMessageCount(userId, callback) {
			db.serialize(function () {
				var msgCount;
				db.get("SELECT COUNT(*) AS count FROM message_log WHERE user_id = $userId", {
					$userId: userId
				}, function (err, row) {
					if (err) {
						console.log(err);
					}
					msgCount = row.count;
					console.log('message count2: ' + msgCount);
					callback(msgCount);
					return row.count;
				});
				return msgCount;
				console.log('message count: ' + msgCount);
			});
		}
	}]);

	return Database;
}();

exports.default = Database;