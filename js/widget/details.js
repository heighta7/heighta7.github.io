const DetailsWidget = {};
DetailsWidget.name = 'details-widget';

$(() => {
    $('#details-widget .close').on('click', () => { DetailsWidget.close(); });
});

DetailsWidget.init = () => {
    let person = People.getSelected();

    let isWearingHeels = person.height != person.heightPlusHeels;
    let flatFeetSuffix = isWearingHeels ? ' (without heels)' : '';

    let percentileMen = Averages.getMalePercentile(Averages.ADULT, person.height) * 100;
    let percentileMenStr = `Average height for a man${flatFeetSuffix}`;
    if (percentileMen >= 50.1) { percentileMenStr = `Taller than ${DetailsWidget.getPercentString(percentileMen)} men${flatFeetSuffix}`; }
    if (percentileMen <= 49.9) { percentileMenStr = `Shorter than ${DetailsWidget.getPercentString(100 - percentileMen)} men${flatFeetSuffix}`; }
    $('#details-widget .percentile-men p').text(percentileMenStr);
    
    let percentileWomen = Averages.getFemalePercentile(Averages.ADULT, person.height) * 100;
    let percentileWomenStr = `Average height for a woman${flatFeetSuffix}`;
    if (percentileWomen >= 50.1) { percentileWomenStr = `Taller than ${DetailsWidget.getPercentString(percentileWomen)} women${flatFeetSuffix}`; }
    if (percentileWomen <= 49.9) { percentileWomenStr = `Shorter than ${DetailsWidget.getPercentString(100 - percentileWomen)} women${flatFeetSuffix}`; }
    $('#details-widget .percentile-women p').text(percentileWomenStr);

    let percentileTotal = (percentileMen + percentileWomen) / 2;
    let percentileTotalStr = `Average height for a person${flatFeetSuffix}`;
    if (percentileTotal >= 50.1) { percentileTotalStr = `Taller than ${DetailsWidget.getPercentString(percentileTotal)} people${flatFeetSuffix}`; }
    if (percentileTotal <= 49.9) { percentileTotalStr = `Shorter than ${DetailsWidget.getPercentString(100 - percentileTotal)} people${flatFeetSuffix}`; }
    $('#details-widget .percentile-total p').text(percentileTotalStr);

    if (isWearingHeels) {
        let percentileHeelsMen = Averages.getMalePercentile(Averages.ADULT, person.heightPlusHeels) * 100;
        let percentileHeelsMenStr = 'Average height for a man (in heels)';
        if (percentileHeelsMen >= 50.1) { percentileHeelsMenStr = `Taller than ${DetailsWidget.getPercentString(percentileHeelsMen)} men (in heels)`; }
        if (percentileHeelsMen <= 49.9) { percentileHeelsMenStr = `Shorter than ${DetailsWidget.getPercentString(100 - percentileHeelsMen)} men (in heels)`; }
        $('#details-widget .percentile-men-heels p').text(percentileHeelsMenStr);
        
        let percentileHeelsWomen = Averages.getFemalePercentile(Averages.ADULT, person.heightPlusHeels) * 100;
        let percentileHeelsWomenStr = 'Average height for a woman (in heels)';
        if (percentileHeelsWomen >= 50.1) { percentileHeelsWomenStr = `Taller than ${DetailsWidget.getPercentString(percentileHeelsWomen)} women (in heels)`; }
        if (percentileHeelsWomen <= 49.9) { percentileHeelsWomenStr = `Shorter than ${DetailsWidget.getPercentString(100 - percentileHeelsWomen)} women (in heels)`; }
        $('#details-widget .percentile-women-heels p').text(percentileHeelsWomenStr);

        let percentileHeelsTotal = (percentileHeelsMen + percentileHeelsWomen) / 2;
        let percentileHeelsTotalStr = 'Average height for a person (in heels)';
        if (percentileHeelsTotal >= 50.1) { percentileHeelsTotalStr = `Taller than ${DetailsWidget.getPercentString(percentileHeelsTotal)} people (in heels)`; }
        if (percentileHeelsTotal <= 49.9) { percentileHeelsTotalStr = `Shorter than ${DetailsWidget.getPercentString(100 - percentileHeelsTotal)} people (in heels)`; }
        $('#details-widget .percentile-total-heels p').text(percentileHeelsTotalStr);

        $('#details-widget .percentile-men-heels').removeClass('gone');
        $('#details-widget .percentile-women-heels').removeClass('gone');
        $('#details-widget .percentile-total-heels').removeClass('gone');
    }
    else {
        $('#details-widget .percentile-men-heels').addClass('gone');
        $('#details-widget .percentile-women-heels').addClass('gone');
        $('#details-widget .percentile-total-heels').addClass('gone');
    }
};
DetailsWidget.getPercentString = (percentile) => {
    if (percentile >= 99.99999) {
        return 'basically all';
    }
    else if (percentile > 99.95) {
        let amount = 100 / (100 - percentile);
        return `1 in ${amount.toFixed()}`;
    }
    else if (percentile > 98) {
        return `${percentile.toFixed(2)}% of`;
    }
    else {
        return `${percentile.toFixed()}% of`;
    }
};
DetailsWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};