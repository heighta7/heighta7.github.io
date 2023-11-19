const PersonWidget = {};
PersonWidget.name = 'person-widget';

$(() => {
    $('#person-widget .edit-height').on('click', () => { PersonWidget.editHeight(); });
    $('#person-widget .heels').on('click', () => { PersonWidget.editHeels(); });
    $('#person-widget .graphic').on('click', () => { PersonWidget.graphic(); });
    $('#person-widget .more').on('click', () => { PersonWidget.more(); });
    $('#person-widget .close').on('click', () => { PersonWidget.close(); });
});

PersonWidget.init = () => {
    let person = People.getSelected();
    $('#person-widget .height').text(Height.displayString(person.height));
    $('#person-widget .height-heels p').text(Height.displayString(person.heightPlusHeels));
    $('#person-widget .weight p').text(Weight.displayString(person.calculateWeightKg()));

    if (person.height === person.heightPlusHeels) {
        $('#person-widget .height-heels').addClass('gone');
    }
    else {
        $('#person-widget .height-heels').removeClass('gone');
    }

    let fixed = person.heelsCm != null;
    let heelsString = fixed ? Height.displayStringImperialHeels(person.heelsCm) : `${(person.heelsPercent * 100 ?? 0).toFixed(1)}%`;
    $('#person-widget .heels p').text(heelsString);
};

PersonWidget.graphic = () => {
    Widget.changeWidget(EditGraphicWidget);
};
PersonWidget.editHeight = () => {
    Widget.changeWidget(EditHeightWidget);
};
PersonWidget.editHeels = () => {
    Widget.changeWidget(EditHeelsWidget);
};
PersonWidget.more = () => {
    Widget.changeWidget(PersonMenuWidget);
};
PersonWidget.close = () => {
    People.select(null);
};
