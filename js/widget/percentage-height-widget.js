const PercentageHeightWidget = {};
PercentageHeightWidget.name = "percentage-height-widget";
PercentageHeightWidget.selectedHeight = 0;
PercentageHeightWidget.selectedPercent = 0;

$(() => {
  $("#percentage-height-widget .close").on("click", () => {
    PercentageHeightWidget.close();
  });
  $("#percentage-height-widget .apply").on("click", () => {
    PercentageHeightWidget.apply();
  });
  $("#percentage-height-widget .height-feet .picker-up").on("click", () => {
    PercentageHeightWidget.heightButton(Height.FOOT);
  });
  $("#percentage-height-widget .height-feet .picker-down").on("click", () => {
    PercentageHeightWidget.heightButton(-Height.FOOT);
  });
  $("#percentage-height-widget .height-inches .picker-up").on("click", () => {
    PercentageHeightWidget.heightButton(Height.INCH);
  });
  $("#percentage-height-widget .height-inches .picker-down").on("click", () => {
    PercentageHeightWidget.heightButton(-Height.INCH);
  });
  $("#percentage-height-widget .percent-tens .picker-up").on("click", () => {
    PercentageHeightWidget.percentButton(10);
  });
  $("#percentage-height-widget .percent-tens .picker-down").on("click", () => {
    PercentageHeightWidget.percentButton(-10);
  });
  $("#percentage-height-widget .percent-units .picker-up").on("click", () => {
    PercentageHeightWidget.percentButton(1);
  });
  $("#percentage-height-widget .percent-units .picker-down").on("click", () => {
    PercentageHeightWidget.percentButton(-1);
  });
});

PercentageHeightWidget.init = () => {
  PercentageHeightWidget.selectedHeight = People.getSelected().height;
  PercentageHeightWidget.selectedPercent = 0;
  PercentageHeightWidget.updateData();
};
PercentageHeightWidget.close = () => {
  Widget.changeWidget(HeightMenuWidget);
};
PercentageHeightWidget.apply = () => {
  let person = People.getSelected();
  person.height = PercentageHeightWidget.calculateNewHeight();
  Widget.changeWidget(PersonWidget);
};
PercentageHeightWidget.updateData = () => {
  let height = PercentageHeightWidget.selectedHeight;
  let imperial = Height.asImperial(height);
  $("#percentage-height-widget .height-feet p").text(
    `${imperial.feet.toFixed()}'`
  );
  $("#percentage-height-widget .height-inches p").text(
    `${(imperial.inches + imperial.inchTenths * 0.1).toFixed(1)}"`
  );

  let percent = PercentageHeightWidget.selectedPercent;
  let percentAbs = Math.abs(percent);
  let percentTens = Math.floor(percentAbs / 10);
  let percentUnits = percentAbs % 10;
  $("#percentage-height-widget .percent-tens p").text(
    `${percentTens.toFixed()}`
  );
  $("#percentage-height-widget .percent-units p").text(
    `${percentUnits.toFixed()}%`
  );
  $("#percentage-height-widget .phrase").text(percent >= 0 ? "+" : "–");

  let newHeight = PercentageHeightWidget.calculateNewHeight();
  $("#percentage-height-widget .formula-out p").text(
    `${Height.displayString(newHeight)}`
  );
};
PercentageHeightWidget.calculateNewHeight = () => {
  let height = PercentageHeightWidget.selectedHeight;
  let percent = PercentageHeightWidget.selectedPercent;
  let newHeight = height * (1 + percent * 0.01);
  return Math.max(0, newHeight);
};
PercentageHeightWidget.heightButton = (cm) => {
  let height = PercentageHeightWidget.selectedHeight;
  PercentageHeightWidget.selectedHeight = Height.toNearestInch(height + cm);
  PercentageHeightWidget.updateData();
};
PercentageHeightWidget.percentButton = (percent) => {
  let currPercent = PercentageHeightWidget.selectedPercent;
  PercentageHeightWidget.selectedPercent = Math.round(currPercent + percent);
  PercentageHeightWidget.updateData();
};
