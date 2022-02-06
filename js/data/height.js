const Height = {};

Height.INCH = 2.54;
Height.FOOT = 2.54 * 12;

Height.fromImperial = (feet, inches) => {
    return feet * Height.FOOT + inches * Height.INCH;
};
Height.displayStringImperial = (cm) => {
    let imperial = Height.asImperial(cm);
    return `${imperial.feet.toFixed()}' ${(imperial.inches + imperial.inchTenths / 10).toFixed(1)}"`;
};
Height.displayStringMetric = (cm) => {
    return `${cm.toFixed(1)} cm`;
};
Height.displayString = (cm) => {
    return `${Height.displayStringImperial(cm)} (${Height.displayStringMetric(cm)})`;
};
Height.asImperial = (cm) => {
    let inchTenths = Math.round(cm / Height.INCH * 10);
    return { feet: Math.floor(inchTenths / 120), inches: Math.floor(inchTenths % 120 / 10), inchTenths: inchTenths % 10 };
};
Height.toNearestInchTenth = (cm) => {
    return Math.round(cm / (Height.INCH * 0.1)) * (Height.INCH * 0.1);
};
Height.toNearestInch = (cm) => {
    return Math.round(cm / Height.INCH) * Height.INCH;
};

Height.displayStringImperialHeels = (cm) => {
    let imperial = Height.asImperialHeels(cm);
    return `${(imperial.inches + imperial.inchTenths / 10).toFixed(1)}"`;
};
Height.displayStringHeels = (cm) => {
    return `${Height.displayStringImperialHeels(cm)} (${Height.displayStringMetric(cm)})`;
};
Height.asImperialHeels = (cm) => {
    let imperial = Height.asImperial(cm);
    return { inches: imperial.inches + imperial.feet * 12, inchTenths: imperial.inchTenths };
};
