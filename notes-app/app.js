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
		title: {
			describe: "note title",
			demandOption: true,
			type: "string",
		},
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
	builder: {
		title: {
			describe: "title of note",
			demandOption: true,
			type: "string",
		},
	},
	handler: (argv) => {
		notes.deleteNote(argv.title);
	},
});

// create list command
yargs.command({
	command: "list",
	describe: "listing out all notes",
	handler: () => {
		notes.listNotes();
	},
});

// create read command
yargs.command({
	command: "read",
	describe: "reading a note",
	handler: (argv) => {
		notes.findNote(argv.title);
	},
});

yargs.parse();
