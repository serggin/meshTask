import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import globalStyles from '../styles';
import TextLink from '../components/TextLink';

const styles = StyleSheet.create({
  details: {
    flexDirection: 'column',
  },
  line: {
    flexDirection: 'row',
    padding: 5,
  },
  label: {
    flex: 4,
  },
  value: {
    flex: 6,
  },
});

const Driver = ({route}) => {
  console.log('Driver route.params=', route.params);
  const {name, number, nationality, born, url} = route.params;
  return (
    <View style={globalStyles.screen}>
      <View style={styles.details}>
        <View style={styles.line}>
          <Text style={styles.label}>Name :</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>Permanent Number :</Text>
          <Text style={styles.value}>{number}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>Nationality :</Text>
          <Text style={styles.value}>{nationality}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>Date Of Birth :</Text>
          <Text style={styles.value}>{born}</Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.label}>Biography :</Text>
        </View>
        <View style={styles.line}>
          <TextLink
            style={globalStyles.textLink}
            onPress={() => Linking.openURL(url)}>
            {url}
          </TextLink>
        </View>
      </View>
    </View>
  );
};

export default Driver;
