import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text, View, Alert} from 'react-native';
import {StyleSheet} from 'react-native';

import {getSize} from '../styles';

const styles = StyleSheet.create({
  paginator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: getSize('TEXT'),
  },
});

const Paginator = ({pages, page, onPage}) => {
  return (
    pages > -1 && (
      <View style={styles.paginator}>
        <Text style={styles.text}>Page : </Text>
        <Button
          title="First"
          disabled={page == 1}
          onPress={() => onPage('first')}
        />
        <Button
          title="Previous"
          disabled={page == 1}
          onPress={() => onPage('prev')}
        />
        <Text style={styles.text}>{page}</Text>
        <Button
          title="Next"
          disabled={page == pages}
          onPress={() => onPage('next')}
        />
        <Button
          title="Last"
          disabled={page == pages}
          onPress={() => onPage('last')}
        />
        <Text style={styles.text}>({pages})</Text>
      </View>
    )
  );
};
Paginator.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired,
};

export default Paginator;
