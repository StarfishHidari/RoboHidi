import sqlite3 from 'sqlite3';
var db = new sqlite3.Database('database.db');
import path from 'path';
import Promise from 'bluebird';

var check;

class dataBase {
	constructor(database) {
		this.database = database;
	}

	init() {
		db.serialize(() => {
			db.run("CREATE TABLE if not exists audits (id INT NOT NULL AUTO_INCREMENT, user_id INT, date DATE, audit_type INT, core_command VARCHAR(20), PRIMARY KEY (id))");
			db.run("CREATE TABLE if not exists audit_args (id INT NOT NULL AUTO_INCREMENT, audit_id INT, arg VARCHAR(255), PRIMARY KEY (id))");
			db.run("CREATE TABLE if not exists message_log (id INT NOT NULL AUTO_INCREMENT, user_id INT, message_content VARCHAR(2000), PRIMARY KEY (id))");
			db.run("CREATE TABLE if not exists msg_count (id INT NOT NULL AUTO_INCREMENT, user_id INT, msg_count INT), PRIMARY KEY (id)");
		})
	}

	newAudit(userId, date, autiType, coreCommand, argumentList) {
		db.serialize(() => {
			db.run("INSERT INTO audits (user_id, date, audit_type, core_command) VALUES (?)", userId, date, auditType, coreCommand);
			var lastLogID = db.get("SELECT Max(id) AS last_id FROM audits", (err, row) => {
				if(err) {
					console.log(err);
				}
				return row.last_id;
			})
			argumentList.forEach((key) => {
				db.run("INSERT INTO audit_args (audit_id, arg) VALUES (?)", lastLogID, argumentList[key]);
			})
		})
	}

	getAuditByID(auditId) {
		db.serialize(() => {
			var auditObj = {};
			db.get("SELECT ")
		})
	}

	logMessage(userId, messageContent) {
		db.serialize(() => {
			db.run("INSERT INTO message_log (user_id, message_content) VALUES (?)", userId, messageContent);
			var newMessageCount = db.get("SELECT COUNT(*) AS count FROM message_log WHERE user_id = (?)", userId, (err, row) => {
				if(err) {
					console.log(err);
				}

				return row.count;
			})
			db.run("UPDATE msg_count SET msg_count = (?) WHERE user_id = (?)", newMessageCount, userId);
		})
	}
}