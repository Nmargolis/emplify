import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Homescreen from './screens/homescreen';
import Tipscreen from './screens/tipscreen';
import Recordscreen from './screens/recordscreen';
import Intentscreen from './screens/intentscreen';
import Resultscreen from './screens/resultscreen';

const SimpleApp = StackNavigator({
  Home: { screen: Homescreen },
  Intent: {screen: Intentscreen},
  Tips: { screen: Tipscreen },
  Record: { screen: Recordscreen },
  Results: {screen: Resultscreen }
});


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SimpleApp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
