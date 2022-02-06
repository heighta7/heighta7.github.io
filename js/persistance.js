const Persistance = {};

Persistance.saveTimeout = null;

Persistance.markDirty = () => {
    if (Persistance.saveTimeout) { clearTimeout(Persistance.saveTimeout); }
    Persistance.saveTimeout = setTimeout(() => Persistance.save(), 1000);
};

Persistance.save = () => {
    Cookies.set('people', JSON.stringify(People.list), { sameSite: 'lax' });
    let viewport = Viewport.get;
    Cookies.set('viewport', JSON.stringify({ x: viewport.x, y: viewport.y, scale: viewport.scaled }), { sameSite: 'lax' });
    Cookies.set('settings', JSON.stringify({ heels: People.isGlobalHeelsEnabled() }), { sameSite: 'lax' });
};

Persistance.delete = () => {
    Cookies.remove('people');
    Cookies.remove('viewport');
    Cookies.remove('settings');
};

Persistance.load = (onFail) => {
    try {
        let cookie = Cookies.get('people');
        if (cookie == null) { onFail(); return; }
    
        let peopleJson = JSON.parse(cookie);
        let people = peopleJson.map(x => Person.fromJson(x));
        people.forEach(x => People.add(x, false, false));
        
        let viewportJson = JSON.parse(Cookies.get('viewport'));
        Viewport.get.x = viewportJson.x;
        Viewport.get.y = viewportJson.y;
        Viewport.get.scaled = viewportJson.scale;
    
        let settingsJson = JSON.parse(Cookies.get('settings'));
        People.setGlobalHeelsEnabled(settingsJson.heels);
    }
    catch {
        onFail();
    }
};