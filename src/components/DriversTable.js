import React from 'react';
import PropTypes from 'prop-types';

import {FlatList, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    textAlign: 'left',
  },
});

const DriversTableRow = ({name, number, nationality, born, driverId}) => {
  return (
    <View style={styles.dataRow} key={driverId}>
      <Text style={styles.name}>{name}</Text>
      <Text>{number}</Text>
      <Text>{nationality}</Text>
      <Text>{born}</Text>
    </View>
  );
};

const DriversTable = ({data}) => {
  console.log('DriversTable data=', data);
  const _renderItem = ({item}) => {
    return <DriversTableRow name={item.name} number={item.number} nationality={item.nationality} born={item.born}/>;
  };

  return <FlatList data={data} renderItem={_renderItem} />;
};
DriversTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default DriversTable;
