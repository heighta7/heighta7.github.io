const DetailsWidget = {};
DetailsWidget.name = 'details-widget';

$(() => {
    $('#details-widget .close').on('click', () => { DetailsWidget.close(); });
});

DetailsWidget.init = () => {
    const HEIGHT = { 
        avg: 'Average height', 
        pos: 'Taller than', 
        neg: 'Shorter than', 
        posDiv: 'Only matched by', 
        negDiv: 'Only taller than' 
    };
    const MALE = { plural: 'men', singular: 'man' };
    const FEMALE = { plural: 'women', singular: 'woman' };
    const EITHER = { plural: 'people', singular: 'person' };

    let person = People.getSelected();

    $('#details-widget .height p').text(Height.displayString(person.height));
    let percMen = Averages.getMalePercentile(Averages.ADULT, person.height);
    let percMenStr = DetailsWidget.getPercStr(percMen, HEIGHT, MALE);
    $('#details-widget .percentile-men p').text(percMenStr);
    let percWomen = Averages.getFemalePercentile(Averages.ADULT, person.height);
    let percWomenStr = DetailsWidget.getPercStr(percWomen, HEIGHT, FEMALE);
    $('#details-widget .percentile-women p').text(percWomenStr);
    let percTotal = (percMen + percWomen) / 2;
    let percTotalStr = DetailsWidget.getPercStr(percTotal, HEIGHT, EITHER);
    $('#details-widget .percentile-total p').text(percTotalStr);

    if (person.height != person.heightPlusHeels) {
        $('#details-widget .height-heels p').text(Height.displayString(person.heightPlusHeels));
        let percHeelsMen = Averages.getMalePercentile(Averages.ADULT, person.heightPlusHeels);
        let percHeelsMenStr = DetailsWidget.getPercStr(percHeelsMen, HEIGHT, MALE);
        $('#details-widget .percentile-men-heels p').text(percHeelsMenStr);
        let percHeelsWomen = Averages.getFemalePercentile(Averages.ADULT, person.heightPlusHeels);
        let percHeelsWomenStr = DetailsWidget.getPercStr(percHeelsWomen, HEIGHT, FEMALE);
        $('#details-widget .percentile-women-heels p').text(percHeelsWomenStr);
        let percHeelsTotal = (percHeelsMen + percHeelsWomen) / 2;
        let percHeelsTotalStr = DetailsWidget.getPercStr(percHeelsTotal, HEIGHT, EITHER);
        $('#details-widget .percentile-total-heels p').text(percHeelsTotalStr);
        $('#details-widget .section-height-heels').removeClass('gone');
    }
    else {
        $('#details-widget .section-height-heels').addClass('gone');
    }
};
DetailsWidget.getPercStr = (perc, attr, gender) => {
    if (perc >= 0.5) { return DetailsWidget.getPercStrHalf(perc, attr.pos, attr.posDiv, attr.avg, gender); }
    else { return DetailsWidget.getPercStrHalf(1 - perc, attr.neg, attr.negDiv, attr.avg, gender); }
};
DetailsWidget.getPercStrHalf = (_perc, ss, ssDiv, ssAvg, gender) => {
    let perc = _perc * 100;
    let decimals = perc.toString().matchAll(/[^.9]/g).next().value.index - 2;
    if (perc > 99.99999) { return `${ss} basically all ${gender.plural} (${perc.toFixed(decimals)}th percentile)`; }
    else if (perc > 99.95) { return `${ssDiv} 1 in ${(1 / (1 - _perc)).toFixed()} ${gender.plural} (${perc.toFixed(decimals)}th percentile)`; }
    else if (perc > 98) { return `${ss} ${perc.toFixed(2)}% of ${gender.plural}`; }
    else if (perc > 60) { return `${ss} ${perc.toFixed()}% of ${gender.plural}`; }
    else { return `${ssAvg} for a ${gender.singular}`; }
};
DetailsWidget.close = () => {
    Widget.changeWidget(PersonWidget);
};
