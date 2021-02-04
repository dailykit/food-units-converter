/*
 * API:
 *
 * for standard units (kg -> g, mg -> g):
 * value(val: number).from(unit: Unit).to(unit: Unit)
 *
 * for volume to mass units:
 * value(val: number).from(unit: Unit).to(unit: Unit)
 *
 * Some Formulae:
 * density = mass / volume
 * volume = mass / density
 * mass = density * volume
 * weight = mass * g (g = 9.8 or 10)
 *
 */

type UnitString = "g" | "mg" | "kg" | "ounce";

type UnitObject = {
  name: {
    abbr: UnitString;
    singular: string;
    plural: string;
  };
  base: UnitString;
  factor: number;
  bulkDensity?: number;
};

type ConvertedUnit = UnitObject & {
  value: number;
};

type Definition = Record<UnitString, UnitObject>;

const definition: Definition = {
  kg: {
    name: {
      abbr: "kg",
      singular: "Kilogram",
      plural: "Kilograms",
    },
    base: "g",
    factor: 1000,
  },
  g: {
    name: {
      abbr: "g",
      singular: "Gram",
      plural: "Grams",
    },
    base: "g",
    factor: 1,
  },
  mg: {
    name: {
      abbr: "mg",
      singular: "Miligram",
      plural: "MiliGrams",
    },
    base: "g",
    factor: 1 / 1000,
  },
  ounce: {
    name: {
      abbr: "ounce",
      singular: "Ounce",
      plural: "Ounces",
    },
    base: "g",
    factor: 28.3495,
  },
};

const throwInvalidUseError = (msg: string) => {
  throw new Error(`Invalid Use: ${msg}`);
};

const throwUnsupportedUnitError = () => {
  throw new Error(`Invalid Unit: the unit type provided was invalid.`);
};

class Converter {
  value: number;
  definition: Definition;
  toUnit: ConvertedUnit | null;
  fromUnit: UnitObject | null;

  constructor(value: number, definition: Definition) {
    this.value = value;
    this.definition = definition;
  }

  to(unit: UnitString): ConvertedUnit | null {
    if (!this.fromUnit) {
      throwInvalidUseError("you need to call from() before calling to()");
      return null;
    }

    const to = this.getUnit(unit);

    if (!to) {
      throwUnsupportedUnitError();
      return null;
    }

    if (to.base !== this.fromUnit.base) {
      throwInvalidUseError(
        "base unit of from and to must be same. Please check your definitions"
      );
      return null;
    }

    return {
      ...to,
      // convert this.value to base unit then divide it by to.factor
      value: (this.value * this.fromUnit.factor) / to.factor,
    };
  }

  from(unit: UnitString) {
    if (this.toUnit)
      throwInvalidUseError("cannot call from() after calling to().");

    this.fromUnit = this.getUnit(unit);
    if (!this.fromUnit) throwUnsupportedUnitError();

    return this;
  }

  getUnit(unit: UnitString): UnitObject | null {
    return this.definition[unit];
  }
}

export const converter = (val: number) => {
  return new Converter(val, definition);
};
