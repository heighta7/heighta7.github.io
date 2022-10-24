const AverageHeightsWidget = {};
AverageHeightsWidget.name = 'average-heights-widget';
AverageHeightsWidget.genders = [
    { name: "a man", nameYoung: "a boy", value: Averages.MALE },
    { name: "a woman", nameYoung: "a girl", value: Averages.FEMALE }
];
AverageHeightsWidget.ages = [
    { name: "aged 5 years old", value: 5, isYoung: true },
    { name: "aged 6 years old", value: 6, isYoung: true },
    { name: "aged 7 years old", value: 7, isYoung: true },
    { name: "aged 8 years old", value: 8, isYoung: true },
    { name: "aged 9 years old", value: 9, isYoung: true },
    { name: "aged 10 years old", value: 10, isYoung: true },
    { name: "aged 11 years old", value: 11, isYoung: true },
    { name: "aged 12 years old", value: 12, isYoung: true },
    { name: "aged 13 years old", value: 13, isYoung: true },
    { name: "aged 14 years old", value: 14, isYoung: true },
    { name: "aged 15 years old", value: 15, isYoung: true },
    { name: "aged 16 years old", value: 16, isYoung: true },
    { name: "aged 17 years old", value: 17, isYoung: true },
    { name: "aged 18 years old", value: 18, isYoung: true },
    { name: "of adult age", value: Averages.ADULT, isYoung: false }
];
AverageHeightsWidget.percentiles = [
    { name: "in the 0.00001th percentile", value: 0.0000001 },
    { name: "in the 0.0001th percentile", value: 0.000001 },
    { name: "in the 0.001th percentile", value: 0.00001 },
    { name: "in the 0.01th percentile", value: 0.0001 },
    { name: "in the 0.1th percentile", value: 0.001 },
    { name: "in the 1st percentile", value: 0.01 },
    { name: "in the 5th percentile", value: 0.05 },
    { name: "in the 10th percentile", value: 0.1 },
    { name: "in the 20th percentile", value: 0.2 },
    { name: "in the 30th percentile", value: 0.3 },
    { name: "of average height", value: 0.5 },
    { name: "in the 70th percentile", value: 0.7 },
    { name: "in the 80th percentile", value: 0.8 },
    { name: "in the 90th percentile", value: 0.9 },
    { name: "in the 95th percentile", value: 0.95 },
    { name: "in the 99th percentile", value: 0.99 },
    { name: "in the 99.9th percentile", value: 0.999 },
    { name: "in the 99.99th percentile", value: 0.9999 },
    { name: "in the 99.999th percentile", value: 0.99999 },
    { name: "in the 99.9999th percentile", value: 0.999999 },
    { name: "in the 99.99999th percentile", value: 0.9999999 },
];
AverageHeightsWidget.defaultGender = 0;
AverageHeightsWidget.defaultAge = 14;
AverageHeightsWidget.defaultPercentile = 8;
AverageHeightsWidget.selectedGender = AverageHeightsWidget.defaultGender;
AverageHeightsWidget.selectedAge = AverageHeightsWidget.defaultAge;
AverageHeightsWidget.selectedPercentile = AverageHeightsWidget.defaultPercentile;

$(() => {
    $('#average-heights-widget .close').on('click', () => { AverageHeightsWidget.close(); });
    $('#average-heights-widget .apply').on('click', () => { AverageHeightsWidget.apply(); });
    $('#average-heights-widget .gender .carousel-left').on('click', () => { AverageHeightsWidget.prevGender(); });
    $('#average-heights-widget .gender .carousel-right').on('click', () => { AverageHeightsWidget.nextGender(); });
    $('#average-heights-widget .age .carousel-left').on('click', () => { AverageHeightsWidget.prevAge(); });
    $('#average-heights-widget .age .carousel-right').on('click', () => { AverageHeightsWidget.nextAge(); });
    $('#average-heights-widget .percentile .carousel-left').on('click', () => { AverageHeightsWidget.prevPercentile(); });
    $('#average-heights-widget .percentile .carousel-right').on('click', () => { AverageHeightsWidget.nextPercentile(); });

});

AverageHeightsWidget.init = () => {
    AverageHeightsWidget.selectedGender = AverageHeightsWidget.defaultGender;
    AverageHeightsWidget.selectedAge = AverageHeightsWidget.defaultAge;
    AverageHeightsWidget.selectedPercentile = AverageHeightsWidget.defaultPercentile;
    AverageHeightsWidget.updateData();
};
AverageHeightsWidget.close = () => {
    Widget.changeWidget(EditHeightWidget);
};
AverageHeightsWidget.apply = () => {
    let person = People.getSelected();
    person.height = Math.max(0, AverageHeightsWidget.calcHeight());
    Widget.changeWidget(PersonWidget);
};
AverageHeightsWidget.updateData = () => {
    let gender = AverageHeightsWidget.genders[AverageHeightsWidget.selectedGender];
    let age = AverageHeightsWidget.ages[AverageHeightsWidget.selectedAge];
    let percentile = AverageHeightsWidget.percentiles[AverageHeightsWidget.selectedPercentile];
    
    $('#average-heights-widget .gender p').text(age.isYoung ? gender.nameYoung : gender.name);
    $('#average-heights-widget .age p').text(age.name);
    $('#average-heights-widget .percentile p').text(percentile.name);
    
    let height = AverageHeightsWidget.calcHeight();
    $('#average-heights-widget .result-height').text(Height.displayString(height));
};
AverageHeightsWidget.calcHeight = () => {
    let gender = AverageHeightsWidget.genders[AverageHeightsWidget.selectedGender];
    let age = AverageHeightsWidget.ages[AverageHeightsWidget.selectedAge];
    let percentile = AverageHeightsWidget.percentiles[AverageHeightsWidget.selectedPercentile];
    return Averages.getHeight(gender.value, age.value, percentile.value);
};
AverageHeightsWidget.nextGender = () => {
    AverageHeightsWidget.selectedGender++;
    if (AverageHeightsWidget.selectedGender >= AverageHeightsWidget.genders.length) {
        AverageHeightsWidget.selectedGender = 0;
    }
    AverageHeightsWidget.updateData();
};
AverageHeightsWidget.prevGender = () => {
    AverageHeightsWidget.selectedGender--;
    if (AverageHeightsWidget.selectedGender < 0) {
        AverageHeightsWidget.selectedGender = AverageHeightsWidget.genders.length - 1;
    }
    AverageHeightsWidget.updateData();
};
AverageHeightsWidget.nextAge = () => {
    AverageHeightsWidget.selectedAge++;
    if (AverageHeightsWidget.selectedAge >= AverageHeightsWidget.ages.length) {
        AverageHeightsWidget.selectedAge = 0;
    }
    AverageHeightsWidget.updateData();
};
AverageHeightsWidget.prevAge = () => {
    AverageHeightsWidget.selectedAge--;
    if (AverageHeightsWidget.selectedAge < 0) {
        AverageHeightsWidget.selectedAge = AverageHeightsWidget.ages.length - 1;
    }
    AverageHeightsWidget.updateData();
};
AverageHeightsWidget.nextPercentile = () => {
    AverageHeightsWidget.selectedPercentile++;
    if (AverageHeightsWidget.selectedPercentile >= AverageHeightsWidget.percentiles.length) {
        AverageHeightsWidget.selectedPercentile = 0;
    }
    AverageHeightsWidget.updateData();
};
AverageHeightsWidget.prevPercentile = () => {
    AverageHeightsWidget.selectedPercentile--;
    if (AverageHeightsWidget.selectedPercentile < 0) {
        AverageHeightsWidget.selectedPercentile = AverageHeightsWidget.percentiles.length - 1;
    }
    AverageHeightsWidget.updateData();
};
