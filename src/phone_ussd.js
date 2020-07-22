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
import { SuperGridSectionList } from 'react-native-super-grid';
// import 'react-native-gesture-handler';

export default class FlexDirectionBasics extends Component {
  state = {
    isVisible: false, //state of modal default false
  }
  constructor(props){
    super(props)

    this.state = {
        pincode: '',
        password: '',
        isVisible: false,
        modalVisible:false,
        userSelected:[],
        items:[
            {
                data: [
          {id:1,  name: "Check Balance", url:`*901*${this.state.pincode}*1*2#`,         image:require("./../assets/images/bonds.png"),   count:'isVis'},
          {id:2,  name: "Mobile Card", url:"",  image:require("./../assets/images/mobile-payment.png"),        count:114.888} ,
          {id:3,  name: "Send Mobile Card", url:"",  image:require("./../assets/images/send_card.png"),        count:114.888} ,
          {id:4,  name: "Money Transfer",url:``,         image:require("./../assets/images/transfer.png"),        count:114.888} ,
          {id:5,  name: "Withdraw Cash", url:"linking",           image:require("./../assets/images/initiate-money-transfer.png"), count:324.723} ,
          {id:8,  name: "Send Money", url:"linking",            image:require("./../assets/images/money-transfer.png"),        count:334.788} ,
          {id:6,  name: "Trafic Penality", url:`*901*`,         image:require("./../assets/images/traffic.png"),       count:234.722},
          {id:9,  name: "DSTV Payment", url:"linking",         image:require("./../assets/images/dstv.png"),    count:154.573} ,
          {id:7,  name: "Exchange Rate", url:"linking",         image:require("./../assets/images/exchange.png"),    count:154.573} ,
          {id:10,  name: "Air Ticket", url:"linking",            image:require("./../assets/images/plane.png"),        count:334.788} ,
          {id:11,  name: "Mini Statement", url:"linking",         image:require("./../assets/images/mini_statement.png"),    count:154.573} ,
        //   {id:11,  name: "Send Money", url:"linking",            image:require("./../assets/images/money-transfer.png"),        count:334.788} ,
        //   {id:12,  name: "Exchange Rate", url:"linking",         image:require("./../assets/images/exchange.png"),    count:154.573} ,
        //   {id:13,  name: "Send Money", url:"linking",            image:require("./../assets/images/money-transfer.png"),        count:334.788} ,
        //   {id:14,  name: "Exchange Rate", url:"linking",         image:require("./../assets/images/exchange.png"),    count:154.573} ,
          
        ]}]
      };
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
              RNImmediatePhoneCall.immediatePhoneCall(`*901*${this.state.pincode}*1*1#`);
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
    clickEventListener = (item) => {
        // Alert.alert('Message', 'Item clicked. '+item.name);
        // const url=item.url;
        RNImmediatePhoneCall.immediatePhoneCall(`*804#`);
                
        prompt:true
      }
  
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={styles.MainContainer}>
        <Modal animationType = {"slide"} transparent = {true}
          visible = {this.state.isVisible}
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View 
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.modal_view}
        >
            <View style = {styles.modal}>
              <Text style = {styles.text}>Please Enter your M.B pincode</Text>
                
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
                  onPress = {() => {
                      this.setState({ isVisible:!this.state.isVisible})
                  }}
              >
                  <Text style={styles.btnText}>Cancle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={()=>this._alert()}
              >
                  <Text style={styles.btnText}>Send</Text>
              </TouchableOpacity>
              </View>
            </View>
        </Modal>
        
        <SuperGridSectionList        
            itemDimension={124}     
            sections={this.state.items}
            keyExtractor= {(item) => {
            return item.id.toString();
            }}
            style={styles.gridView}
            renderItem={({item}) => {
            return (
                <View style={styles.listGrid}>
                    <TouchableOpacity style={styles.card} onPress ={()=>{this.setState({ isVisible: true})}}>
                        {/* onPress ={()=>{this.setState({ isVisible: true})}} */}
                        <Image style={styles.image} source={item.image}/>
                        <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>            
            )}}/>
        
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
        height: 300,
     },
     text: {
        color: '#fff',
        marginTop: 10
     },
     modal_view:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(100, 100, 100,0.45)',
     }
 });

