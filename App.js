import React, { Component } from 'react';
import {Modal, View, Alert, Button, PermissionsAndroid, StyleSheet, Text, TextInput, Number} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export default class FlexDirectionBasics extends Component {
  state = {
    isVisible: false, //state of modal default false
  }
  constructor(props){
    super(props)

    this.state = {
      pincode: '',
      password: '',
    }
  }
  async _alert(){
    
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                {
                    title: "Phone Call Permission",
                    message:
                        "Lefayda CS App needs access to your phone call " +
                        "so it can use it to top-up your mobile credits when requested.",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log(this.state.pincode);
              RNImmediatePhoneCall.immediatePhoneCall(`*901*${this.state.pincode}*1*2#`);
            } else {
                Alert.alert(
                    "Permission Denied",
                    "Phone call permission is denied. You won't be able to request mobile top-up."
                );
            }
        } catch (err) {
            alert("Error occured while requesting permission for phone call.");
        }
    }
  
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{
        flex: 1, 
        flexDirection: 'column', //column-reverse, row, row-reverse
        justifyContent: 'space-around', //flex-start, flex-end, center,space-between
        alignItems: 'center', //stretch, flex-start, flex-end, center, baseline 
        alignContent: 'center', //'flex-start' 'flex-end'  'stretch' 'space-between' 'space-around' 
        flexGrow: 1,//describes how any space within a container should be distributed among its children along the main axis
        flexShrink: 0,
        backgroundColor: '#FFFFFF'
      }}>
        <Modal animationType = {"slide"} transparent = {true}
            visible = {this.state.isVisible}
            onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
            {/*All views of Modal*/}
            {/*Animation can be slide, slide, none*/}
            <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}>
              <View style = {styles.modal}>
                <Text style = {styles.text}>Modal is open!</Text>
                <Button title="Click To Close Modal" onPress = {() => {
                    this.setState({ isVisible:!this.state.isVisible})}}/>
                  <TextInput
                      onChangeText={(text) => this.setState({pincode:text})}
                      returnKeyLabel = {"Go"}
                      placeholder='Pin Code'
                      keyboardType={'numeric'}
                      maxLength={4}
                  />
                <Button 
                  onPress={()=>this._alert()}
                  title='Send'
                />
              </View>
            </View>
        </Modal>
        <Button 
          onPress ={()=>{this.setState({ isVisible: true})}}
          title='Balance'
        />
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue' }} />
        
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:30
  },
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#dfdfdf',
      padding: 100,
      width: 320,
      height: 300,
      marginTop: 200,
      marginBottom: 200,
   },
   text: {
      color: '#3f2949',
      marginTop: 10
   }
});
