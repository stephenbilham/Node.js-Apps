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
		console.log(chalk.green("New note added!"));
	} else {
		console.log(chalk.blue("Duplicate Note!"));
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
		console.log(chalk.red("Note Deleted!"));
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

module.exports = {
	getNotes,
	addNote,
	deleteNote,
};
