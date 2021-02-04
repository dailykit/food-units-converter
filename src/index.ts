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
 * volume * factor * bulkDensity -> mass (in grams)
 *
 */

type UnitString = "g" | "mg" | "kg" | "oz" | "l" | "ml";

type UnitObject = {
  name: {
    abbr: UnitString;
    singular: string;
    plural: string;
  };
  base: UnitString;
  factor: number;
  bulkDensity?: number /* only required in volumes */;
  baseMass?: UnitString /* only required in volumes */;
};

type ConvertedUnit = UnitObject & {
  value: number;
};

type Definition = Record<string, UnitObject>;

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
  oz: {
    name: {
      abbr: "oz",
      singular: "Ounce",
      plural: "Ounces",
    },
    base: "g",
    factor: 28.3495,
  },
  l: {
    name: {
      abbr: "l",
      singular: "Litre",
      plural: "Litres",
    },
    base: "ml",
    factor: 1000,
    bulkDensity: 1,
    baseMass: "g",
  },
  ml: {
    name: {
      abbr: "ml",
      singular: "Millilitre",
      plural: "Millilitres",
    },
    base: "ml",
    factor: 1,
    bulkDensity: 1,
    baseMass: "g",
  },
};

/**
 * Throws Invalid Use Error with a custom message.
 *
 * @param {string} message the message to pass in the Error constructor
 */
const throwInvalidUseError = (msg: string) => {
  throw new Error(`Invalid Use: ${msg}`);
};

/**
 * Throws Unsupported Error with a custom message.
 *
 * @param {string} unit
 */
const throwUnsupportedUnitError = (unit: string) => {
  throw new Error(`Invalid Unit: ${unit} is unsupported.`);
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
      throwUnsupportedUnitError(unit);
      return null;
    }

    if (to.bulkDensity) {
      // convert value in mass to volume base
      if (!this.fromUnit.bulkDensity) {
        this.value = this.value * to.bulkDensity;
      }
    } else {
      // convert value in volume to mass base
      if (this.fromUnit.bulkDensity) {
        this.value = this.fromUnit.bulkDensity * this.value;
      }
    }

    // case to and from are same types (mass <-> mass or volume <-> volume)
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
    if (!this.fromUnit) throwUnsupportedUnitError(unit);

    return this;
  }

  getUnit(unit: UnitString): UnitObject | null {
    return this.definition[unit];
  }
}

export const converter = (val: number) => {
  return new Converter(val, definition);
};
