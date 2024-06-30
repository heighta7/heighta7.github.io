const HeightMenuWidget = {};
HeightMenuWidget.name = "height-menu-widget";

$(() => {
  $("#height-menu-widget .close").on("click", () => {
    HeightMenuWidget.close();
  });
  $("#height-menu-widget .averages").on("click", () => {
    HeightMenuWidget.averages();
  });
  $("#height-menu-widget .percentages").on("click", () => {
    HeightMenuWidget.percentages();
  });
});

HeightMenuWidget.init = () => {};
HeightMenuWidget.averages = () => {
  Widget.changeWidget(AverageHeightsWidget);
};
HeightMenuWidget.percentages = () => {
  Widget.changeWidget(PercentageHeightWidget);
};
HeightMenuWidget.close = () => {
  Widget.changeWidget(EditHeightWidget);
};
