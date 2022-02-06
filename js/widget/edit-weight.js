const EditWeightWidget = {};
EditWeightWidget.name = 'edit-weight-widget';

$(() => {
    $('#edit-weight-widget .close').on('click', () => { EditWeightWidget.close(); });
    $('#edit-weight-widget .weight-tens .picker-up').on('click', () => { EditWeightWidget.weightButton(10); });
    $('#edit-weight-widget .weight-tens .picker-down').on('click', () => { EditWeightWidget.weightButton(-10); });
    $('#edit-weight-widget .weight-units .picker-up').on('click', () => { EditWeightWidget.weightButton(1); });
    $('#edit-weight-widget .weight-units .picker-down').on('click', () => { EditWeightWidget.weightButton(-1); });
    $('#edit-weight-widget .height-feet .picker-up').on('click', () => { EditWeightWidget.heightButton(Height.FOOT); });
    $('#edit-weight-widget .height-feet .picker-down').on('click', () => { EditWeightWidget.heightButton(-Height.FOOT); });
    $('#edit-weight-widget .height-inches .picker-up').on('click', () => { EditWeightWidget.heightButton(Height.INCH); });
    $('#edit-weight-widget .height-inches .picker-down').on('click', () => { EditWeightWidget.heightButton(-Height.INCH); });
});

EditWeightWidget.init = () => {
    EditWeightWidget.updateData();
};
EditWeightWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};
EditWeightWidget.updateData = () => {
    let person = People.getSelected();

    let imperial = Height.asImperial(person.weightRatioHeight);
    $('#edit-weight-widget .height-feet p').text(`${imperial.feet.toFixed()}'`);
    $('#edit-weight-widget .height-inches p').text(`${imperial.inches.toFixed()}"`);

    let weight = Math.round(person.weightRatioWeight);
    let weightTens = Math.floor(weight / 10);
    let weightUnits = weight % 10;
    $('#edit-weight-widget .weight-tens p').text(`${weightTens.toFixed()}`);
    $('#edit-weight-widget .weight-units p').text(`${weightUnits.toFixed()}`);

    $('#edit-weight-widget .formula-in p').text(`${Weight.displayString(person.weightRatioWeight)} at ${Height.displayString(person.weightRatioHeight)}`);
    $('#edit-weight-widget .formula-out p').text(`Therefore, ${Weight.displayString(person.calculateWeightKg())} at ${Height.displayString(person.height)}`);
};
EditWeightWidget.weightButton = (kg) => {
    let person = People.getSelected();
    let newVal = person.weightRatioWeight + kg;
    if (newVal < 0) {
        newVal = 0;
    }
    person.weightRatioWeight = Math.round(newVal);
    EditWeightWidget.updateData();
};
EditWeightWidget.heightButton = (cm) => {
    let person = People.getSelected();
    let newVal = person.weightRatioHeight + cm;
    if (newVal < Height.INCH) {
        newVal = Height.INCH;
    }
    person.weightRatioHeight = Height.toNearestInch(newVal);
    EditWeightWidget.updateData();
};