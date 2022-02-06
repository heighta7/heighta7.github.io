const Graphics = {};
Graphics.list = ['r1', 'r2', 'm1', 'f1_md', 'f1_lg', 'f1_xl'];
Graphics.getSrc = (graphic) => {
    if (graphic === 'r1') { return 'img/r1.png'; }
    if (graphic === 'r2') { return 'img/r2.png'; }
    if (graphic === 'm1') { return 'img/m1.png'; }
    if (graphic === 'f1_md') { return 'img/f1-md.png'; }
    if (graphic === 'f1_lg') { return 'img/f1-lg.png'; }
    if (graphic === 'f1_xl') { return 'img/f1-xl.png'; }
};
Graphics.get = (graphic) => {
    return pixi.loader.resources[graphic].texture;
};
Graphics.forPerson = (person) => {
    return Graphics.get(person.graphic);
};
Graphics.addToLoader = (loader) => {
    Graphics.list.forEach(x => loader.add(x, Graphics.getSrc(x)));
};
Graphics.getHeelsPositions = (graphic) => {
    if (graphic === 'f1_md') { return [{ x1: 0.28, x2: 0.48 }, { x1: 0.52, x2: 0.72 }]; }
    if (graphic === 'f1_lg') { return [{ x1: 0.28, x2: 0.48 }, { x1: 0.52, x2: 0.72 }]; }
    if (graphic === 'f1_xl') { return [{ x1: 0.28, x2: 0.48 }, { x1: 0.52, x2: 0.72 }]; }
    if (graphic === 'm1') { return [{ x1: 0.25, x2: 0.45 }, { x1: 0.55, x2: 0.75 }]; }

    return [{ x1: 0.25, x2: 0.45 }, { x1: 0.55, x2: 0.75 }];
};
Graphics.heelsPositionsForPerson = (person) => {
    return Graphics.getHeelsPositions(person.graphic);
};