import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Recording from './recording';
import Homescreen from './screens/homescreen';
import Tipscreen from './screens/tipscreen';
import Recordscreen from './screens/recordscreen';

const SimpleApp = StackNavigator(
  {
    Home: { screen: Homescreen },
    Tips: { screen: Tipscreen },
    Record: { screen: Recordscreen }
  },
  // {
  //   cardStyle: {
  //     paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  //   }
  // }
);


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SimpleApp />

        {/* <Navigator
          style={{ flex:1 }}
          initialRoute={{ name: 'Main' }}
          renderScene={ this.renderScene } /> */}
        {/* <Text>More text </Text> */}
        {/* <Recording /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
