const Widget = {};
Widget.current = null;

Widget.changeWidget = (widget) => {
    $('#widget-holder .widget').addClass('gone');
    $(`#widget-holder #${widget.name}`).removeClass('gone');
    widget.init();
    Widget.current = widget;
};
