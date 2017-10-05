import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class Tipscreen extends React.Component {
  static navigationOptions = {
    title: 'Tips',
  };
  render() {
    const { navigate, state } = this.props.navigation;
    const { params } = state;
    return (
      <View style={ styles.container }>
        <Text>{ params.role }</Text>
        <Button
           title="Record"
            onPress={() =>
            navigate('Record')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});