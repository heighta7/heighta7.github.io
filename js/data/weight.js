const Weight = {};
Weight.POUND = 2.204623;

Weight.displayString = (kg) => {
    let lbs = kg * Weight.POUND;
    return `${kg.toFixed(1)} kg (${lbs.toFixed(1)} lbs)`;
};