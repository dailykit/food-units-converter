const { converter } = require("../dist/index");

describe("Mass -> Volume", () => {
  it("l to kg", () => {
    expect(converter(100).from("l").to("kg").value).toEqual(100);
    expect(converter(390).from("l").to("kg").value).toEqual(390);
    expect(converter(4).from("l").to("kg").value).toEqual(4);
    expect(converter(38).from("l").to("kg").value).toEqual(38);
  });

  it("l to g", () => {
    expect(converter(980).from("l").to("g").value).toEqual(980000);
    expect(converter(450).from("l").to("g").value).toEqual(450000);
    expect(converter(965).from("l").to("g").value).toEqual(965000);
    expect(converter(898).from("l").to("g").value).toEqual(898000);
  });

  it("kg to l", () => {
    expect(converter(87).from("kg").to("l").value).toEqual(87);
    expect(converter(96).from("kg").to("l").value).toEqual(96);
    expect(converter(196).from("kg").to("l").value).toEqual(196);
    expect(converter(737).from("kg").to("l").value).toEqual(737);
  });

  it("kg to ml", () => {
    expect(converter(999).from("kg").to("ml").value).toEqual(999000);
    expect(converter(777).from("kg").to("ml").value).toEqual(777000);
    expect(converter(656).from("kg").to("ml").value).toEqual(656000);
    expect(converter(34291).from("kg").to("ml").value).toEqual(34291000);
  });

  it("ml to kg", () => {
    expect(converter(1002).from("ml").to("kg").value).toEqual(1.002);
    expect(converter(892).from("ml").to("kg").value).toEqual(0.892);
    expect(converter(324).from("ml").to("kg").value).toEqual(0.324);
    expect(converter(2312).from("ml").to("kg").value).toEqual(2.312);
  });

  it("g to l", () => {
    expect(converter(3242).from("g").to("l").value).toEqual(3.242);
    expect(converter(2348).from("g").to("l").value).toEqual(2.348);
    expect(converter(2394).from("g").to("l").value).toEqual(2.394);
    expect(converter(2349).from("g").to("l").value).toEqual(2.349);
  });
});
