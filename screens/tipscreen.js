import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


// const Tips = {
//   empowered: [
//     Make use of silence when speaking
//     Build off another's idea with "Yes, and..."
//     Replace 'or' with 'and' to elevate the conversation
//     Pre-determine a question for an ally to ask you
//     Speak up in the first 10 minutes
//     Ask a strategic question, like "How do we get this done?"
//     Use a stock phrase to start talking. Ex: "The goal is clear."
//     Solicit an ally to make space for you
    
//     Ally
//     Initiate a round robin to get all opinions
//     Highlight another's accomplishments
//     Direct your body language towards the speaker
//     Interrupt interruptions
//     Amplify
//     Nod when others are speaking
//     Refer to another as an authority
//     Find common ground to defuse negative situations]
// }

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