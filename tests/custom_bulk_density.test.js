const { converter } = require("../dist/index");

const ACCURACY = 1 / 1000;
const percentError = (expected, actual) => {
  return Math.abs((expected - actual) / actual);
};

describe("Custom Bulk Density", () => {
  it("work with custom bulk density 1", () => {
    expect(
      converter(100).from({ unit: "l", bulkDensity: 1 }).to("kg").value
    ).toEqual(100);

    expect(
      converter(87).from("kg").to({ unit: "l", bulkDensity: 1 }).value
    ).toEqual(87);
  });

  it("work with custom bulk density 0.89", () => {
    expect(
      percentError(
        3.56,
        converter(4).from({ unit: "l", bulkDensity: 0.89 }).to("kg").value
      )
    ).toBeLessThanOrEqual(ACCURACY);

    expect(
      percentError(
        77.43,
        converter(87).from("kg").to({ unit: "l", bulkDensity: 0.89 }).value
      )
    ).toBeLessThanOrEqual(ACCURACY);
  });
});
