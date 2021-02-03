const { converter } = require("./dist/index");

console.log("100kg -> g"  , converter(100).from("kg").to("g").value);
console.log("100g -> kg"  , converter(100).from("g").to("kg").value);
console.log("100mg -> kg" , converter(100).from("mg").to("kg").value);
console.log("100mg -> g"  , converter(256).from("mg").to("g").value);
console.log("100kg -> mg" , converter(100).from("kg").to("mg").value);
