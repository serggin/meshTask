import React from 'react';
import PropTypes from 'prop-types';

import {FlatList, Text, View, StyleSheet} from 'react-native';

import globalStyles, {getDriversPageLimit, getSize} from '../styles';
import TextLink from './TextLink';

const styles = StyleSheet.create({
  dataRow: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    padding: 10,
  },
  headRow: {
    flexDirection: 'row',
    backgroundColor: '#dddddd',
    borderColor: '#333333',
    borderWidth: 1,
    padding: 10,
  },
  dataCell: {
    flex: 5,
    fontSize: getSize('TEXT'),
  },
  headCell: {
    flex: 5,
    fontSize: getSize('TEXT'),
    fontWeight: 'bold',
  },
  nameCell: {
    flex: 9,
  },
  racesCell: {
    flex: 3,
  },
  numberCell: {
    flex: 2,
  },
  nationalityCell: {
    flex: 1,
  },
});

const DriversHeadRow = () => {
  return (
    <View style={styles.headRow}>
      <Text style={[styles.headCell, styles.nameCell]}>Name</Text>
      <Text style={[styles.headCell, styles.racesCell]}>Races</Text>
      <Text style={[styles.headCell, styles.numberCell]}>N#</Text>
      <Text style={[styles.headCell]}>Nationality</Text>
      <Text style={[styles.headCell]}>Born</Text>
    </View>
  );
};

const DriversTableRow = ({
  name,
  number,
  nationality,
  born,
  driverId,
  url,
  navigation,
}) => {
  return (
    <View style={styles.dataRow}>
      <TextLink
        style={[styles.dataCell, styles.nameCell]}
        onPress={() => {
          navigation.navigate('Driver', {name, number, nationality, born, url});
        }}>
        {name}
      </TextLink>
      <TextLink
        style={[styles.dataCell, styles.racesCell]}
        onPress={() => {
          navigation.navigate('DriverRaces', {driverId, name});
        }}>
        Races
      </TextLink>
      <Text style={[styles.dataCell, styles.numberCell]}>{number}</Text>
      <Text style={styles.dataCell}>{nationality}</Text>
      <Text style={styles.dataCell}>{born}</Text>
    </View>
  );
};

const DriversTable = ({data, navigation}) => {
  console.log('DriversTable data=', data);

  const _renderItem = ({item}) => {
    return (
      <>
        <DriversTableRow
          name={item.name}
          number={item.number}
          nationality={item.nationality}
          born={item.born}
          driverId={item.driverId}
          url={item.url}
          navigation={navigation}
        />
      </>
    );
  };

  return (
    <>
      <DriversHeadRow />
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item.driverId}
      />
    </>
  );
};
DriversTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default DriversTable;
