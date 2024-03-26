const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
	console.log("... GET notes");
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicates = notes.filter((note) => {
		return note.body === body && note.title === title;
	});

	if (duplicates.length === 0) {
		notes.push({ title, body });
		console.log(chalk.green.inverse("New note added!"));
	} else {
		console.log(chalk.red.inverse("Duplicate Note!"));
	}
	saveNotes(notes);
};

const deleteNote = (title) => {
	const notes = loadNotes();
	const notesToKeep = notes.filter((el) => {
		return el.title !== title;
	});

	if (notesToKeep.length < notes.length) {
		saveNotes(notesToKeep);
		console.log(chalk.green.inverse("Note Deleted!"));
	} else {
		console.log(chalk.red.inverse("No note Found!"));
	}
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataJSON = fs.readFileSync("notes.json");
		return JSON.parse(dataJSON);
	} catch (err) {
		return [];
	}
};

const listNotes = () => {
	const notes = loadNotes();
	if (!notes) {
		console.log(chalk.red.inverse("No notes! Please add some."));
	} else {
		console.log(chalk.green.inverse("Your Notes:"));
		notes.map((note) => console.log(chalk.yellow(note.title)));
	}
};

const findNote = (title) => {
	const notes = loadNotes();

	console.log(title, notes);
	const searchedNote = notes.find((el) => title === el.title);
	console.log(searchedNote, "get here");

	if (!searchedNote) {
		console.log(chalk.red.inverse("No note found!"));
	} else {
		console.log(chalk.green.inverse("Note:"));
		console.log(chalk.yellow(`title: ` + searchedNote.title));
		console.log(chalk.yellow(`body: ` + searchedNote.body));
	}
};

module.exports = {
	getNotes,
	addNote,
	deleteNote,
	listNotes,
	findNote,
};
