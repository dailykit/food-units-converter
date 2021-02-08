# Food Units Converter

This library provides a nice API to convert food related units. You can also
convert `Mass <-> volume`. For example, converting 10L to 10Kg is possible using
this library.

> The API is heavily inspired by [units-converter](https://github.com/nosferatoy/units-converter)

## Usage

```js
const { converter } = require("./dist/index");

console.log("100kg -> g", converter(100).from("kg").to("g").value);
console.log("100g -> kg", converter(100).from("g").to("kg").value);
console.log("100mg -> kg", converter(100).from("mg").to("kg").value);
console.log("100mg -> g", converter(256).from("mg").to("g").value);
console.log("100kg -> mg", converter(100).from("kg").to("mg").value);
```

The above code will print:

```
100kg -> g 100000
100g -> kg 0.1
100mg -> kg 0.0001
100mg -> g 0.256
100kg -> mg 100000000
```

## Todo

- [x] MVP (simple unit conversion with the API and configuration for `Mass <-> Volume` conversion).
- [x] implement bulk density (to convert `Mass <-> Volume`).
- [x] setup tests
- [x] add support for custom bulkDensity
- [ ] add support for creating custom definitions.


