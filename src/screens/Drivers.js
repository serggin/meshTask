import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import globalStyles from '../styles/styles';
import {loadDrivers, loadTestJson} from '../api/api';
import Paginator from '../components/Paginator';

const Drivers = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadDrivers(limit, offset)
      .then((data) => {
        console.log('drivers data = ', data);
        console.log('data.MRData=', data.MRData);
        //console.log('data.MRData.DriverTable=', data.MRData.DriverTable);
        console.log('data.MRData.total=', data.MRData.total);

        setTotal(data.MRData.total);
        console.log('total=', total);
        if (offset === 0) {
          setPages(Math.ceil(total / limit));
          setPage(1);
        }
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
      <Paginator {...{page, pages, onPage}} />
    </View>
  );
};

export default Drivers;
