const fs = require("fs");

// const book = {
// 	title: "Ego is the Enemy",
// 	author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJSON);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);

// console.log(data.title);

const dataObj = fs.readFileSync("1-json.json");
const dataJSON = dataObj.toString();

let data = JSON.parse(dataJSON);
data = { ...data, name: "Stephen", age: "30" };
console.log(data);

fs.writeFileSync("1-json.json", JSON.stringify(data));
