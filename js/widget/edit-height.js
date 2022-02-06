const EditHeightWidget = {};
EditHeightWidget.name = 'edit-height-widget';

$(() => {
    $('#edit-height-widget .close').on('click', () => { EditHeightWidget.close(); });
    $('#edit-height-widget .height-feet .picker-up').on('click', () => { EditHeightWidget.heightButton(Height.FOOT); });
    $('#edit-height-widget .height-feet .picker-down').on('click', () => { EditHeightWidget.heightButton(-Height.FOOT); });
    $('#edit-height-widget .height-inches .picker-up').on('click', () => { EditHeightWidget.heightButton(Height.INCH); });
    $('#edit-height-widget .height-inches .picker-down').on('click', () => { EditHeightWidget.heightButton(-Height.INCH); });
    $('#edit-height-widget .height-inch-tenths .picker-up').on('click', () => { EditHeightWidget.heightButton(Height.INCH / 10); });
    $('#edit-height-widget .height-inch-tenths .picker-down').on('click', () => { EditHeightWidget.heightButton(-Height.INCH / 10); });
});

EditHeightWidget.init = () => {
    EditHeightWidget.updateData();
};
EditHeightWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};
EditHeightWidget.updateData = () => {
    let person = People.getSelected();
    let imperial = Height.asImperial(person.height);
    $('#edit-height-widget .height-feet p').text(`${imperial.feet.toFixed()}'`);
    $('#edit-height-widget .height-inches p').text(`${imperial.inches.toFixed()}`);
    $('#edit-height-widget .height-inch-tenths p').text(`.${imperial.inchTenths.toFixed()}"`);
    
    $('#edit-height-widget .height-metric p').text(Height.displayStringMetric(person.height));
    $('#edit-height-widget .weight p').text(Weight.displayString(person.calculateWeightKg()));
};
EditHeightWidget.heightButton = (cm) => {
    let person = People.getSelected();
    let newHeight = person.height + cm;
    if (newHeight < 0) {
        newHeight = 0;
    }
    person.height = Height.toNearestInchTenth(newHeight);
    EditHeightWidget.updateData();
};