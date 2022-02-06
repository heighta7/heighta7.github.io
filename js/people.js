const People = {};
People.list = [];
People.selected = null;
People._globalHeelsEnabled = true;

People.getSelected = () => {
    if (People.selected == null) { return null; }
    return People.list.find(x => x.id == People.selected);
};

People.add = (person, centerInViewport = true, select = true) => {
    People.list.push(person);
    Sprites.create(person);

    if (select) {
        People.select(person);
    }
    if (centerInViewport) {
        Viewport.centerPerson(person);
    }
};
People.remove = (person) => {
    Sprites.container.removeChild(Sprites.dict[person.id]);
    Sprites.dict[person.id] = null;
    People.list.splice(People.list.indexOf(person), 1);
    if (People.selected === person.id) {
        People.select(null);
    }
    Persistance.markDirty();
};
People.reset = () => {
    // Clear cookies first just in case they're corrupted and nothing else works!
    Persistance.delete();
    
    for (let person of People.list) {
        Sprites.container.removeChild(Sprites.dict[person.id]);
    }
    Sprites.dict = {};
    People.list = [];
    People._globalHeelsEnabled = true;
    People.selected = null;
    let person = new Person();
    People.add(person);
    Persistance.markDirty();
};
People.select = (person) => {
    let newSelection = People.selected != person?.id;
    People.selected = person?.id;
    if (newSelection) {
        Viewport.updateHighlight(person);
        if (People.selected == null) { Widget.changeWidget(MainWidget); }
        else { Widget.changeWidget(PersonWidget); }
    }
};
People.isGlobalHeelsEnabled = () => {
    return People._globalHeelsEnabled;
};
People.setGlobalHeelsEnabled = (val) => {
    People.list.forEach(x => x.markDirty());
    People._globalHeelsEnabled = val;
};
