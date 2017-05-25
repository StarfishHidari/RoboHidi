import fs from 'fs';
import path from 'path';
class commandManager {
	constructor(props) {
		this.directory = props.directory || './commands';
		this.commands = [];
	}
	importCommands() {
		fs.readdir (this.directory, (err, files) => {
			if(err) {
				console.error("could not list directory. ", err);
				process.exit(1);
			}
			files.forEach((file, index) => {
				var filePath = path.join(this.directory, file);
				fs.stat(filePath, (err, stat) => {
					if (err) {
						console.error("Error stating file. ", err);
						return;
					}
					if(stat.isFile()) {
						var newCommand = require(filePath);
						this.commands.push(newCommand);
						console.log(this.commands);
					}
				})
			})
		})
	}
	handleMessage(message) {

	}
}