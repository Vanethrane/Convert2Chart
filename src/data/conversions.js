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
      gallon: { name: "US Gallons", symbol: "gal", factor: 3.785411784 },
      cubicMillimeter: { name: "Cubic Millimeters", symbol: "mm³", factor: 0.000000001 },
      cubicCentimeter: { name: "Cubic Centimeters", symbol: "cm³", factor: 0.000001 },
      cubicMeter: { name: "Cubic Meters", symbol: "m³", factor: 1000 },
      cubicInch: { name: "Cubic Inches", symbol: "in³", factor: 0.016387064 },
      cubicFoot: { name: "Cubic Feet", symbol: "ft³", factor: 28.316846592 },
      cubicYard: { name: "Cubic Yards", symbol: "yd³", factor: 764.554857984 },
      barrel: { name: "US Liquid Barrels", symbol: "bbl", factor: 119.240471196 }
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
      millipascal: { name: "Millipascals", symbol: "mPa", factor: 0.001 },
      pascal: { name: "Pascals", symbol: "Pa", factor: 1 },
      kilopascal: { name: "Kilopascals", symbol: "kPa", factor: 1000 },
      megapascal: { name: "Megapascals", symbol: "MPa", factor: 1000000 },
      gigapascal: { name: "Gigapascals", symbol: "GPa", factor: 1000000000 },
      millibar: { name: "Millibars", symbol: "mbar", factor: 100 },
      bar: { name: "Bar", symbol: "bar", factor: 100000 },
      psi: { name: "Pounds per Square Inch", symbol: "psi", factor: 6894.757293 },
      atmosphere: { name: "Atmospheres", symbol: "atm", factor: 101325 },
      torr: { name: "Torr", symbol: "Torr", factor: 133.322368421 }
    }
  },

  energy: {
    name: "Energy",
    units: {
      millijoule: { name: "Millijoules", symbol: "mJ", factor: 0.001 },
      joule: { name: "Joules", symbol: "J", factor: 1 },
      kilojoule: { name: "Kilojoules", symbol: "kJ", factor: 1000 },
      megajoule: { name: "Megajoules", symbol: "MJ", factor: 1000000 },
      gigajoule: { name: "Gigajoules", symbol: "GJ", factor: 1000000000 },
      calorie: { name: "Calories", symbol: "cal", factor: 4.184 },
      kilocalorie: { name: "Kilocalories", symbol: "kcal", factor: 4184 },
      wattHour: { name: "Watt-hours", symbol: "Wh", factor: 3600 },
      kilowattHour: { name: "Kilowatt-hours", symbol: "kWh", factor: 3600000 },
      megawattHour: { name: "Megawatt-hours", symbol: "MWh", factor: 3600000000 },
      gigawattHour: { name: "Gigawatt-hours", symbol: "GWh", factor: 3600000000000 }
    }
  },

  power: {
    name: "Power",
    units: {
      microwatt: { name: "Microwatts", symbol: "µW", factor: 0.000001 },
      milliwatt: { name: "Milliwatts", symbol: "mW", factor: 0.001 },
      watt: { name: "Watts", symbol: "W", factor: 1 },
      kilowatt: { name: "Kilowatts", symbol: "kW", factor: 1000 },
      megawatt: { name: "Megawatts", symbol: "MW", factor: 1000000 },
      gigawatt: { name: "Gigawatts", symbol: "GW", factor: 1000000000 },
      terawatt: { name: "Terawatts", symbol: "TW", factor: 1000000000000 },
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
      microhertz: { name: "Microhertz", symbol: "µHz", toBase: 0.000001 },
      millihertz: { name: "Millihertz", symbol: "mHz", toBase: 0.001 },
      hertz: { name: "Hertz", symbol: "Hz", toBase: 1 },
      kilohertz: { name: "Kilohertz", symbol: "kHz", toBase: 1000 },
      megahertz: { name: "Megahertz", symbol: "MHz", toBase: 1000000 },
      gigahertz: { name: "Gigahertz", symbol: "GHz", toBase: 1000000000 },
      terahertz: { name: "Terahertz", symbol: "THz", toBase: 1000000000000 },
      petahertz: { name: "Petahertz", symbol: "PHz", toBase: 1000000000000000 },
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

  inductance: {
    name: "Inductance",
    units: {
      picohenry: { name: "Picohenries", symbol: "pH", factor: 0.000000000001 },
      nanohenry: { name: "Nanohenries", symbol: "nH", factor: 0.000000001 },
      microhenry: { name: "Microhenries", symbol: "μH", factor: 0.000001 },
      millihenry: { name: "Millihenries", symbol: "mH", factor: 0.001 },
      henry: { name: "Henries", symbol: "H", factor: 1 },
      kilohenry: { name: "Kilohenries", symbol: "kH", factor: 1000 },
      megahenry: { name: "Megahenries", symbol: "MH", factor: 1000000 },
      gigahenry: { name: "Gigahenries", symbol: "GH", factor: 1000000000 },
      terahenry: { name: "Terahenries", symbol: "TH", factor: 1000000000000 }
    }
  },
  batteryCapacity: {
    name: "Battery Capacity",
    units: {
      milliampHour: { name: "Milliamp-hours", symbol: "mAh", factor: 0.001 },
      ampHour: { name: "Amp-hours", symbol: "Ah", factor: 1 },
      kiloampHour: { name: "Kilamp-hours", symbol: "kAh", factor: 1000 }
    }
  },
  conductance: {
    name: "Electrical Conductance",
    units: {
      microsiemens: { name: "Microsiemens", symbol: "µS", factor: 0.000001 },
      millisiemens: { name: "Millisiemens", symbol: "mS", factor: 0.001 },
      siemens: { name: "Siemens", symbol: "S", factor: 1 },
      kilosiemens: { name: "Kilosiemens", symbol: "kS", factor: 1000 },      megasiemens: { name: "Megasiemens", symbol: "MS", factor: 1000000 },      gigasiemens: { name: "Gigasiemens", symbol: "GS", factor: 1000000000 }
    }
  },
  magneticField: {
    name: "Magnetic Field",
    units: {
      nanotesla: { name: "Nanoteslas", symbol: "nT", factor: 0.000000001 },
      microtesla: { name: "Microteslas", symbol: "µT", factor: 0.000001 },
      millitesla: { name: "Milliteslas", symbol: "mT", factor: 0.001 },
      tesla: { name: "Teslas", symbol: "T", factor: 1 },
      kilotesla: { name: "Kiloteslas", symbol: "kT", factor: 1000 },
      gauss: { name: "Gauss", symbol: "G", factor: 0.0001 },
      kilogauss: { name: "Kilogauss", symbol: "kG", factor: 0.1 }
    }
  },
  luminousFlux: {
    name: "Luminous Flux",
    units: {
      lumen: { name: "Lumens", symbol: "lm", factor: 1 },
      kilolumen: { name: "Kilolumens", symbol: "klm", factor: 1000 },
      megalumen: { name: "Megalumens", symbol: "Mlm", factor: 1000000 }
    }
  },
  illuminance: {
    name: "Illuminance",
    units: {
      millilux: { name: "Millilux", symbol: "mlx", factor: 0.001 },
      lux: { name: "Lux", symbol: "lx", factor: 1 },
      kilolux: { name: "Kilolux", symbol: "klx", factor: 1000 },
      footCandle: { name: "Foot-candles", symbol: "fc", factor: 10.7639104167 }
    }
  },
  radioactivity: {
    name: "Radioactivity",
    units: {
      becquerel: { name: "Becquerels", symbol: "Bq", factor: 1 },
      kilobecquerel: { name: "Kilobecquerels", symbol: "kBq", factor: 1000 },
      megabecquerel: { name: "Megabecquerels", symbol: "MBq", factor: 1000000 },
      gigabecquerel: { name: "Gigabecquerels", symbol: "GBq", factor: 1000000000 },
      terabecquerel: { name: "Terabecquerels", symbol: "TBq", factor: 1000000000000 },
      curie: { name: "Curies", symbol: "Ci", factor: 37000000000 },
      millicurie: { name: "Millicuries", symbol: "mCi", factor: 37000000 },
      microcurie: { name: "Microcuries", symbol: "µCi", factor: 37000 }
    }
  },
  absorbedDose: {
    name: "Absorbed Dose",
    units: {
      microgray: { name: "Micrograys", symbol: "µGy", factor: 0.000001 },
      milligray: { name: "Milligrays", symbol: "mGy", factor: 0.001 },
      gray: { name: "Grays", symbol: "Gy", factor: 1 },
      kilogray: { name: "Kilograys", symbol: "kGy", factor: 1000 }
    }
  },

  equivalentDose: {
    name: "Equivalent Dose",
    units: {
      microsievert: { name: "Microsieverts", symbol: "µSv", factor: 0.000001 },
      millisievert: { name: "Millisieverts", symbol: "mSv", factor: 0.001 },
      sievert: { name: "Sieverts", symbol: "Sv", factor: 1 },
      kilosievert: { name: "Kilosieverts", symbol: "kSv", factor: 1000 }
    }
  },
  typography: {
    name: "Typography",
    units: {
      twip: { name: "Twips", symbol: "twip", factor: 0.05 },
      point: { name: "Points", symbol: "pt", factor: 1 },
      pica: { name: "Picas", symbol: "pc", factor: 12 },
      didotPoint: { name: "Didot Points", symbol: "dd", factor: 1.066 },
      cicero: { name: "Ciceros", symbol: "cc", factor: 12.792 },
      pixel: { name: "Pixels", symbol: "px", factor: 0.75 }
    }
  },
  magneticFlux: {
    name: "Magnetic Flux",
    units: {
      microweber: { name: "Microwebers", symbol: "µWb", factor: 0.000001 },
      milliweber: { name: "Milliwebers", symbol: "mWb", factor: 0.001 },
      weber: { name: "Webers", symbol: "Wb", factor: 1 },
      maxwell: { name: "Maxwells", symbol: "Mx", factor: 0.00000001 }
    }
  },
  electricField: {
    name: "Electric Field Strength",
    units: {
      microvoltPerMeter: { name: "Microvolts per Meter", symbol: "µV/m", factor: 0.000001 },
      millivoltPerMeter: { name: "Millivolts per Meter", symbol: "mV/m", factor: 0.001 },
      voltPerMeter: { name: "Volts per Meter", symbol: "V/m", factor: 1 },
      kilovoltPerMeter: { name: "Kilovolts per Meter", symbol: "kV/m", factor: 1000 },
      megavoltPerMeter: { name: "Megavolts per Meter", symbol: "MV/m", factor: 1000000 }
    }
  },
  thermalConductivity: {
    name: "Thermal Conductivity",
    units: {
      milliwattPerMeterKelvin: { name: "Milliwatts per Meter-Kelvin", symbol: "mW/(m·K)", factor: 0.001 },
      wattPerMeterKelvin: { name: "Watts per Meter-Kelvin", symbol: "W/(m·K)", factor: 1 },
      kilowattPerMeterKelvin: { name: "Kilowatts per Meter-Kelvin", symbol: "kW/(m·K)", factor: 1000 }
    }
  },
  dynamicViscosity: {
    name: "Dynamic Viscosity",
    units: {
      micropascalSecond: { name: "Micropascal-seconds", symbol: "µPa·s", factor: 0.000001 },
      millipascalSecond: { name: "Millipascal-seconds", symbol: "mPa·s", factor: 0.001 },
      pascalSecond: { name: "Pascal-seconds", symbol: "Pa·s", factor: 1 },
      poise: { name: "Poise", symbol: "P", factor: 0.1 },
      centipoise: { name: "Centipoise", symbol: "cP", factor: 0.001 }
    }
  },
  kinematicViscosity: {
    name: "Kinematic Viscosity",
    units: {
      squareMillimeterPerSecond: { name: "Square Millimeters per Second", symbol: "mm²/s", factor: 0.000001 },
      squareMeterPerSecond: { name: "Square Meters per Second", symbol: "m²/s", factor: 1 },
      stokes: { name: "Stokes", symbol: "St", factor: 0.0001 },
      centistokes: { name: "Centistokes", symbol: "cSt", factor: 0.000001 }
    }
  },
  kinematicViscosity: {
    name: "Kinematic Viscosity",
    units: {
      squareMillimeterPerSecond: { name: "Square Millimeters per Second", symbol: "mm²/s", factor: 0.000001 },
      squareMeterPerSecond: { name: "Square Meters per Second", symbol: "m²/s", factor: 1 },
      stokes: { name: "Stokes", symbol: "St", factor: 0.0001 },
      centistokes: { name: "Centistokes", symbol: "cSt", factor: 0.000001 }
    }
  },
  surfaceTension: {
    name: "Surface Tension",
    units: {
      micronewtonPerMeter: { name: "Micronewtons per Meter", symbol: "µN/m", factor: 0.000001 },
      millinewtonPerMeter: { name: "Millinewtons per Meter", symbol: "mN/m", factor: 0.001 },
      newtonPerMeter: { name: "Newtons per Meter", symbol: "N/m", factor: 1 },
      dynePerCentimeter: { name: "Dynes per Centimeter", symbol: "dyn/cm", factor: 0.001 }
    }
  },
  specificHeat: {
    name: "Specific Heat Capacity",
    units: {
      joulePerKilogramKelvin: { name: "Joules per Kilogram-Kelvin", symbol: "J/(kg·K)", factor: 1 },
      kilojoulePerKilogramKelvin: { name: "Kilojoules per Kilogram-Kelvin", symbol: "kJ/(kg·K)", factor: 1000 },
      joulePerGramKelvin: { name: "Joules per Gram-Kelvin", symbol: "J/(g·K)", factor: 1000 },
      caloriePerGramCelsius: { name: "Calories per Gram-Celsius", symbol: "cal/(g·°C)", factor: 4184 },
      btuPerPoundFahrenheit: { name: "BTU per Pound-Fahrenheit", symbol: "BTU/(lb·°F)", factor: 4186.8 }
    }
  },
  thermalEnergy: {
    name: "Thermal Energy",
    units: {
      btu: { name: "BTUs", symbol: "BTU", factor: 1 },
      millionBtu: { name: "Million BTUs", symbol: "MMBtu", factor: 1000000 },
      therm: { name: "Therms", symbol: "thm", factor: 10 },
      footPound: { name: "Foot-pounds", symbol: "ft-lb", factor: 0.000392859 },
      kilowattHour: { name: "Kilowatt-hours", symbol: "kWh", factor: 3.412141633 }
    }
  },
  acceleration: {
    name: "Acceleration",
    units: {
      millimeterPerSecondSquared: { name: "Millimeters per Second Squared", symbol: "mm/s²", factor: 0.001 },
      centimeterPerSecondSquared: { name: "Centimeters per Second Squared", symbol: "cm/s²", factor: 0.01 },
      meterPerSecondSquared: { name: "Meters per Second Squared", symbol: "m/s²", factor: 1 },
      footPerSecondSquared: { name: "Feet per Second Squared", symbol: "ft/s²", factor: 0.3048 },
      standardGravity: { name: "Standard Gravity", symbol: "g", factor: 9.80665 },
      gal: { name: "Gals", symbol: "Gal", factor: 0.01 }
    }
  },
  wavelength: {
    name: "Wavelength",
    units: {
      picometer: { name: "Picometers", symbol: "pm", factor: 0.000000000001 },
      nanometer: { name: "Nanometers", symbol: "nm", factor: 0.000000001 },
      micrometer: { name: "Micrometers", symbol: "µm", factor: 0.000001 },
      millimeter: { name: "Millimeters", symbol: "mm", factor: 0.001 },
      centimeter: { name: "Centimeters", symbol: "cm", factor: 0.01 },
      meter: { name: "Meters", symbol: "m", factor: 1 },
      kilometer: { name: "Kilometers", symbol: "km", factor: 1000 }
    }
  },
  molarMass: {
    name: "Molar Mass",
    units: {
      microgramPerMole: { name: "Micrograms per Mole", symbol: "µg/mol", factor: 0.000001 },
      milligramPerMole: { name: "Milligrams per Mole", symbol: "mg/mol", factor: 0.001 },
      gramPerMole: { name: "Grams per Mole", symbol: "g/mol", factor: 1 },
      kilogramPerMole: { name: "Kilograms per Mole", symbol: "kg/mol", factor: 1000 },
      poundPerMole: { name: "Pounds per Mole", symbol: "lb/mol", factor: 453.59237 }
    }
  },
  amountOfSubstance: {
    name: "Amount of Substance",
    units: {
      nanomole: { name: "Nanomoles", symbol: "nmol", factor: 0.000000001 },
      micromole: { name: "Micromoles", symbol: "µmol", factor: 0.000001 },
      millimole: { name: "Millimoles", symbol: "mmol", factor: 0.001 },
      mole: { name: "Moles", symbol: "mol", factor: 1 },
      kilomole: { name: "Kilomoles", symbol: "kmol", factor: 1000 }
    }
  },
  molarConcentration: {
    name: "Molar Concentration",
    units: {
      micromolePerLiter: { name: "Micromoles per Liter", symbol: "µmol/L", factor: 0.000001 },
      millimolePerLiter: { name: "Millimoles per Liter", symbol: "mmol/L", factor: 0.001 },
      molePerLiter: { name: "Moles per Liter", symbol: "mol/L", factor: 1 },
      kilomolePerLiter: { name: "Kilomoles per Liter", symbol: "kmol/L", factor: 1000 },
      molePerCubicMeter: { name: "Moles per Cubic Meter", symbol: "mol/m³", factor: 0.001 },
      millimolePerCubicMeter: { name: "Millimoles per Cubic Meter", symbol: "mmol/m³", factor: 0.000001 }
    }
  },
  molality: {
    name: "Molality",
    units: {
      micromolePerKilogram: { name: "Micromoles per Kilogram", symbol: "µmol/kg", factor: 0.000001 },
      millimolePerKilogram: { name: "Millimoles per Kilogram", symbol: "mmol/kg", factor: 0.001 },
      molePerKilogram: { name: "Moles per Kilogram", symbol: "mol/kg", factor: 1 },
      kilomolePerKilogram: { name: "Kilomoles per Kilogram", symbol: "kmol/kg", factor: 1000 }
    }
  },
  volumetricFlowRate: {
    name: "Volumetric Flow Rate",
    units: {
      milliliterPerSecond: { name: "Milliliters per Second", symbol: "mL/s", factor: 0.000001 },
      literPerSecond: { name: "Liters per Second", symbol: "L/s", factor: 0.001 },
      literPerMinute: { name: "Liters per Minute", symbol: "L/min", factor: 0.0000166666666667 },
      cubicMeterPerSecond: { name: "Cubic Meters per Second", symbol: "m³/s", factor: 1 },
      cubicMeterPerMinute: { name: "Cubic Meters per Minute", symbol: "m³/min", factor: 0.0166666666667 },
      gallonPerMinute: { name: "US Gallons per Minute", symbol: "gal/min", factor: 0.0000630901964 }
    }
  },
  massFlowRate: {
    name: "Mass Flow Rate",
    units: {
      milligramPerSecond: { name: "Milligrams per Second", symbol: "mg/s", factor: 0.000001 },
      gramPerSecond: { name: "Grams per Second", symbol: "g/s", factor: 0.001 },
      kilogramPerSecond: { name: "Kilograms per Second", symbol: "kg/s", factor: 1 },
      poundPerSecond: { name: "Pounds per Second", symbol: "lb/s", factor: 0.45359237 },
      gramPerMinute: { name: "Grams per Minute", symbol: "g/min", factor: 0.0000166666666667 },
      kilogramPerMinute: { name: "Kilograms per Minute", symbol: "kg/min", factor: 0.0166666666667 },
      kilogramPerHour: { name: "Kilograms per Hour", symbol: "kg/h", factor: 0.000277777777778 },
      poundPerMinute: { name: "Pounds per Minute", symbol: "lb/min", factor: 0.00755987283333 },
      poundPerHour: { name: "Pounds per Hour", symbol: "lb/h", factor: 0.000125998814 }
    }
  },
  momentum: {
    name: "Momentum",
    units: {
      gramMeterPerSecond: { name: "Gram-meters per Second", symbol: "g·m/s", factor: 0.001 },
      kilogramMeterPerSecond: { name: "Kilogram-meters per Second", symbol: "kg·m/s", factor: 1 },
      poundFootPerSecond: { name: "Pound-feet per Second", symbol: "lb·ft/s", factor: 0.138254954376 },
      poundFootPerMinute: { name: "Pound-feet per Minute", symbol: "lb·ft/min", factor: 0.0023042492396 }
    }
  },
  angularMomentum: {
    name: "Angular Momentum",
    units: {
      gramMeterSquaredPerSecond: { name: "Gram-meters Squared per Second", symbol: "g·m²/s", factor: 0.001 },
      kilogramMeterSquaredPerSecond: { name: "Kilogram-meters Squared per Second", symbol: "kg·m²/s", factor: 1 },
      poundFootSquaredPerSecond: { name: "Pound-feet Squared per Second", symbol: "lb·ft²/s", factor: 0.0421401100934 },
      poundFootSquaredPerMinute: { name: "Pound-feet Squared per Minute", symbol: "lb·ft²/min", factor: 0.000702335168223 }
    }
  },
  specificVolume: {
    name: "Specific Volume",
    units: {
      cubicCentimeterPerGram: { name: "Cubic Centimeters per Gram", symbol: "cm³/g", factor: 0.001 },
      literPerKilogram: { name: "Liters per Kilogram", symbol: "L/kg", factor: 0.001 },
      cubicMeterPerKilogram: { name: "Cubic Meters per Kilogram", symbol: "m³/kg", factor: 1 },
      cubicFootPerPound: { name: "Cubic Feet per Pound", symbol: "ft³/lb", factor: 0.0624279606 },
      gallonPerPound: { name: "US Gallons per Pound", symbol: "gal/lb", factor: 0.00834540445 }
    }
  },
  heatFlux: {
    name: "Heat Flux",
    units: {
      wattPerSquareMeter: { name: "Watts per Square Meter", symbol: "W/m²", factor: 1 },
      kilowattPerSquareMeter: { name: "Kilowatts per Square Meter", symbol: "kW/m²", factor: 1000 },
      wattPerSquareCentimeter: { name: "Watts per Square Centimeter", symbol: "W/cm²", factor: 10000 },
      btuPerHourSquareFoot: { name: "BTUs per Hour per Square Foot", symbol: "BTU/(h·ft²)", factor: 3.15459075 }
    }
  },
  thermalResistance: {
    name: "Thermal Resistance",
    units: {
      kelvinPerWatt: { name: "Kelvins per Watt", symbol: "K/W", factor: 1 },
      celsiusPerWatt: { name: "Degrees Celsius per Watt", symbol: "°C/W", factor: 1 },
      fahrenheitHourPerBtu: { name: "Degrees Fahrenheit Hours per BTU", symbol: "°F·h/BTU", factor: 0.176228083 },
      kelvinPerKilowatt: { name: "Kelvins per Kilowatt", symbol: "K/kW", factor: 0.001 }
    }
  },
  thermalExpansionCoefficient: {
    name: "Thermal Expansion Coefficient",
    units: {
      perKelvin: { name: "Per Kelvin", symbol: "K⁻¹", factor: 1 },
      perCelsius: { name: "Per Degree Celsius", symbol: "°C⁻¹", factor: 1 },
      perFahrenheit: { name: "Per Degree Fahrenheit", symbol: "°F⁻¹", factor: 1.8 }
    }
  },
  pressureGradient: {
    name: "Pressure Gradient",
    units: {
      pascalPerMeter: { name: "Pascals per Meter", symbol: "Pa/m", factor: 1 },
      kilopascalPerMeter: { name: "Kilopascals per Meter", symbol: "kPa/m", factor: 1000 },
      barPerMeter: { name: "Bar per Meter", symbol: "bar/m", factor: 100000 },
      psiPerMeter: { name: "PSI per Meter", symbol: "psi/m", factor: 6894.757293 },
      psiPerFoot: { name: "PSI per Foot", symbol: "psi/ft", factor: 22651.58495 }
    }
  },
  magneticPermeability: {
    name: "Magnetic Permeability",
    units: {
      nanohenryPerMeter: { name: "Nanohenries per Meter", symbol: "nH/m", factor: 0.000000001 },
      microhenryPerMeter: { name: "Microhenries per Meter", symbol: "μH/m", factor: 0.000001 },
      millihenryPerMeter: { name: "Millihenries per Meter", symbol: "mH/m", factor: 0.001 },
      henryPerMeter: { name: "Henries per Meter", symbol: "H/m", factor: 1 }
    }
  },
  electricalResistivity: {
    name: "Electrical Resistivity",
    units: {
      microohmMeter: { name: "Microohm-meters", symbol: "μΩ·m", factor: 0.000001 },
      milliohmMeter: { name: "Milliohm-meters", symbol: "mΩ·m", factor: 0.001 },
      ohmMeter: { name: "Ohm-meters", symbol: "Ω·m", factor: 1 },
      ohmCentimeter: { name: "Ohm-centimeters", symbol: "Ω·cm", factor: 0.01 },
      kiloohmMeter: { name: "Kiloohm-meters", symbol: "kΩ·m", factor: 1000 }
    }
  },
  electricalConductivity: {
    name: "Electrical Conductivity",
    units: {
      microsiemensPerMeter: { name: "Microsiemens per Meter", symbol: "μS/m", factor: 0.000001 },
      millisiemensPerMeter: { name: "Millisiemens per Meter", symbol: "mS/m", factor: 0.001 },
      siemensPerMeter: { name: "Siemens per Meter", symbol: "S/m", factor: 1 },
      siemensPerCentimeter: { name: "Siemens per Centimeter", symbol: "S/cm", factor: 100 },
      kilosiemensPerMeter: { name: "Kilosiemens per Meter", symbol: "kS/m", factor: 1000 },
      megasiemensPerMeter: { name: "Megasiemens per Meter", symbol: "MS/m", factor: 1000000 }
    }
  },
  permittivity: {
    name: "Permittivity",
    units: {
      picofaradPerMeter: { name: "Picofarads per Meter", symbol: "pF/m", factor: 0.000000000001 },
      nanofaradPerMeter: { name: "Nanofarads per Meter", symbol: "nF/m", factor: 0.000000001 },
      microfaradPerMeter: { name: "Microfarads per Meter", symbol: "μF/m", factor: 0.000001 },
      millifaradPerMeter: { name: "Millifarads per Meter", symbol: "mF/m", factor: 0.001 },
      faradPerMeter: { name: "Farads per Meter", symbol: "F/m", factor: 1 }
    }
  },
  permittivity: {
    name: "Permittivity",
    units: {
      picofaradPerMeter: { name: "Picofarads per Meter", symbol: "pF/m", factor: 0.000000000001 },
      nanofaradPerMeter: { name: "Nanofarads per Meter", symbol: "nF/m", factor: 0.000000001 },
      microfaradPerMeter: { name: "Microfarads per Meter", symbol: "μF/m", factor: 0.000001 },
      millifaradPerMeter: { name: "Millifarads per Meter", symbol: "mF/m", factor: 0.001 },
      faradPerMeter: { name: "Farads per Meter", symbol: "F/m", factor: 1 }
    }
  },
  dielectricStrength: {
    name: "Dielectric Strength",
    units: {
      voltPerMeter: { name: "Volts per Meter", symbol: "V/m", factor: 1 },
      voltPerMillimeter: { name: "Volts per Millimeter", symbol: "V/mm", factor: 1000 },
      kilovoltPerMeter: { name: "Kilovolts per Meter", symbol: "kV/m", factor: 1000 },
      megavoltPerMeter: { name: "Megavolts per Meter", symbol: "MV/m", factor: 1000000 },
      kilovoltPerMillimeter: { name: "Kilovolts per Millimeter", symbol: "kV/mm", factor: 1000000 }
    }
  },
  heatTransferCoefficient: {
    name: "Heat Transfer Coefficient",
    units: {
      wattPerSquareMeterKelvin: { name: "Watts per Square Meter Kelvin", symbol: "W/(m²·K)", factor: 1 },
      kilowattPerSquareMeterKelvin: { name: "Kilowatts per Square Meter Kelvin", symbol: "kW/(m²·K)", factor: 1000 },
      btuPerHourSquareFootFahrenheit: { name: "BTU per Hour Square Foot Fahrenheit", symbol: "BTU/(h·ft²·°F)", factor: 5.678263337 },
      caloriePerSecondSquareCentimeterKelvin: { name: "Calories per Second Square Centimeter Kelvin", symbol: "cal/(s·cm²·K)", factor: 41868 }
    }
  },
  thermalDiffusivity: {
    name: "Thermal Diffusivity",
    units: {
      squareMillimeterPerSecond: { name: "Square Millimeters per Second", symbol: "mm²/s", factor: 0.000001 },
      squareCentimeterPerSecond: { name: "Square Centimeters per Second", symbol: "cm²/s", factor: 0.0001 },
      squareMeterPerSecond: { name: "Square Meters per Second", symbol: "m²/s", factor: 1 },
      squareFootPerSecond: { name: "Square Feet per Second", symbol: "ft²/s", factor: 0.09290304 }
    }
  },
  thermalEffusivity: {
    name: "Thermal Effusivity",
    units: {
      wattSecondHalfPerSquareMeterKelvin: { name: "Watts Seconds Half per Square Meter Kelvin", symbol: "W·s½/(m²·K)", factor: 1 },
      kilowattSecondHalfPerSquareMeterKelvin: { name: "Kilowatts Seconds Half per Square Meter Kelvin", symbol: "kW·s½/(m²·K)", factor: 1000 },
      calorieSecondHalfPerSquareCentimeterKelvin: { name: "Calories Seconds Half per Square Centimeter Kelvin", symbol: "cal·s½/(cm²·K)", factor: 418.68 }
    }
  },
  capacitance: {
    name: "Capacitance",
    units: {
      picofarad: { name: "Picofarads", symbol: "pF", factor: 0.000000000001 },
      nanofarad: { name: "Nanofarads", symbol: "nF", factor: 0.000000001 },
      microfarad: { name: "Microfarads", symbol: "µF", factor: 0.000001 },
      millifarad: { name: "Millifarads", symbol: "mF", factor: 0.001 },
      farad: { name: "Farads", symbol: "F", factor: 1 },
      kilofarad: { name: "Kilofarads", symbol: "kF", factor: 1000 },
      megafarad: { name: "Megafarads", symbol: "MF", factor: 1000000 },
      gigafarad: { name: "Gigafarads", symbol: "GF", factor: 1000000000 },
      terafarad: { name: "Terafarads", symbol: "TF", factor: 1000000000000 }
    }
  },
  charge: {
    name: "Electrical Charge",
    units: {
      femtocoulomb: { name: "Femtocoulombs", symbol: "fC", factor: 0.000000000000001 },
      picocoulomb: { name: "Picocoulombs", symbol: "pC", factor: 0.000000000001 },
      nanocoulomb: { name: "Nanocoulombs", symbol: "nC", factor: 0.000000001 },
      microcoulomb: { name: "Microcoulombs", symbol: "μC", factor: 0.000001 },
      millicoulomb: { name: "Millicoulombs", symbol: "mC", factor: 0.001 },
      coulomb: { name: "Coulombs", symbol: "C", factor: 1 },
      kilocoulomb: { name: "Kilocoulombs", symbol: "kC", factor: 1000 },
      megacoulomb: { name: "Megacoulombs", symbol: "MC", factor: 1000000 },
      gigacoulomb: { name: "Gigacoulombs", symbol: "GC", factor: 1000000000 }
    }
  },
  electrical: {
    name: "Electrical",
    units: {
      nanovolt: { name: "Nanovolts", symbol: "nV", factor: 0.000000001 },
      microvolt: { name: "Microvolts", symbol: "μV", factor: 0.000001 },
      millivolt: { name: "Millivolts", symbol: "mV", factor: 0.001 },
      volt: { name: "Volts", symbol: "V", factor: 1 },
      kilovolt: { name: "Kilovolts", symbol: "kV", factor: 1000 },
      megavolt: { name: "Megavolts", symbol: "MV", factor: 1000000 },
      gigavolt: { name: "Gigavolts", symbol: "GV", factor: 1000000000 },
      teravolt: { name: "Teravolts", symbol: "TV", factor: 1000000000000 },      nanoampere: { name: "Nanoamps", symbol: "nA", factor: 0.000000001 },
      microampere: { name: "Microamps", symbol: "μA", factor: 0.000001 },
      milliampere: { name: "Milliamps", symbol: "mA", factor: 0.001 },
      ampere: { name: "Amps", symbol: "A", factor: 1 },
      kiloampere: { name: "Kiloamps", symbol: "kA", factor: 1000 },
      megaampere: { name: "Megaamps", symbol: "MA", factor: 1000000 },
      gigaampere: { name: "Gigaamps", symbol: "GA", factor: 1000000000 },
      teraampere: { name: "Teraamps", symbol: "TA", factor: 1000000000000 },      nanoohm: { name: "Nanoohms", symbol: "nΩ", factor: 0.000000001 },
      microohm: { name: "Microohms", symbol: "μΩ", factor: 0.000001 },
      milliohm: { name: "Milliohms", symbol: "mΩ", factor: 0.001 },
      ohm: { name: "Ohms", symbol: "Ω", factor: 1 },
      kilohm: { name: "Kilohms", symbol: "kΩ", factor: 1000 },
      megohm: { name: "Megohms", symbol: "MΩ", factor: 1000000 },
      gigohm: { name: "Gigohms", symbol: "GΩ", factor: 1000000000 },
      terohm: { name: "Teraohms", symbol: "TΩ", factor: 1000000000000 }
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
      gallon: { name: "Gallons", symbol: "gal", toBase: 768 },
      milliliter: { name: "Milliliters", symbol: "mL", toBase: 0.202884136 },
      liter: { name: "Liters", symbol: "L", toBase: 202.884136 },
      imperialFluidOunce: { name: "Imperial Fluid Ounces", symbol: "imp fl oz", toBase: 5.75981 },
      imperialPint: { name: "Imperial Pints", symbol: "imp pt", toBase: 92.157 },
      imperialQuart: { name: "Imperial Quarts", symbol: "imp qt", toBase: 184.315 },
      imperialGallon: { name: "Imperial Gallons", symbol: "imp gal", toBase: 737.258 }
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
































































