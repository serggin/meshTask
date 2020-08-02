import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import globalStyles from '../styles';
import {loadDrivers} from '../api/api';
import Paginator from '../components/Paginator';
import DriversTable from '../components/DriversTable';

const Drivers = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    loadDrivers(limit, offset)
      .then((data) => {
        console.log('drivers data = ', data);
        console.log('data.MRData=', data.MRData);
        //console.log('data.MRData.DriverTable=', data.MRData.DriverTable);
        //console.log('data.MRData.total=', data.MRData.total);

        if (offset === 0) {
          const total = data.MRData.total;
          setTotal(total);
          console.log('total=', total);
          setPages(Math.ceil(total / limit));
          setPage(1);
        }
        console.log('Driver=', data.MRData.DriverTable.Drivers[9]);
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
    <View style={globalStyles.screen}>
      {/*<Text style={globalStyles.boxText}>Drivers</Text>*/}
      <Paginator page={page} pages={pages} onPage={onPage} />
      <DriversTable data={tableData} navigation={navigation} />
      {/*<Paginator {...{page, pages, onPage}} />*/}
    </View>
  );
};

export default Drivers;
