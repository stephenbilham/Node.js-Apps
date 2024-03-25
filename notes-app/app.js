const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// customize yarg versions
yargs.version("1.1.0");

// create add command
yargs.command({
	command: "add",
	describe: "add a new note",
	builder: {
		title: { describe: "note title" },
		demandOption: true,
		type: "string",
		body: {
			describe: "this is the body text",
			demandOption: true,
			type: "string",
		},
	},
	handler: (argv) => {
		notes.addNote(argv.title, argv.body);
	},
});

// create remove command
yargs.command({
	command: "remove",
	describe: "removing a note",
	handler: () => {
		console.log("removing a note!");
	},
});

// create list command
yargs.command({
	command: "list",
	describe: "listing out all note",
	handler: () => {
		console.log("List the notes!");
	},
});

// create read command
yargs.command({
	command: "read",
	describe: "reading a note",
	handler: () => {
		console.log("reading a note!");
	},
});

yargs.parse();
console.log(yargs.argv);
