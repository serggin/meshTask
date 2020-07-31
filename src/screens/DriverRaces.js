import React from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../styles/styles';

export default class Main extends React.Component {
  render() {
    return (
      <View style={globalStyles.screen}>
        <Text style={globalStyles.boxText}>Driver Races</Text>
      </View>
    );
  }
}
