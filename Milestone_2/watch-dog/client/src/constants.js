const crimeTypeOptions = [
  {
    label: 'crimes',
    value: 'crimes',
  },
  {
    label: 'traffic incidents',
    value: 'traffic incidents',
  },
];

const crimeIndicatorOptions = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: 'assault',
    value: 'assault',
  },
  {
    label: 'auto theft',
    value: 'auto theft',
  },
  {
    label: 'break & enter',
    value: 'break & enter',
  },
  {
    label: 'homicide',
    value: 'homicide',
  },
  {
    label: 'robbery',
    value: 'robbery',
  },
  {
    label: 'theft over',
    value: 'theft over',
  },
];

const dateTypeOptions = ['year', 'month'];
const dateNumOptions = new Map ();
dateNumOptions['year'] = [
  {
    value: 2014,
    label: '2014',
  },
  {
    value: 2015,
    label: '2015',
  },
  {
    value: 2016,
    label: '2016',
  },
  {
    value: 2017,
    label: '2017',
  },
  {
    value: 2018,
    label: '2018',
  },
  {
    value: 2019,
    label: '2019',
  },
];
dateNumOptions['month'] = [
  {
    value: 1,
    label: 'Jan',
  },
  {
    value: 2,
    label: 'Feb',
  },
  {
    value: 3,
    label: 'Mar',
  },
  {
    value: 4,
    label: 'Apr',
  },
  {
    value: 5,
    label: 'May',
  },
  {
    value: 6,
    label: 'Jun',
  },
  {
    value: 7,
    label: 'Jul',
  },
  {
    value: 8,
    label: 'Aug',
  },
  {
    value: 9,
    label: 'Sep',
  },
  {
    value: 10,
    label: 'Oct',
  },
  {
    value: 11,
    label: 'Nov',
  },
  {
    value: 12,
    label: 'Dec',
  },
];
// dateNumOptions['week'] = [1, 2, 3, 4, 5, 6];
// dateNumOptions['day'] = [1, 2, 7, 30, 60, 180, 365];

export {
  crimeTypeOptions,
  crimeIndicatorOptions,
  dateTypeOptions,
  dateNumOptions,
};
