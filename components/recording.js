import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Button,
  ToastAndroid,
  View,
  Image
} from 'react-native';

import Expo, { Audio, FileSystem, Permissions, KeepAwake } from 'expo';


const ENDPOINT = 'http://fa474678.ngrok.io';
// const ENDPOINT = 'http://be7a4709.ngrok.io';

const RecordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.caf',
    //outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_LOW,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

const RecordingPrompt = {
  intent: 'What is your goal?',
  facilitate: 'Start recording meeting'
}

export default class Recording extends Component {
  constructor(props){
    super(props);
    const { type } = this.props
    const promptText = RecordingPrompt[type];
    this.recording = null;
    this.state = {
      haveRecordingPermissions: false,
      isRecording: false,
      recordText: promptText
    };
    this.recordingSettings = JSON.parse(
      JSON.stringify(RecordingOptions)
    );
    // // UNCOMMENT THIS TO TEST maxFileSize:
    // this.recordingSettings.android['maxFileSize'] = 12000;
  }

  async _startRecording() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.

    this.setState({isRecording: true, recordText: 'Recording...'})

  }

  async _sendAudioToServer(uri: string) {
    let path = uri
    let name = uri.split('AV/')[1]
    console.log(name);
    console.log('in send audio to server');
    console.log(path);

    const data = new FormData();
    data.append('file', {
      uri: path,
      type: 'audio/x-caf',
      name: name
    });

    try {
      const endpoint = ENDPOINT + '/upload';
      console.log('endpoint: ', endpoint);
      const res = await fetch(endpoint, { //todo
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      })

    } catch (err) {
      alert(err)
    }
  }

  async _stopRecording () {
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    
    console.log(`FILE INFO: ${JSON.stringify(info)}`); //info.uri to get file dir
    
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    this.setState({isRecording: false, recordText: 'Done recording'})
    this._sendAudioToServer(info.uri).then(data => console.log(data));
    //ToastAndroid.show(`FILE INFO: ${JSON.stringify(info)}`, ToastAndroid.LONG);
  }


  onPressRecord = () => {
    if(!this.state.isRecording) {
      this._startRecording()
    } else {
      this._stopRecording()
    }
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  componentDidMount() {
    this._askForPermissions();
  }


  render () {
    return (
      <View style={styles.container}>
        {/* // <Image style={{width: 300, height: 200}} */}
        {/* //   source={{uri: './assets/image/placeholder.png'}} /> */}
        {/* <KeepAwake /> */}
        <Button style={styles.record_button}
          onPress={this.onPressRecord}
          title={this.state.recordText}
          color="#841584"
          accessibilityLabel="Start Recording"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#EDC45B'
  },
  record_button: {
  }
});
