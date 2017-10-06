import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Button,
  ToastAndroid,
  TouchableHighlight,
  View,
  Image,
  Platform
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

    ext = '.caf' ? Platform == 'ios' : '.m4a'
    console.log(ext)
    const data = new FormData();
    data.append('file', {
      uri: path,
      type: `audio/x-${ext}`,
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
      // <View style={styles.container}>
      //   // {/* // <Image style={{width: 300, height: 200}} */}
      //   // {/* //   source={{uri: './assets/image/placeholder.png'}} /> */}
      //   // {/* <KeepAwake /> */}
      //   <Button style={styles.record_button}
      //     onPress={this.onPressRecord}
      //     title={this.state.recordText}
      //     color="#841584"
      //     accessibilityLabel="Start Recording"
      //   />
      // </View>
      <View style={styles.container}>

      <View style={styles.footerContainer}>
        <Text style={styles.convo_text}>RECORD YOUR CONVO</Text>
        <View style={styles.actionButton}>
        <Button style={styles.record_button}
            onPress={this.onPressRecord}
            title="o"
            color="white"
            accessibilityLabel="Start Recording"
          />
        </View>
        <Text style={styles.record_text}>{this.state.recordText}</Text>
      </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

    //justifyContent: 'center',
    backgroundColor: '#5100FF'
  },
  record_button: {
    width:80,
    height: 80,
  },
  record_text: {
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 14,
    justifyContent: 'center',
    color: "#ffffff",
  },
  convo_text: {
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 14,
    justifyContent: 'center',
    color: "#ffffff",
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 14,
    paddingTop: 14,
    justifyContent: 'center',
  },
  actionButton: {
    width:80,
    height: 80,
    padding: 14,
    paddingLeft:18,
    paddingRight:18,
    margin: 8,
    backgroundColor: '#EFC45B',
    borderRadius: 80/2,
    elevation:3,
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 2,
		shadowOffset: {
			height: 3,
			width: 0
		}
  },
});
