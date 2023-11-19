const PersonMenuWidget = {};
PersonMenuWidget.name = 'person-menu-widget';

$(() => {
    $('#person-menu-widget .close').on('click', () => { PersonMenuWidget.close(); });
    $('#person-menu-widget .details').on('click', () => { PersonMenuWidget.details(); });
    $('#person-menu-widget .edit-weight').on('click', () => { PersonMenuWidget.editWeight(); });
    $('#person-menu-widget .flip-h').on('click', () => { PersonMenuWidget.flipH(); });
    $('#person-menu-widget .delete').on('click', () => { PersonMenuWidget.delete(); });
});

PersonMenuWidget.init = () => {

};
PersonMenuWidget.delete = () => {
    People.remove(People.getSelected());
};
PersonMenuWidget.editWeight = () => {
    Widget.changeWidget(EditWeightWidget);
};
PersonMenuWidget.flipH = () => {
    People.getSelected().graphicFlipH = !People.getSelected().graphicFlipH;
    Widget.changeWidget(PersonWidget);
};
PersonMenuWidget.details = () => {
    Widget.changeWidget(DetailsWidget);
};
PersonMenuWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};
