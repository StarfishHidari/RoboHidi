class Command {
	constructor(props) {
		this.name = props.name || "Default Command";
		this.description = props.description || "Default description.";
		this.aliases = props.aliases || [];
		this.argsCount = props.argsCount || 'unlimited';
		this.details = props.details || 'Default long description.';
		this.examples = props.examples || '!command foo bar';
		this.group = props.group || "default";
	}
}