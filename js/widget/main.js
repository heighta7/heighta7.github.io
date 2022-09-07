const MainWidget = {};
MainWidget.name = 'main-widget';

$(() => {
    $('#main-widget .add-person').on('click', () => { MainWidget.addPerson(); });
    $('#main-widget .reset').on('click', () => { MainWidget.clearAll(); });
    $('#main-widget .heels-toggle').on('click', () => { MainWidget.toggleHeels(); });
});

MainWidget.init = () => {
    MainWidget.updateData();
};
MainWidget.updateData = () => {
    if (People.isGlobalHeelsEnabled()) {
        $('#main-widget .heels-toggle .toggle-on').removeClass('gone');
        $('#main-widget .heels-toggle .toggle-off').addClass('gone');
    }
    else {
        $('#main-widget .heels-toggle .toggle-on').addClass('gone');
        $('#main-widget .heels-toggle .toggle-off').removeClass('gone');
    }
};

MainWidget.addPerson = () => {
    let pos = (Viewport.get.left + Viewport.get.right) / 2;
    let person = new Person(pos);
    People.add(person);
};
MainWidget.clearAll = () => {
    People.reset();
};
MainWidget.toggleHeels = () => {
    People.setGlobalHeelsEnabled(!People.isGlobalHeelsEnabled());
    MainWidget.updateData();
};
