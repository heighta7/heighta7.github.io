const Sprites = {};
Sprites.dict = {};
Sprites.container = null;

Sprites.initContainer = () => {
    Sprites.container = new PIXI.Container();
    Sprites.container.sortableChildren = true;
    return Sprites.container;
};
Sprites.update = () => {
    let anyChanges = false;
    for (let person of People.list) {
        let sprite = Sprites.dict[person.id];

        if (person.dirty) {
            anyChanges = true;
            Sprites.container.removeChild(sprite);
            Sprites.create(person);
        }
    }
    return anyChanges;
};
Sprites.create = (person) => {
    let box = Sprites.getPersonBox(person);
    
    let sprite = new PIXI.Container();
    sprite.x = box.x;
    sprite.y = box.y;
    sprite.zIndex = -person.height;
    sprite.width = box.width;
    sprite.height = box.height;
    sprite.interactive = true;
    sprite.person = person;
    
    if (person.shouldDoHeels && box.heightNoHeels !== box.height) {
        let heelsPositions = Graphics.heelsPositionsForPerson(person);
        let heelsGraphic = new PIXI.Graphics();
        heelsGraphic.beginFill(0xD0D0D0);
        heelsPositions.forEach(x => {
            heelsGraphic.drawRect(x.x1 * box.width, box.heightNoHeels * 0.99, (x.x2 - x.x1) * box.width, box.height - box.heightNoHeels * 0.99);
        });
        sprite.addChild(heelsGraphic);
    }

    let texture = Graphics.forPerson(person);
    let graphic = new PIXI.Sprite(texture);
    graphic.width = box.width;
    graphic.height = box.heightNoHeels;
    sprite.addChild(graphic);

    function onDragStart(event) { SpriteDragEvents.start(this, event); }
    function onDragEnd() { SpriteDragEvents.end(this); }
    function onDragMove() { SpriteDragEvents.move(this); }
    sprite.on('pointerdown', onDragStart);
    sprite.on('pointerup', onDragEnd);
    sprite.on('pointerupoutside', onDragEnd);
    sprite.on('pointermove', onDragMove);
    
    Sprites.dict[person.id] = sprite;
    Sprites.container.addChild(sprite);

    person.markClean();
};
Sprites.getPersonBox = (person) => {
    let texture = Graphics.forPerson(person);
    let width = texture.width * (person.height / texture.height);

    return {
        x: person.x - width * 0.5,
        y: -person.y - person.heightPlusHeels,
        width: width,
        height: person.heightPlusHeels,
        heightNoHeels: person.height,
    };
};
Sprites.applyPosition = (person, sprite) => {
    let box = Sprites.getPersonBox(person);
    person.x = sprite.x + box.width / 2;
    person.y = -sprite.y - person.heightPlusHeels;
};
