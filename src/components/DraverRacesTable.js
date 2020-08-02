import React from 'react';
import PropTypes from 'prop-types';

import {FlatList, Text, View, StyleSheet} from 'react-native';

import globalStyles, {getSize} from '../styles';

const styles = StyleSheet.create({
  head: {
    backgroundColor: '#dddddd',
    borderColor: '#333333',
    borderWidth: 1,
    padding: 5,
  },
  headRow: {
    flexDirection: 'row',
  },
  headCell: {
    flex: 1,
    fontSize: getSize('TEXT'),
    fontWeight: 'bold',
    //borderTopColor: '#333333',
    //borderTopWidth: 1,
  },
  raceCell: {
    textAlign: 'center',
  },
  posCell: {
    flex: 2,
  },
  statusCell: {
    flex: 5,
  },
  pointsCell: {
    flex: 2,
  },
  constructorCell: {
    flex: 6,
  },
  dataRow: {
    flexDirection: 'row',
    padding: 10,
  },
  dataCell: {
    flex: 1,
    fontSize: getSize('TEXT'),
    borderBottomColor: '#333333',
    borderBottomWidth: 1,
  },
});

const RacesHeadRow = () => {
  return (
    <View style={styles.head}>
      <View style={styles.headRow}>
        <Text style={[styles.headCell, styles.raceCell]}>Year, Race Name</Text>
      </View>
      <View style={styles.headRow}>
        <Text style={[styles.headCell, styles.constructorCell]}>
          Constructor
        </Text>
        <Text style={[styles.headCell, styles.posCell]}>Pos</Text>
        <Text style={[styles.headCell, styles.statusCell]}>Status</Text>
        <Text style={[styles.headCell, styles.pointsCell]}>Points</Text>
      </View>
    </View>
  );
};

const RacesDataRow = ({pos, constructor, status, points}) => {
  return (
    <View style={styles.dataRow}>
      <Text style={[styles.dataCell, styles.constructorCell]}>
        {constructor}
      </Text>
      <Text style={[styles.dataCell, styles.posCell]}>{pos}</Text>
      <Text style={[styles.dataCell, styles.statusCell]}>{status}</Text>
      <Text style={[styles.dataCell, styles.pointsCell]}>{points}</Text>
    </View>
  );
};

const RacesTable = ({data}) => {
  const _renderItem = ({item}) => {
    return (
      <>
        <Text style={styles.raceCell}>{item.race}</Text>
        <RacesDataRow
          constructor={item.constructor}
          pos={item.pos}
          status={item.status}
          points={item.points}
        />
      </>
    );
  };

  return (
    <>
      <RacesHeadRow />
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item.date}
      />
    </>
  );
};
export default RacesTable;
