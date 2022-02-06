const Viewport = {};
Viewport.get = null;
Viewport.ground = null;
Viewport.highlight = null;
Viewport.guideline = null;
Viewport.guidelineHeight = null;
Viewport.create = () => {
    let viewport = new pixi_viewport.Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: pixi.renderer.plugins.interaction
    });
    viewport.on('moved', () => { 
        Persistance.markDirty(); 
        Viewport.updateHighlight(); 
        Viewport.updateGuideline();
    });
    viewport.on('clicked', (event) => { ViewportEvents.clicked(event.world); });
    viewport.drag().pinch().wheel().decelerate({ friction: 0.90 });
    Viewport.get = viewport;

    Viewport.get.addChild(Viewport.createGround());
    Viewport.get.addChild(Viewport.createGuideline());
    Viewport.get.addChild(Sprites.initContainer());
    Viewport.get.addChild(Viewport.createHighlight());

    return viewport;
};
Viewport.createGround = () => {
    let ground = new PIXI.Graphics();
    ground.beginFill(0x181818);
    ground.drawRect(-20000, 0, 40000, 20000);
    Viewport.ground = ground;
    return ground;
};
Viewport.createGuideline = () => {
    Viewport.guidelineHeight = Height.fromImperial(6, 8);
    let guideline = new PIXI.Graphics();
    Viewport.guideline = guideline;
    return guideline;
};
Viewport.updateGuideline = () => {
    Viewport.guideline.clear();
    Viewport.guideline.lineStyle(2 / Viewport.get.scaled, 0x202020);
    Viewport.guideline.moveTo(-20000, -Viewport.guidelineHeight);
    Viewport.guideline.lineTo(20000, -Viewport.guidelineHeight);
};
Viewport.createHighlight = () => {
    let highlight = new PIXI.Graphics();
    Viewport.highlight = highlight;
    return highlight;
};
Viewport.updateHighlight = () => {
    let person = People.getSelected();
    Viewport.highlight.clear();
    if (person == null) { return; }
    let box = Sprites.getPersonBox(person);
    Viewport.highlight.lineStyle(2 / Viewport.get.scaled, 0xFFFF00);
    let margin = 5 / Viewport.get.scaled;
    Viewport.highlight.drawRect(box.x - margin, box.y - margin, box.width + margin * 2, box.height + margin * 2);
};
Viewport.centerPerson = (person) => {
    let box = Sprites.getPersonBox(person);
    Viewport.get.snapZoom({ 
        height: box.height * 2.5, 
        time: 100, 
        removeOnComplete: true, 
        removeOnInterrupt: true,
        forceStart: true 
    });
    Viewport.get.snap(
        box.x + box.width / 2, 
        box.y + box.height / 2, { 
            time: 100, 
            removeOnComplete: true, 
            removeOnInterrupt: true,
            forceStart: true 
    });
};
Viewport.resize = () => {
    Viewport.get.resize();
};

