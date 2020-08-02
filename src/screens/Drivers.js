import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import globalStyles, {
  getDriversPageLimit,
  getDriversHeadHeight,
  getDriversRowHeight,
} from '../styles';
import {loadDrivers} from '../api/api';
import Paginator from '../components/Paginator';
import DriversTable from '../components/DriversTable';

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

const Drivers = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [limit, setLimit] = useState(getDriversPageLimit());
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadDrivers(limit, offset)
      .then((data) => {
        //console.log('data.MRData=', data.MRData);

        if (offset === 0) {
          const total = data.MRData.total;
          setTotal(total);
          setPages(Math.ceil(total / limit));
          setPage(1);
        }
        setTableData(
          data.MRData.DriverTable.Drivers.map((item) => ({
            driverId: item.driverId,
            name: item.familyName + ' ' + item.givenName,
            number: item.permanentNumber || '',
            nationality: item.nationality,
            born: item.dateOfBirth,
            url: item.url,
          })),
        );
      })
      .catch((error) => {
        console.error('in Drivers useEffect: ', error);
        throw error;
      });
  }, [offset]);

  const onPage = (command) => {
    let p = page;
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
        p = pages;
        break;
    }
    setPage(p);
    setOffset(limit * (p - 1));
  };

  return (
    <>
      <View style={globalStyles.screen}>
        <Paginator page={page} pages={pages} onPage={onPage} />
        <DriversTable data={tableData} navigation={navigation} />
      </View>
      {/*<View style={styles.test}>
        <View style={styles.testHead} />
        <View style={styles.testRow} />
      </View>*/}
    </>
  );
};

export default Drivers;
