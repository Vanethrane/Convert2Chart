export const units = {

  length: {
    name: "Length",
    units: {
      millimeter: { name: "Millimeters", symbol: "mm", factor: 0.001 },
      centimeter: { name: "Centimeters", symbol: "cm", factor: 0.01 },
      meter: { name: "Meters", symbol: "m", factor: 1 },
      kilometer: { name: "Kilometers", symbol: "km", factor: 1000 },
      inch: { name: "Inches", symbol: "in", factor: 0.0254 },
      foot: { name: "Feet", symbol: "ft", factor: 0.3048 },
      yard: { name: "Yards", symbol: "yd", factor: 0.9144 },
      mile: { name: "Miles", symbol: "mi", factor: 1609.344 }
    }
  },

  weight: {
    name: "Weight",
    units: {
      milligram: { name: "Milligrams", symbol: "mg", factor: 0.000001 },
      gram: { name: "Grams", symbol: "g", factor: 0.001 },
      kilogram: { name: "Kilograms", symbol: "kg", factor: 1 },
      ounce: { name: "Ounces", symbol: "oz", factor: 0.028349523125 },
      pound: { name: "Pounds", symbol: "lb", factor: 0.45359237 },
      stone: { name: "Stone", symbol: "st", factor: 6.35029318 },
      ton: { name: "US Tons", symbol: "ton", factor: 907.18474 }
    }
  },

  volume: {
    name: "Volume",
    units: {
      milliliter: { name: "Milliliters", symbol: "mL", factor: 0.001 },
      liter: { name: "Liters", symbol: "L", factor: 1 },
      teaspoon: { name: "Teaspoons", symbol: "tsp", factor: 0.00492892159 },
      tablespoon: { name: "Tablespoons", symbol: "tbsp", factor: 0.0147867648 },
      cup: { name: "US Cups", symbol: "cup", factor: 0.2365882365 },
      pint: { name: "US Pints", symbol: "pt", factor: 0.473176473 },
      quart: { name: "US Quarts", symbol: "qt", factor: 0.946352946 },
      gallon: { name: "US Gallons", symbol: "gal", factor: 3.785411784 }
    }
  },

  area: {
    name: "Area",
    units: {
      squareMillimeter: { name: "Square Millimeters", symbol: "mm²", factor: 0.000001 },
      squareCentimeter: { name: "Square Centimeters", symbol: "cm²", factor: 0.0001 },
      squareMeter: { name: "Square Meters", symbol: "m²", factor: 1 },
      squareKilometer: { name: "Square Kilometers", symbol: "km²", factor: 1000000 },
      squareInch: { name: "Square Inches", symbol: "in²", factor: 0.00064516 },
      squareFoot: { name: "Square Feet", symbol: "ft²", factor: 0.09290304 },
      squareYard: { name: "Square Yards", symbol: "yd²", factor: 0.83612736 },
      acre: { name: "Acres", symbol: "acre", factor: 4046.8564224 },
      hectare: { name: "Hectares", symbol: "ha", factor: 10000 }
    }
  },

  speed: {
    name: "Speed",
    units: {
      metersPerSecond: { name: "Meters per Second", symbol: "m/s", factor: 1 },
      kilometersPerHour: { name: "Kilometers per Hour", symbol: "km/h", factor: 0.2777777778 },
      milesPerHour: { name: "Miles per Hour", symbol: "mph", factor: 0.44704 },
      footPerSecond: { name: "Feet per Second", symbol: "ft/s", factor: 0.3048 },
      knot: { name: "Knots", symbol: "kn", factor: 0.5144444444 }
    }
  },

  pressure: {
    name: "Pressure",
    units: {
      pascal: { name: "Pascals", symbol: "Pa", factor: 1 },
      kilopascal: { name: "Kilopascals", symbol: "kPa", factor: 1000 },
      bar: { name: "Bar", symbol: "bar", factor: 100000 },
      psi: { name: "Pounds per Square Inch", symbol: "psi", factor: 6894.757293 },
      atmosphere: { name: "Atmospheres", symbol: "atm", factor: 101325 }
    }
  },

  energy: {
    name: "Energy",
    units: {
      joule: { name: "Joules", symbol: "J", factor: 1 },
      kilojoule: { name: "Kilojoules", symbol: "kJ", factor: 1000 },
      calorie: { name: "Calories", symbol: "cal", factor: 4.184 },
      kilocalorie: { name: "Kilocalories", symbol: "kcal", factor: 4184 },
      wattHour: { name: "Watt-hours", symbol: "Wh", factor: 3600 },
      kilowattHour: { name: "Kilowatt-hours", symbol: "kWh", factor: 3600000 }
    }
  },

  power: {
    name: "Power",
    units: {
      watt: { name: "Watts", symbol: "W", factor: 1 },
      kilowatt: { name: "Kilowatts", symbol: "kW", factor: 1000 },
      horsepower: { name: "Horsepower", symbol: "hp", factor: 745.699872 }
    }
  },

  time: {
    name: "Time",
    units: {
      millisecond: { name: "Milliseconds", symbol: "ms", factor: 0.001 },
      second: { name: "Seconds", symbol: "s", factor: 1 },
      minute: { name: "Minutes", symbol: "min", factor: 60 },
      hour: { name: "Hours", symbol: "h", factor: 3600 },
      day: { name: "Days", symbol: "d", factor: 86400 },
      week: { name: "Weeks", symbol: "wk", factor: 604800 }
    }
  },

  data: {
    name: "Data",
    units: {
      byte: { name: "Bytes", symbol: "B", toBase: 1 },
      kilobyte: { name: "Kilobytes", symbol: "KB", toBase: 1024 },
      megabyte: { name: "Megabytes", symbol: "MB", toBase: 1048576 },
      gigabyte: { name: "Gigabytes", symbol: "GB", toBase: 1073741824 },
      terabyte: { name: "Terabytes", symbol: "TB", toBase: 1099511627776 }
    }
  },

  frequency: {
    name: "Frequency",
    units: {
      hertz: { name: "Hertz", symbol: "Hz", toBase: 1 },
      kilohertz: { name: "Kilohertz", symbol: "kHz", toBase: 1000 },
      megahertz: { name: "Megahertz", symbol: "MHz", toBase: 1000000 },
      gigahertz: { name: "Gigahertz", symbol: "GHz", toBase: 1000000000 }
    }
  },

  angle: {
    name: "Angle",
    units: {
      degree: { name: "Degrees", symbol: "°", toBase: Math.PI / 180 },
      radian: { name: "Radians", symbol: "rad", toBase: 1 },
      gradian: { name: "Gradians", symbol: "gon", toBase: Math.PI / 200 }
    }
  },

  force: {
    name: "Force",
    units: {
      newton: { name: "Newtons", symbol: "N", toBase: 1 },
      kilonewton: { name: "Kilonewtons", symbol: "kN", toBase: 1000 },
      poundForce: { name: "Pounds-force", symbol: "lbf", toBase: 4.4482216152605 }
    }
  },

  torque: {
    name: "Torque",
    units: {
      newtonMeter: { name: "Newton-meters", symbol: "N·m", toBase: 1 },
      poundFoot: { name: "Pound-feet", symbol: "lb-ft", toBase: 1.3558179483314 },
      poundInch: { name: "Pound-inches", symbol: "lb-in", toBase: 0.1129848290278 }
    }
  },

  fuelEconomy: {
    name: "Fuel Economy",
    units: {
      mpg: { name: "Miles per Gallon", symbol: "MPG", toBase: 1 },
      litersPer100Km: { name: "Liters per 100 km", symbol: "L/100 km", toBase: 1 },
      kilometersPerLiter: { name: "Kilometers per Liter", symbol: "km/L", toBase: 1 }
    }
  },

  density: {
    name: "Density",
    units: {
      kilogramPerCubicMeter: { name: "Kilograms per Cubic Meter", symbol: "kg/m³", toBase: 1 },
      gramPerCubicCentimeter: { name: "Grams per Cubic Centimeter", symbol: "g/cm³", toBase: 1000 },
      poundPerCubicFoot: { name: "Pounds per Cubic Foot", symbol: "lb/ft³", toBase: 16.01846337396 }
    }
  },

  cooking: {
    name: "Cooking",
    units: {
      teaspoon: { name: "Teaspoons", symbol: "tsp", toBase: 1 },
      tablespoon: { name: "Tablespoons", symbol: "tbsp", toBase: 3 },
      cup: { name: "Cups", symbol: "cup", toBase: 48 },
      fluidOunce: { name: "Fluid Ounces", symbol: "fl oz", toBase: 6 },
      pint: { name: "Pints", symbol: "pt", toBase: 96 },
      quart: { name: "Quarts", symbol: "qt", toBase: 192 },
      gallon: { name: "Gallons", symbol: "gal", toBase: 768 }
    }
  }

};

export const temperatureUnits = {
  celsius: {
    name: "Celsius",
    symbol: "C"
  },
  fahrenheit: {
    name: "Fahrenheit",
    symbol: "F"
  },
  kelvin: {
    name: "Kelvin",
    symbol: "K"
  }
};

export function convertTemperature(value, from, to) {
  let celsius;

  if (from === "celsius") {
    celsius = value;
  } else if (from === "fahrenheit") {
    celsius = (value - 32) * 5 / 9;
  } else if (from === "kelvin") {
    celsius = value - 273.15;
  } else {
    throw new Error(`Unknown temperature unit: ${from}`);
  }

  if (to === "celsius") {
    return celsius;
  }

  if (to === "fahrenheit") {
    return celsius * 9 / 5 + 32;
  }

  if (to === "kelvin") {
    return celsius + 273.15;
  }

  throw new Error(`Unknown temperature unit: ${to}`);
}

export function convertUnit(value, from, to, category) {

  if (category === "temperature") {
    return convertTemperature(value, from, to);
  }

  if (category === "fuelEconomy") {

    if (from === to) {
      return value;
    }

    let kmPerLiter;

    if (from === "mpg") {
      kmPerLiter = value * 0.4251437075;
    }
    else if (from === "litersPer100Km") {
      if (value === 0) return Infinity;
      kmPerLiter = 100 / value;
    }
    else if (from === "kilometersPerLiter") {
      kmPerLiter = value;
    }
    else {
      throw new Error(`Unknown fuel economy unit: ${from}`);
    }

    if (to === "mpg") {
      return kmPerLiter / 0.4251437075;
    }

    if (to === "litersPer100Km") {
      if (kmPerLiter === 0) return Infinity;
      return 100 / kmPerLiter;
    }

    if (to === "kilometersPerLiter") {
      return kmPerLiter;
    }

    throw new Error(`Unknown fuel economy unit: ${to}`);
  }

  const categoryData = units[category];

  if (!categoryData) {
    throw new Error(`Unknown category: ${category}`);
  }

  const fromUnit = categoryData.units[from];
  const toUnit = categoryData.units[to];

  if (!fromUnit || !toUnit) {
    throw new Error("Unknown unit");
  }

  if (from === to) {
    return value;
  }

  const fromFactor = fromUnit.factor ?? fromUnit.toBase;
  const toFactor = toUnit.factor ?? toUnit.toBase;

  if (
    typeof fromFactor !== "number" ||
    typeof toFactor !== "number"
  ) {
    throw new Error(
      `Invalid conversion factors for ${from} -> ${to}`
    );
  }

  return value * fromFactor / toFactor;
}
