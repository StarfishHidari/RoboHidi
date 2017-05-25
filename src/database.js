/*jslint node: true, esversion:6 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db', () => {
	console.log('database opened successfully!');
});
import path from 'path';
import Promise from 'bluebird';

class Database {
	init() {
		db.serialize(() => {
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

	wipe(table) {
		db.serialize(() => {
			var query = "DROP TABLE main." + table;
			db.run(query, (err) => {
				if(err) {
					console.log(err);
				}
			});
		});
	}

	clean(table) {
		db.serialize(() => {
			var query = "DELETE FROM " + table;
			db.run(query, (err) => {
				if(err) {
					console.log(err);
				}
			});
		});
	}

	getMessage(msgId) {
		db.serialize(() => {
			var msg = db.get("SELECT user_id, msg_content FROM message_log WHERE msg_id = $msgId", {
				$msgId: msgId
			}, (err, row) => {
				if(err) {
					console.log(err);
				}
			});
			return msg;
		});
	}

	getLastMessage() {
		db.serialize(() => {
			var msg = db.get("SELECT user_id AS userId, msg_content AS msgContent FROM message_log WHERE id = (SELECT * FROM message_log ORDER BY column DESC LIMIT 1)", (err) => {
				if (err, row) {
					consol.log(err);
				}
			});
			return msg;
		});
	}

	newAudit(userId, date, auditType, coreCommand, argumentList) {
		db.serialize(() => {
			db.run("INSERT INTO audits (user_id, date, audit_type, core_command) VALUES ($userId, $date, $auditType, $coreCommand)", {
				$userId: userId,
				$date: date,
				$auditType: auditType,
				$coreCommand: coreCommand
			}, (err) => {
				if(err) {
					console.log(err);
				}
			});
			argumentList.forEach((key) => {
				db.run("INSERT INTO audit_args (audit_id, arg) VALUES ((SELECT * FROM audits ORDER BY column DESC LIMIT 1), $arg)", {
					$arg: argumentList[key]
				}, (err) => {
					if(err) {
						console.log(err);
					}
				});
			});
		});
	}

	getAuditByID(auditId) {
		db.serialize(() => {
			var auditObj = {};
			var audit = db.get("SELECT id, user_id AS userId, date, audit_type AS auditType, core_command AS coreCommand FROM audits WHERE id = $auditId", {
				$auditId: auditId
			}, (err, row) => {
				if(err) {
					console.log(err);
				}
			});
			var auditArgs = [];
			db.each("SELECT arg FROM audit_args WHERE audit_id = $auditId", { $auditId: auditId }, (err, row) => {
				if(err) {
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

	logMessage(msgId, userId, messageContent) {
		db.serialize(() => {
			console.log('preliminary test: ' + userId + ': ' + messageContent);
			db.run("INSERT INTO message_log (msg_id, user_id, message_content) VALUES ($msgId, $userId, $messageContent)", {
				$msgId: msgId,
				$userId: userId,
				$messageContent: messageContent
			}, (err) => {
				if(err) {
					console.log('insert message');
					console.log(err);
				}
			});
			var msgCount;
			db.get("SELECT COUNT(*) AS count FROM message_log WHERE user_id = $userId", {
				$userId: userId
			}, (err, row) => {
				if(err) {
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
			}, (err) => {
				if(err) {
					console.log('update msg count');
					console.log(err);
				}
			});
		});
	}

	getMessageCount(userId, callback) {
		db.serialize(() => {
			var msgCount;
			db.get("SELECT COUNT(*) AS count FROM message_log WHERE user_id = $userId", {
				$userId: userId
			}, (err, row) => {
				if(err) {
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
}

export default Database;