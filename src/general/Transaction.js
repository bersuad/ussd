import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
export default class Transaction extends React.Component{
    state = {
        isVisible: false, //state of modal default false
    }
    async _block(){
            this._closeBlock();
            RNImmediatePhoneCall.immediatePhoneCall(`*901*${this.state.pincode}*8*6#`);                
    }
    _closeBlock() {
        this.props._closeBlockModal()
    }
    
    render(){
        return(
            
            <View 
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.modal_view}
            >
                <View style = {styles.modal}>
                    <Text style={styles.header}>Block Transaction</Text>
                    <Text style = {styles.text}>Please Enter your pincode</Text>
                    <TextInput
                    onChangeText={(text) => this.setState({pincode:text})}
                            returnKeyLabel = {"Next"}
                            placeholder='Pin Code'
                            keyboardType={'numeric'}
                            maxLength={4}
                            style={styles.text}
                            placeholderTextColor={'#fff'}
                            return
                            secureTextEntry={true}
                    style={styles.textInput}
                    />
                    <TouchableOpacity
                        style={styles.close}
                        onPress = {() => this._closeBlock()}
                    >
                        <Text style={styles.btnText}>Cancle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.sendBtn}
                        onPress={()=>this._block()}
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
        justifyContent: 'center',
        alignItems:'center',
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
        justifyContent: 'center',
        alignItems:'center',
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
        height: 300,
     },
     text: {
        color: '#fff',
        marginTop: 10
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

