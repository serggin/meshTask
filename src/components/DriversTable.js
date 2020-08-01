import React from 'react';
import PropTypes from 'prop-types';

import {FlatList, Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

import globalStyles, {getSize} from '../styles';

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    padding: 10,
  },
  headRow: {
    flexDirection: 'row',
    borderColor: '#333333',
    borderWidth: 1,
    padding: 10,
  },
  dataCell: {
    flex: 2,
    fontSize: getSize('TEXT'),
  },
  headCell: {
    flex: 2,
    fontSize: getSize('TEXT'),
    fontWeight: 'bold',
    //textAlign: 'center',
  },
  nameCell: {
    textAlign: 'left',
    flex: 5,
  },
  numberCell: {
    flex: 1,
    //minWidth: getSize('TEXT', 'LARGE'),
  },
});

const DriversHeadRow = () => {
  return (
    <View style={styles.dataRow}>
      <Text style={[styles.headCell, styles.nameCell]}>Name</Text>
      <Text style={[styles.headCell, styles.numberCell]}>N#</Text>
      <Text style={[styles.headCell, styles.headCell]}>Nationality</Text>
      <Text style={[styles.headCell, styles.headCell]}>Born</Text>
    </View>
  );
};

const DriversTableRow = ({name, number, nationality, born}) => {
  return (
    <View style={styles.dataRow}>
      <Text style={[styles.dataCell, styles.nameCell]}>{name}</Text>
      <Text style={styles.numberCell}>{number}</Text>
      <Text style={styles.dataCell}>{nationality}</Text>
      <Text style={styles.dataCell}>{born}</Text>
    </View>
  );
};

const DriversTable = ({data}) => {
  console.log('DriversTable data=', data);
  const _renderItem = ({item}) => {
    return (
      <>
        <DriversTableRow
          name={item.name}
          number={item.number}
          nationality={item.nationality}
          born={item.born}
        />
      </>
    );
  };

  return (
    <>
      <DriversHeadRow />
      <FlatList data={data} renderItem={_renderItem} keyExtractor={item => item.driverId}/>
    </>
  );
};
DriversTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default DriversTable;
