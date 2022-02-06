const PersonMenuWidget = {};
PersonMenuWidget.name = 'person-menu-widget';

$(() => {
    $('#person-menu-widget .close').on('click', () => { PersonMenuWidget.close(); });
    $('#person-menu-widget .details').on('click', () => { PersonMenuWidget.details(); });
    $('#person-menu-widget .edit-weight').on('click', () => { PersonMenuWidget.editWeight(); });
    $('#person-menu-widget .compare').on('click', () => {  });
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
PersonMenuWidget.details = () => {
    Widget.changeWidget(DetailsWidget);
};
PersonMenuWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};