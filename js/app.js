let pixi;

$(() => {
    pixi = new PIXI.Application({ resizeTo: window });
    let font = new FontFaceObserver('Lato');
    font.load().then(() => load());
});

function load() {
    Graphics.addToLoader(pixi.loader);
    pixi.loader.load(() => { init(pixi); });
}

function init() {
    document.body.appendChild(pixi.view);
    
    pixi.stage.addChild(Viewport.create());
    window.onresize = () => { pixi.resize(); Viewport.resize(); };

    Persistance.load(() => People.reset());
    
    Widget.changeWidget(MainWidget);

    pixi.ticker.add(() => {
        let wasDirty = Sprites.update();
        if (wasDirty) { 
            Persistance.markDirty();
            Viewport.updateHighlight(); 
            Viewport.updateGuideline();
        }
    });
}

