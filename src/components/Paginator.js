import React from 'react';
import PropTypes from 'prop-types';
import {Button, Text, View, Alert} from 'react-native';
import {StyleSheet} from 'react-native';

import TextLink from './TextLink';

const styles = StyleSheet.create({
  paginator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    //borderColor: '#333333',
    //borderWidth: 1,
    padding: 5,
  },
});

const Paginator = ({pages, page, onPage}) => {
  const onPage1 = (command) => {
    Alert.alert(command);
  };
  return (
    pages > -1 && (
      <View style={styles.paginator}>
        <Text>Page : </Text>
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
        <Text>{page}</Text>
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
        <Text>({pages})</Text>
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
