const EditHeelsWidget = {};
EditHeelsWidget.name = 'edit-heels-widget';

$(() => {
    $('#edit-heels-widget .close').on('click', () => { EditHeelsWidget.close(); });
    $('#edit-heels-widget .heels-toggle').on('click', () => { EditHeelsWidget.toggleHeels(); });
    $('#edit-heels-widget .percent-toggle').on('click', () => { EditHeelsWidget.toggleMode(); });

    $('#edit-heels-widget .percent-units .picker-up').on('click', () => { EditHeelsWidget.percentButton(0.01); });
    $('#edit-heels-widget .percent-units .picker-down').on('click', () => { EditHeelsWidget.percentButton(-0.01); });
    $('#edit-heels-widget .percent-tenths .picker-up').on('click', () => { EditHeelsWidget.percentButton(0.001); });
    $('#edit-heels-widget .percent-tenths .picker-down').on('click', () => { EditHeelsWidget.percentButton(-0.001); });
    $('#edit-heels-widget .fixed-inches .picker-up').on('click', () => { EditHeelsWidget.fixedButton(Height.INCH); });
    $('#edit-heels-widget .fixed-inches .picker-down').on('click', () => { EditHeelsWidget.fixedButton(-Height.INCH); });
    $('#edit-heels-widget .fixed-inch-tenths .picker-up').on('click', () => { EditHeelsWidget.fixedButton(Height.INCH * 0.1); });
    $('#edit-heels-widget .fixed-inch-tenths .picker-down').on('click', () => { EditHeelsWidget.fixedButton(-Height.INCH * 0.1); });
});

EditHeelsWidget.init = () => {
    EditHeelsWidget.updateData();
};
EditHeelsWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};
EditHeelsWidget.updateData = () => {
    let person = People.getSelected();
    
    let fixedMode = person.heelsCm != null;
    if (fixedMode) {
        $('#edit-heels-widget .editor-fixed').removeClass('gone');
        $('#edit-heels-widget .editor-percent').addClass('gone');
        $('#edit-heels-widget .percent-toggle .toggle-off').removeClass('gone');
        $('#edit-heels-widget .percent-toggle .toggle-on').addClass('gone');

        let imperial = Height.asImperialHeels(person.heelsCm ?? 0);
        $('#edit-heels-widget .fixed-inches p').text(`${imperial.inches.toFixed()}`);
        $('#edit-heels-widget .fixed-inch-tenths p').text(`.${imperial.inchTenths.toFixed()}'`);
    }
    else {
        $('#edit-heels-widget .editor-fixed').addClass('gone');
        $('#edit-heels-widget .editor-percent').removeClass('gone');
        $('#edit-heels-widget .percent-toggle .toggle-off').addClass('gone');
        $('#edit-heels-widget .percent-toggle .toggle-on').removeClass('gone');

        let percentage = Math.round((person.heelsPercent ?? 0) * 1000) / 10;
        
        let units = Math.floor(percentage);
        let tenths = (percentage % 1) * 10;
        $('#edit-heels-widget .percent-units p').text(`${units.toFixed()}`);
        $('#edit-heels-widget .percent-tenths p').text(`.${tenths.toFixed()}%`);
    }

    if (person.heelsEnabled) {
        $('#edit-heels-widget .heels-toggle .toggle-off').addClass('gone');
        $('#edit-heels-widget .heels-toggle .toggle-on').removeClass('gone');
    }
    else {
        $('#edit-heels-widget .heels-toggle .toggle-off').removeClass('gone');
        $('#edit-heels-widget .heels-toggle .toggle-on').addClass('gone');
    }
    
    let heightPlusHeels = person.height + person.calculateHeelsCm(); 
    $('#edit-heels-widget .height-no-heels p').text(Height.displayString(person.height));
    $('#edit-heels-widget .height-heels p').text(Height.displayString(heightPlusHeels));
};
EditHeelsWidget.toggleHeels = () => {
    People.getSelected().heelsEnabled = !People.getSelected().heelsEnabled;
    EditHeelsWidget.updateData();
};
EditHeelsWidget.toggleMode = () => {
    let person = People.getSelected();
    let toggleToFixed = person.heelsCm == null;
    let currentHeelsHeight = person.calculateHeelsCm();
    if (toggleToFixed) {
        person.setHeelsCm(currentHeelsHeight);
    }
    else {
        person.setHeelsPercent(currentHeelsHeight / person.height);
    }
    EditHeelsWidget.updateData();
};
EditHeelsWidget.percentButton = (percent) => {
    let person = People.getSelected();
    let newVal = (person.heelsPercent ?? 0) + percent;
    if (newVal < 0) {
        newVal = 0;
    }
    person.setHeelsPercent(Math.round(newVal * 1000) / 1000);
    EditHeelsWidget.updateData();
};
EditHeelsWidget.fixedButton = (cm) => {
    let person = People.getSelected();
    let newVal = (person.heelsCm ?? 0) + cm;
    if (newVal < 0) {
        newVal = 0;
    }
    person.setHeelsCm(Height.toNearestInchTenth(newVal));
    EditHeelsWidget.updateData();
};