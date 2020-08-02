import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import globalStyles, {
  getRacesPageLimit,
  getRacesHeadHeight,
  getRacesRowHeight,
} from '../styles';
import {loadDriverRacers} from '../api/api';
import Paginator from '../components/Paginator';
import DraverRacesTable from '../components/DraverRacesTable';

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

const DriverRaces = ({route}) => {
  console.log('Driver route.params=', route.params);
  console.log('getRacesPageLimit()=', getRacesPageLimit());
  const {driverId, name} = route.params;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [limit, setLimit] = useState(getRacesPageLimit());
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadDriverRacers(driverId, limit, offset)
      .then((data) => {
        console.log('driverRaces data = ', data);
        console.log('data.MRData=', data.MRData);
        //console.log('data.MRData.DriverTable=', data.MRData.DriverTable);
        //console.log('data.MRData.total=', data.MRData.total);

        if (offset === 0) {
          const total = data.MRData.total;
          setTotal(total);
          //console.log('total=', total, 'data.MRData.total=', data.MRData.total);
          setPages(Math.ceil(total / limit));
          setPage(1);
        }
        console.log('Race=', data.MRData.RaceTable.Races[0]);
        console.log(
          'Constructor=',
          data.MRData.RaceTable.Races[0].Results[0].Constructor,
        );

        setTableData(
          data.MRData.RaceTable.Races.map((item) => ({
            race: item.season + ' ' + item.raceName,
            pos: item.Results[0].position,
            constructor: item.Results[0].Constructor.name,
            status: item.Results[0].status,
            points: item.Results[0].points,
            date: item.date,
          })),
        );
      })
      .catch((error) => {
        console.error('in Drivers useEffect: ', error);
        throw error;
      });
  }, [offset]);

  const onPage = (command) => {
    console.log('onPage() command=', command);
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
        <Text style={globalStyles.h1Text}>{name}</Text>
        <Paginator page={page} pages={pages} onPage={onPage} />
        <DraverRacesTable data={tableData} />
      </View>
      <View style={styles.test}>
        <View style={styles.testHead} />
        <View style={styles.testRow} />
      </View>
    </>
  );
};

export default DriverRaces;
