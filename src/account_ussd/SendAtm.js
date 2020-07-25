import React, { Component } from 'react';
import {
  Modal, 
  View, 
  Alert, 
  Button, 
  PermissionsAndroid, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image,
  } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export default class SendATMoney extends React.Component{
    state = {
        sendCard: false,
        check:false
    }
    async _sendATM(){
            this.closeSendAtm();
            // console.log(`*901*${this.state.pincode}*2*2*1*2*${this.state.phoneNo}*${this.state.amount}*1#`);
            RNImmediatePhoneCall.immediatePhoneCall(`*901*${this.state.pincode}*5*2*${this.state.phoneNo}*${this.state.amount}*1#`);
    }
    closeSendAtm() {
        this.setState({ check: false})
        this.props.closeAtm()
    }
    
    render(){
        return(
            
            
            <View 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.modal_view}
            >
                <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.check}
                onRequestClose = {() =>{ this.setState({ check:!this.state.check}) } }>
                    <View 
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={styles.modal_view}
                    >
                        <View style = {styles.modal}>
                            <Text style={styles.text}>Are you sure you want to send {this.state.amount} Birr to {this.state.phoneNo}?</Text>
                            <TouchableOpacity
                                style={styles.close}
                                onPress = {() => this.closeSendAtm()}
                            >
                                <Text style={styles.btnText}>Cancle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.sendBtn}
                                onPress={()=>this._sendATM()}
                            >
                                <Text style={styles.btnText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style = {styles.modal}>
                    <Text style={styles.header}>Send cardless service</Text>
                    <Text style = {styles.text}>Please Fill The Form</Text>                    
                    <TextInput
                    onChangeText={(text) => this.setState({pincode:text})}
                            returnKeyLabel = {"Next"}
                            placeholder='Pin Code'
                            keyboardType={'numeric'}
                            maxLength={4}
                            style={styles.text}
                            placeholderTextColor={'#fff'}
                            secureTextEntry={true}
                            returnKeyType="next"
                    style={styles.textInput}
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({phoneNo:text})}
                            returnKeyLabel = {"Next"}
                            placeholder='Phone Number'
                            keyboardType={'phone-pad'}
                            maxLength={10}
                            style={styles.text}
                            placeholderTextColor={'#fff'}
                            returnKeyType="next"
                        style={styles.textInput}
                    />
                    <TextInput
                        onChangeText={(text) => this.setState({amount:text})}
                            returnKeyLabel = {"Next"}
                            placeholder='Birr Amount'
                            keyboardType={'numeric'}
                            maxLength={5}
                            style={styles.text}
                            placeholderTextColor={'#fff'}
                            return
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        style={styles.close}
                        onPress = {() => this.closeSendAtm()}
                    >
                        <Text style={styles.btnText}>Cancle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sendBtn}
                        onPress={()=>this.setState({ check: true})}
                    >
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            
        );
    }
}

const styles = StyleSheet.create({
    gridView:{
        // paddingTop: 25,
        marginBottom: 10,
        flex: 1,
    },
    MainContainer:{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        
    },
    listGrid:{
        justifyContent: 'center',
        flex:1,
        alignItems: 'center',
        height: 100,
        margin: 5,
    },
    sendBtn:{
        position:'absolute',
        bottom:10,
        right:10,
        color:'#fff',
        backgroundColor:'#F69139',  
        height:30,
        width:100,
        color: '#010066',
        alignItems:'center',
        padding:6,
        borderRadius: 30,
    },
    close:{
        position:'absolute',
        bottom:10,
        right:120,
        color:'#fff',
        backgroundColor:'rgba(1, 0, 102,0.77)',  
        height:30,
        width:100,
        color: '#010066',
        alignItems:'center',
        padding:6,
        borderRadius: 30,
        borderWidth:0.4,
        borderColor:'rgba(255,255,255,0.7)'
    },
    btnText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'bold'
    },
    textInput: {
        paddingTop:20,
        margin: 5,
        height: 50,
        width:'80%',
        borderWidth: 1,
        borderColor:'transparent',
        borderBottomColor:'rgba(255,255,255,0.8)',
        color: '#fff',
    },
    container:{
      flex:1,
      marginTop:20,
      backgroundColor:"#ebf0f7",
      height: '100%',
    },
    contentList:{
        
        // height: '100%',
    },
    cardContent: {
      marginLeft:20,
      marginTop:10
    },
    image:{
      width:50,
      height:50,
      borderRadius:5,
      borderWidth:2,
      borderColor:"#ebf0f7",
      alignSelf:'center',
      //   marginBottom: '8%'
    },
  
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
      marginLeft: 20,
      marginRight: 20,
      marginTop:20,
      backgroundColor:"white",
      padding: 10,
      borderRadius:3,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    //   height:'auto'
    },
  
    name:{
      fontSize:15,
      color:"#3399ff",
      fontWeight:'bold',
      marginLeft:'-20%'
    },
    count:{
      fontSize:14,
      flex:1,
      alignSelf:'center',
      color:"#6666ff"
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
      padding:10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "white",
      borderWidth:1,
      borderColor:"#dcdcdc",
    },
    followButtonText:{
      color: "#dcdcdc",
      fontSize:12,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        backgroundColor: 'rgba(1, 0, 102, 0.88)',
        width: 320,
        height: 345,
     },
     text: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
        alignSelf: 'center',
        paddingLeft: 18,
     },
     header:{
        color: '#fff',
        marginTop: -15,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
     },
     modal_view:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(100, 100, 100,0.45)',
     }
 });

