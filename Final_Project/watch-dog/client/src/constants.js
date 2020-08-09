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
    label: 'break and enter',
    value: 'break and enter',
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
  {
    value: 2020,
    label: '2020',
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
dateNumOptions['week'] = [
  {
    value: 1,
    label: 'Sunday',
  },
  {
    value: 2,
    label: 'Monday',
  },
  {
    value: 3,
    label: 'Tuesday',
  },
  {
    value: 4,
    label: 'Wednesday',
  },
  {
    value: 5,
    label: 'Thursday',
  },
  {
    value: 6,
    label: 'Friday',
  },
  {
    value: 7,
    label: 'Saturday',
  },
];
dateNumOptions['hour'] = [
  {
    value: 0,
    label: '12:00am',
  },
  {
    value: 1,
    label: '01:00am',
  },
  {
    value: 2,
    label: '02:00am',
  },
  {
    value: 3,
    label: '03:00am',
  },
  {
    value: 4,
    label: '04:00am',
  },
  {
    value: 5,
    label: '05:00am',
  },
  {
    value: 6,
    label: '06:00am',
  },
  {
    value: 7,
    label: '07:00am',
  },
  {
    value: 8,
    label: '08:00am',
  },
  {
    value: 9,
    label: '09:00am',
  },
  {
    value: 10,
    label: '10:00am',
  },
  {
    value: 11,
    label: '11:00am',
  },
  {
    value: 12,
    label: '12:00pm',
  },
  {
    value: 13,
    label: '01:00pm',
  },
  {
    value: 14,
    label: '02:00pm',
  },
  {
    value: 15,
    label: '03:00pm',
  },
  {
    value: 16,
    label: '04:00pm',
  },
  {
    value: 17,
    label: '05:00pm',
  },
  {
    value: 18,
    label: '06:00pm',
  },
  {
    value: 19,
    label: '07:00pm',
  },
  {
    value: 20,
    label: '08:00pm',
  },
  {
    value: 21,
    label: '09:00pm',
  },
  {
    value: 22,
    label: '10:00pm',
  },
  {
    value: 23,
    label: '11:00pm',
  },
];

const FINE_PRINT = `The statistics, graphs and maps are based upon preliminary information that was supplied to the Toronto Police Service by the reporting parties and may not have been verified. The preliminary crime classifications may be changed at a later date based upon additional investigation and there is always the possibility of mechanical or human error.

The Toronto Police Service makes no warranty, representation or guarantee as to the content, sequence, accuracy, timeliness or completeness of any of the data provided herein. The user of the following pages should not rely on the data provided herein for comparison purposes over time, or for any reason. The Toronto Police Service explicitly disclaims any representations and warranties, including, without limitation, the implied warranties of merchantability and fitness for a particular purpose.

The Toronto Police Service shall assume no liability for any errors, omissions, or inaccuracies in the information provided, regardless of how caused. The Toronto Police Service will not be responsible for the use of, or the results obtained from the use of this information. The Toronto Police Service shall assume no liability for any decisions made or actions taken or not taken by the user of the website in reliance upon any information or data furnished hereunder.

Due to both stacked incidents (those located at the same address) and incidents which may not have been geocoded, the number of incidents identified in tables and reports may not be fully reflected in the map. All data visualizations on maps should be considered approximate and attempts to derive specific addresses are strictly prohibited.`;

const ABOUT_DESC = `WatchDog is a crime data application created by Dhvani, Vikram, Lukman, Abudllah, and Chandana for the CS 348 course at UWaterloo. Version 1.0.3`;

const premiseTypeOptions = [
  {key: 'h', text: 'House', value: 'House'},
  {key: 'c', text: 'Commercial', value: 'Commercial'},
  {key: 'ot', text: 'Other', value: 'Other'},
  {key: 'ou', text: 'Outside', value: 'Outside'},
  {key: 'a', text: 'Apartment', value: 'Apartment'},
];

const questionOptions = [
  {
    key: '0',
    text: 'What are the 3 most commonly stolen bike types?',
    value: '0',
  },
  {
    key: '1',
    text: 'How many stolen bikes were recovered?',
    value: '1',
  },
  {
    key: '2',
    text: 'At what hour do most crimes occur?',
    value: '2',
  },
  {
    key: '3',
    text: 'On what day of the week do most crimes occur?',
    value: '3',
  },
  {
    key: '4',
    text: 'At what hour do most robberies occur?',
    value: '4',
  },
  {
    key: '5',
    text: 'On what day of the week do most robberies occur?',
    value: '5',
  },
  {
    key: '6',
    text: 'Which neighbourhood has the most number of traffic accidents?',
    value: '6',
  },
  {
    key: '7',
    text: 'What are the number of traffic accidents by age?',
    value: '7',
  },
  {
    key: '8',
    text: 'What is the average cost of bikes stolen?',
    value: '8',
  },
  {
    key: '9',
    text: 'What are the top three colours of bikes stolen?',
    value: '9',
  },
  {
    key: '10',
    text: 'What is the most common injury in traffic accidents?',
    value: '10',
  },
  {
    key: '11',
    text: 'What is the most common vehicle type in traffic accidents?',
    value: '11',
  },
  {
    key: '12',
    text: 'What is the most common driver action taken in traffic accidents?',
    value: '12',
  },
];

const bikeTypes = new Map ();
bikeTypes.set ('BM', 'BMX');
bikeTypes.set ('EL', 'Electric');
bikeTypes.set ('FO', 'Folding');
bikeTypes.set ('MT', 'Mountain');
bikeTypes.set ('OT', 'Other');
bikeTypes.set ('RC', 'Racer');
bikeTypes.set ('RE', 'Recumbant');
bikeTypes.set ('RG', 'Regular');
bikeTypes.set ('SC', 'Scooter');
bikeTypes.set ('TA', 'Tandem');
bikeTypes.set ('TO', 'Touring');
bikeTypes.set ('TR', 'Tricycle');
bikeTypes.set ('UN', 'Unicycle');
bikeTypes.set ('UNKNOWN', 'Unknown');

const bikeColours = new Map ();
bikeColours.set ('BLK', 'Black');
bikeColours.set ('BLU', 'Blue');
bikeColours.set ('GRY', 'Gray');

const locationOptions = [
  {
    value: 'citywide',
    label: 'citywide',
  },
  {
    value: 'in neighbourhood',
    label: 'in',
  },
  {
    value: 'in police division',
    label: 'in',
  },
];

const crimeTypeOptions = [
  {
    value: 'crimes',
    label: 'crimes',
  },
  {
    value: 'bike thefts',
    label: 'bike thefts',
  },
  {
    value: 'traffic incidents',
    label: 'traffic incidents',
  },
];

export {
  crimeTypeOptions,
  crimeIndicatorOptions,
  dateTypeOptions,
  dateNumOptions,
  FINE_PRINT,
  ABOUT_DESC,
  premiseTypeOptions,
  questionOptions,
  bikeTypes,
  locationOptions,
  bikeColours,
};
