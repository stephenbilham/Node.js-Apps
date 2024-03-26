const fs = require("fs");

// const book = {
// 	title: "Ego is the Enemy",
// 	author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);

// const dataJSON = fs.readFileSync("1-json.json");
// const data = JSON.parse(dataJSON);

// console.log(data.title);

const dataJSON = fs.readFileSync("1-json.json");

let data = JSON.parse(dataJSON);
data = { ...data, name: "Stephen", age: "30" };
console.log(data);

fs.writeFileSync("1-json.json", JSON.stringify(data));
