class Person {
    constructor(startX = 0) {
        this._id = (Math.random() * 10000000).toFixed();
        this._x = startX;
        this._y = 0;
        this._height = Height.fromImperial(5, 6);
        this._graphic = 'r1';
        this._heelsPercent = 0;
        this._heelsCm = null;
        this._heelsEnabled = true;
        this._weightRatioWeight = 60;
        this._weightRatioHeight = Height.fromImperial(5, 9);
        this._dirty = false;
    }

    get id() { return this._id; }
    get dirty() { return this._dirty; }
    markClean() { this._dirty = false; }
    markDirty() { this._dirty = true; }

    get x() { return this._x; }
    set x(val) { this._x = val; this._dirty = true; }

    get y() { return this._y; }
    set y(val) { this._y = val; this._dirty = true; }

    get height() { return this._height; }
    get heightPlusHeels() {
        if (!this.shouldDoHeels) { return this.height; }
        return this.height + this.calculateHeelsCm();
    }
    set height(val) { this._height = val; this._dirty = true; }

    get graphic() { return this._graphic; }
    set graphic(val) { this._graphic = val; this._dirty = true; }

    get heelsPercent() { return this._heelsPercent; }
    get heelsCm() { return this._heelsCm; }

    get heelsEnabled() { return this._heelsEnabled; }
    get shouldDoHeels() { return this.heelsEnabled && People.isGlobalHeelsEnabled(); }
    set heelsEnabled(val) { this._heelsEnabled = val; this._dirty = true; }

    get weightRatioWeight() { return this._weightRatioWeight; }
    set weightRatioWeight(val) { this._weightRatioWeight = val; this._dirty = true; }
    get weightRatioHeight() { return this._weightRatioHeight; }
    set weightRatioHeight(val) { this._weightRatioHeight = val; this._dirty = true; }

    setHeelsPercent(percent) {
        this._heelsPercent = percent;
        this._heelsCm = null;
        this._dirty = true;
    }
    setHeelsCm(cm) {
        this._heelsPercent = null;
        this._heelsCm = cm;
        this._dirty = true;
    }
    calculateHeelsCm() {
        if (this.heelsCm != null) { return this.heelsCm; }
        if (this.heelsPercent != null) { return this.height * this.heelsPercent; }
        return 0;
    }

    calculateWeightKg() {
        let ratio = this.height / this.weightRatioHeight;
        let ratioCubed = ratio * ratio * ratio;
        return ratioCubed * this.weightRatioWeight;
    }

    static fromJson(json) {
        let person = new Person();
        person._id = json._id;
        person._x = json._x;
        person._y = json._y;
        person._height = json._height;
        person._graphic = json._graphic;
        person._heelsCm = json._heelsCm;
        person._heelsPercent = json._heelsPercent;
        person._heelsEnabled = json._heelsEnabled;
        person._weightRatioWeight = json._weightRatioWeight;
        person._weightRatioHeight = json._weightRatioHeight;
        return person;
    }
}
