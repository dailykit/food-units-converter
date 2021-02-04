const { converter } = require("../dist/index");

describe("convert Mass <-> Mass", () => {
  it("convert 100Kg to grams", () => {
    expect(converter(100).from("kg").to("g").value).toEqual(100000);
  });

  it("convert 100g to kg", () => {
    expect(converter(100).from("g").to("kg").value).toEqual(0.1);
  });

  it("convert 100mg to kg", () => {
    expect(converter(100).from("mg").to("kg").value).toEqual(0.0001);
  });

  it("convert 100mg to grams", () => {
    expect(converter(100).from("mg").to("g").value).toEqual(0.1);
  });

  it("convert 100Kg to mg", () => {
    expect(converter(100).from("kg").to("mg").value).toEqual(100000000);
  });
});

describe("convert volume <-> volume", () => {
  it("convert 100l to ml", () => {
    expect(converter(100).from("l").to("ml").value).toEqual(100000);
  });

  it("covert 100ml to l", () => {
    expect(converter(100).from("ml").to("l").value).toEqual(0.1);
  });
});
