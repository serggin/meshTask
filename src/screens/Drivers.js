import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import globalStyles, {
  getDriversPageLimit,
  //  getDriversHeadHeight,
  //  getDriversRowHeight,
} from '../styles';
import {loadDrivers} from '../api/api';
import Paginator from '../components/Paginator';
import DriversTable from '../components/DriversTable';

//Used only while selecting DriversPageLimit
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
    height: getDriversHeadHeight(),
  },
  testRow: {
    flex: 1,
    backgroundColor: '#00ff0033',
    height: getDriversRowHeight() * 5,
  },
});
*/

const Drivers = ({navigation}) => {
  const limit = getDriversPageLimit();
  const [page, setPage] = useState(1); // for loading data only!
  const [state, setState] = useState({page: 0, pages: 0, tableData: []}); // for rendering

  useEffect(() => {
    const offset = limit * (page - 1);
    loadDrivers(limit, offset)
      .then((data) => {
        //console.log('data.MRData=', data.MRData);
        let pages = state.pages;
        if (offset === 0) {
          const total = data.MRData.total;
          pages = Math.ceil(total / limit);
        }
        const tableData = data.MRData.DriverTable.Drivers.map((item) => ({
          driverId: item.driverId,
          name: item.familyName + ' ' + item.givenName,
          number: item.permanentNumber || '',
          nationality: item.nationality,
          born: item.dateOfBirth,
          url: item.url,
        }));
        setState({
          page,
          pages,
          tableData,
        });
      })
      .catch((error) => {
        console.error('in Drivers useEffect: ', error);
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
        <Paginator page={state.page} pages={state.pages} onPage={onPage} />
        <DriversTable data={state.tableData} navigation={navigation} />
      </View>
      {/*<View style={styles.test}>
        <View style={styles.testHead} />
        <View style={styles.testRow} />
      </View>*/}
    </>
  );
};

export default Drivers;
