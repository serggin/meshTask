import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import globalStyles from '../styles/styles';
import {loadDrivers, loadTestJson} from '../api/api';
import Paginator from '../components/Paginator';
import DriversTable from '../components/DriversTable';

const Drivers = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [limit, setLimit] = useState(10);
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
          setTotal(data.MRData.total);
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
          })),
        );
      })
      .catch((error) => {
        console.error('in Drivers useEffect: ', error);
        throw error;
      });
  }, [offset]);

  const onPage = (command) => {};

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.boxText}>Drivers</Text>
      <DriversTable data={tableData} />
      <Paginator {...{page, pages, onPage}} />
    </View>
  );
};

export default Drivers;
