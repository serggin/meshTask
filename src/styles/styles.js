/*
Global styles
 */
import {Platform, StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: StatusBar.currentHeight,
  },
  boxText: {
    color: 'red',
  },
  textLink: {
    fontSize: 16,
    color: '#0364AB',
  },
});

export default styles;
