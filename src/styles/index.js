/*
Global styles
 */
import {Platform, StyleSheet, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getScreenWidth = () => {
  return wp('100%');
};
const screenWidth = getScreenWidth();
const screenHeight = hp('100%');
const WIDTH_SMALL = 375;
const WIDTH_LARGE = 768;
const sizeIndex =
  screenWidth <= WIDTH_SMALL ? 0 : screenWidth >= WIDTH_LARGE ? 2 : 1;

const h1TextSize = [24, 32, 48];
const h2TextSize = [20, 28, 40];
const textSize = [12, 16, 20];

const racesHeadHeight = [128, 150, 186];
const racesRowHeight = [48, 52, 58];
const getRacesPageLimit = () => {
  console.log(
    'getRacesPageLimit',
    screenWidth,
    sizeIndex,
    screenHeight,
    racesHeadHeight[sizeIndex],
    racesRowHeight[sizeIndex],
  );
  return Math.floor(
    (screenHeight - racesHeadHeight[sizeIndex] * 2) / racesRowHeight[sizeIndex],
  );
};
const getRacesHeadHeight = () => racesHeadHeight[sizeIndex];
const getRacesRowHeight = () => racesRowHeight[sizeIndex];

const driversHeadHeight = [82, 88, 94];
const driversRowHeight = [37, 42, 48];
const getDriversPageLimit = () => {
  console.log(
    'getDriversPageLimit',
    screenWidth,
    sizeIndex,
    screenHeight,
    driversHeadHeight[sizeIndex],
    driversRowHeight[sizeIndex],
  );
  return Math.floor(
    (screenHeight - driversHeadHeight[sizeIndex] * 2) /
      driversRowHeight[sizeIndex],
  );
};
const getDriversHeadHeight = () => driversHeadHeight[sizeIndex];
const getDriversRowHeight = () => driversRowHeight[sizeIndex];

const baseTextSize = textSize[sizeIndex];

const getSize = (type, size) => {
  switch (type) {
    case 'TEXT':
      return getTextSize(size);
    case 'H1TEXT':
      return h1TextSize[sizeIndex] * (size == 'LARGE' ? 2 : 1);
    default:
      throw new Error('globalStyles getSize() invalid type=' + type);
  }
};

const getTextSize = (size) => {
  switch (size) {
    case 'LARGE':
      return baseTextSize * 2;
    case 'MEDIUM':
      return Math.floor(baseTextSize * 1.5);
    case 'SMALL':
    default:
      return baseTextSize;
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    // paddingTop: StatusBar.currentHeight,
  },
  boxText: {
    color: 'red',
  },
  textLink: {
    fontSize: 16,
    color: '#0364AB',
  },
  h1Text: {
    fontSize: h1TextSize[sizeIndex],
    fontWeight: 'bold',
    paddingLeft: h1TextSize[sizeIndex] / 4,
    paddingBottom: h1TextSize[sizeIndex] / 4,
  },
});

export default styles;
export {
  screenWidth,
  screenHeight,
  getSize,
  baseTextSize,
  getRacesPageLimit,
  getRacesHeadHeight,
  getRacesRowHeight,
  getDriversPageLimit,
  getDriversHeadHeight,
  getDriversRowHeight,
};
