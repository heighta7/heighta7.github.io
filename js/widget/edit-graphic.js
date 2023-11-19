const EditGraphicWidget = {};
EditGraphicWidget.name = 'edit-graphic-widget';

$(() => {
    $('#edit-graphic-widget .close').on('click', () => { EditGraphicWidget.close(); });

    Graphics.list.forEach(x => {
        let src = Graphics.getSrc(x);
        $('#edit-graphic-widget .options').append(`<button class="option"><img src="${src}"></img></button>`);
        $('#edit-graphic-widget .option:last-child').on('click', () => { EditGraphicWidget.chooseGraphic(x); });
    });
});

EditGraphicWidget.init = () => {
    EditGraphicWidget.updateData();
};
EditGraphicWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};
EditGraphicWidget.updateData = () => {

};
EditGraphicWidget.chooseGraphic = (graphic) => {
    People.getSelected().graphic = graphic;
    People.getSelected().graphicFlipH = false;
    EditGraphicWidget.updateData();
};
