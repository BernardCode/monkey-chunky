import React,{Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './Components/PhonicSoundButton';

export default class App extends Component{
  constructor(){
    super();
    this.state={
      text:'',
      chunks:[],
      phonicSounds:[]
    }
  }
  render(){
    return(
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
          backgroundColor={'#9c821f'}
          centerComponent={{
            text:'Monkey Chunky',
            style:{color:'#ffffff', fontSize:24}
          }}
          />
          <Image 
          style={styles.imageIcon}
          source={{uri:"https://stickershop.line-scdn.net/stickershop/v1/product/4077442/LINEStorePC/main.png;compress=true"}}/>
          <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({text: text});
          }}
          value={this.state.text}
          />
          <TouchableOpacity style={styles.goButton}
          onPress={()=>{
            var word=this.state.text.trim().toLowerCase();

            db[word] ? (
              this.setState({chunks:db[word].chunks}),
              this.setState({phonicSounds:db[word].phones})
            ):Alert.alert("This word doesn't exist in the database, try another.");
          }}
          >
          <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>
          <View>
          {this.state.chunks.map((item, index)=>{
            return(
              <PhonicSoundButton wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}/>
            );


          })}


          </View>
      </View>
      </SafeAreaProvider>
    );
  }


}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#3d222d'
  },
  imageIcon:{
  width:150,
  height:150,
  marginLeft:105,
  marginTop:30
  },
  inputBox: { 
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    color: "#f7d80a"
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});