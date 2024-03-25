const fs = require("fs");

const getNotes = () => {
	console.log("... GET notes");
};

const addNote = (title, body) => {
	console.log(title, body);
	const notes = loadNotes();

	notes.push({ title, body });
	saveNotes(notes);
};

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync("notes.json");
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (err) {
		return [];
	}
};

module.exports = {
	getNotes,
	addNote,
};
