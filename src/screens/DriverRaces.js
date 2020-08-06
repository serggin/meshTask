import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import globalStyles, {
  getRacesPageLimit,
  //  getRacesHeadHeight,
  //  getRacesRowHeight,
} from '../styles';
import {loadDriverRacers} from '../api/api';
import Paginator from '../components/Paginator';
import DraverRacesTable from '../components/DraverRacesTable';

//Used only while selecting RacesPageLimit
/*
const styles = StyleSheet.create({
  test: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
  },
  testHead: {
    flex: 1,
    backgroundColor: '#ffff0033',
    height: getRacesHeadHeight(),
  },
  testRow: {
    flex: 1,
    backgroundColor: '#00ff0033',
    height: getRacesRowHeight(),
  },
});
*/

const DriverRaces = ({route}) => {
  const {driverId, name} = route.params;
  const limit = getRacesPageLimit();
  const [page, setPage] = useState(1); // for loading data only!
  const [state, setState] = useState({page: 0, pages: 0, tableData: []}); // for rendering

  useEffect(() => {
    const offset = limit * (page - 1);
    loadDriverRacers(driverId, limit, offset)
      .then((data) => {
        //console.log('data.MRData=', data.MRData);
        let pages = state.pages;
        if (offset === 0) {
          const total = data.MRData.total;
          pages = Math.ceil(total / limit);
        }
        const tableData = data.MRData.RaceTable.Races.map((item) => ({
          race: item.season + ' ' + item.raceName,
          pos: item.Results[0].position,
          constructor: item.Results[0].Constructor.name,
          status: item.Results[0].status,
          points: item.Results[0].points,
          date: item.date,
        }));
        setState({
          page,
          pages,
          tableData,
        });
      })
      .catch((error) => {
        console.error('in DriverRaces useEffect: ', error);
        throw error;
      });
  }, [page]);

  const onPage = (command) => {
    let p = state.page;
    switch (command) {
      case 'first':
        p = 1;
        break;
      case 'prev':
        p--;
        break;
      case 'next':
        p++;
        break;
      case 'last':
        p = state.pages;
        break;
    }
    setPage(p);
  };

  return (
    <>
      <View style={globalStyles.screen}>
        <Text style={globalStyles.h1Text}>{name}</Text>
        <Paginator page={state.page} pages={state.pages} onPage={onPage} />
        <DraverRacesTable data={state.tableData} />
      </View>
      {/*<View style={styles.test}>
        <View style={styles.testHead} />
        <View style={styles.testRow} />
      </View>*/}
    </>
  );
};

export default DriverRaces;
