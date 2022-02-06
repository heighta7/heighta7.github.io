const ViewportEvents = {};
ViewportEvents.clicked = (coords) => {
    let heightSorted = People.list.slice().sort((a, b) => a.height - b.height);
    for (let person of heightSorted) {
        let box = Sprites.getPersonBox(person);
        let margin = 5 / Viewport.get.scaled;
        if (coords.x >= box.x - margin && 
            coords.x <= box.x + box.width + margin * 2 && 
            coords.y >= box.y - margin && 
            coords.y <= box.y + box.height + margin * 2) {

            People.select(person);
            return;
        }
    }
    People.select(null);
};

const SpriteDragEvents = {};
SpriteDragEvents.start = (sprite, event) => {
    sprite.data = event.data;
    sprite.alpha = 0.5;
    sprite.dragging = 'maybe';

    let downPos = event.data.getLocalPosition(sprite.parent);
    sprite.draggingOffsetX = sprite.x - downPos.x;
    sprite.draggingOffsetY = sprite.y - downPos.y;

    Viewport.get.plugins.pause('drag');
};
SpriteDragEvents.end = (sprite) => {
    if (sprite.dragging === 'yeah') {
        Sprites.applyPosition(sprite.person, sprite);
    }
    sprite.alpha = 1;
    sprite.dragging = 'nah';
    sprite.data = null;

    Viewport.get.plugins.resume('drag');
};
SpriteDragEvents.move = (sprite) => {
    if (sprite.dragging === 'maybe') {
        let pointerPos = sprite.data.getLocalPosition(sprite.parent);
        let newX = pointerPos.x + sprite.draggingOffsetX;
        let newY = pointerPos.y + sprite.draggingOffsetY;

        let xDiff = sprite.x - newX;
        let yDiff = sprite.y - newY;
        let dist2 = xDiff * xDiff + yDiff * yDiff;
        if (dist2 > 100 / Viewport.get.scaled) {
            sprite.dragging = 'yeah';
        }
    }
    if (sprite.dragging === 'yeah') {
        let pointerPos = sprite.data.getLocalPosition(sprite.parent);
        let newX = pointerPos.x + sprite.draggingOffsetX;
        let newY = pointerPos.y + sprite.draggingOffsetY;

        if (Math.abs(-sprite.person.heightPlusHeels - newY) < 10 / Viewport.get.scaled) { newY = -sprite.person.heightPlusHeels; }
        sprite.x = newX;
        sprite.y = newY;
    }
};
