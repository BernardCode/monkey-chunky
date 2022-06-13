import React, {Component} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {Audio} from 'expo-av';


export default class PhonicSoundButton extends Component{
  constructor(props){
    super(props);
    this.state={
      pressedButtonIndex:""
    }

  }
  playSound=async(soundChunk)=>{
    var link="https://s3-whitehatjrcontent.whjr.online/phones/" + soundChunk + ".mp3";

    await Audio.Sound.createAsync(
      {uri:link},
      {shouldPlay:true}
    );
  }
  render(){
    return(
      <TouchableOpacity 
      style= {
        this.props.buttonIndex===this.state.pressedButtonIndex ? 
        [styles.chunkButton,{backgroundColor:"white"}]:[styles.chunkButton,{backgroundColor:"red"}]
      } 
      onPress={()=>{
        this.playSound(this.props.soundChunk);
        this.setState({
          pressedButtonIndex: this.props.buttonIndex
        });
      }}>
      <Text 
      style={this.props.buttonIndex===this.state.pressedButtonIndex ? 
        [styles.displayText,{color:"red"}]:[styles.displayText,{color:"white"}]}>
      {this.props.wordChunk}</Text>
       </TouchableOpacity>

    );


  }
}

const styles= StyleSheet.create({
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  chunkButton: {
  width: '60%',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 10,
  margin: 5,
  backgroundColor: 'crimson'
}

});