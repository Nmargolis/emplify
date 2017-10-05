import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Choose your role',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="Be an ally"
          onPress={() =>
            navigate('Tips', { role: 'Ally' })
          }
        />
        <Button
          title="Be empowered"
          onPress={() =>
            navigate('Tips', { role: 'Empowered' })
          }
        />
        <Button
          title="Be a facilitator"
          onPress={() =>
            navigate('Tips', { role: 'Facilitator' })
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