const Persistance = {};

Persistance.saveTimeout = null;

Persistance.markDirty = () => {
    if (Persistance.saveTimeout) { clearTimeout(Persistance.saveTimeout); }
    Persistance.saveTimeout = setTimeout(() => Persistance.save(), 1000);
};

Persistance.save = () => {
    localStorage.setItem('a7-people', JSON.stringify(People.list));
    let viewport = Viewport.get;
    let x = (viewport.left + viewport.right) / 2;
    let y = (viewport.top + viewport.bottom) / 2;
    localStorage.setItem('a7-viewport', JSON.stringify({ x: x, y: y, scale: viewport.scaled }));
    localStorage.setItem('a7-settings', JSON.stringify({ heels: People.isGlobalHeelsEnabled() }));
};

Persistance.delete = () => {
    localStorage.removeItem('a7-people');
    localStorage.removeItem('a7-viewport');
    localStorage.removeItem('a7-settings');
};

Persistance.load = (onFail) => {
    try {
        let cookie = localStorage.getItem('a7-people');
        if (cookie == null) { onFail(); return; }

        let peopleJson = JSON.parse(cookie);
        let people = peopleJson.map(x => Person.fromJson(x));
        people.forEach(x => People.add(x, false, false));

        let viewportJson = JSON.parse(localStorage.getItem('a7-viewport'));
        Viewport.get.moveCenter(viewportJson.x, viewportJson.y);
        Viewport.get.scaled = viewportJson.scale;

        let settingsJson = JSON.parse(localStorage.getItem('a7-settings'));
        People.setGlobalHeelsEnabled(settingsJson.heels);
    }
    catch {
        onFail();
    }
};
