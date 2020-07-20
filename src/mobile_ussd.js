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
  FlatList, 
  TouchableOpacity, 
  Image,
  } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
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
        data: [
          {id:1,  name: "Check Balance", url:`*901*${this.state.pincode}*1*2#`,         image:require("./../assets/images/bonds.png"),   count:124.711},
          {id:7,  name: "Mobile CardTransfer", url:"",  image:require("./../assets/images/mobile-payment.png"),        count:114.888} ,
          {id:8,  name: "Cash Withdraw",url:``,         image:require("./../assets/images/money-transfer.png"),        count:114.888} ,
          {id:2,  name: "Home Payments", url:`*901*`,         image:require("./../assets/images/real-estate.png"),       count:234.722},
          {id:3,  name: "Mobile Card", url:"linking",           image:require("./../assets/images/initiate-money-transfer.png"), count:324.723} ,
          {id:4,  name: "Exchange Rate", url:"linking",         image:require("./../assets/images/exchange.png"),    count:154.573} ,
          {id:6,  name: "Send Money", url:"linking",            image:require("./../assets/images/money-transfer.png"),        count:334.788} ,
          
        ]
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
    clickEventListener = (item) => {
        // Alert.alert('Message', 'Item clicked. '+item.name);
        // const url=item.url;
        RNImmediatePhoneCall.immediatePhoneCall(`*804#`);
                
        prompt:true
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
        //flexGrow: 1,//describes how any space within a container should be distributed among its children along the main axis
        flexShrink: 0,
        backgroundColor: '#FFFFFF'
      }}>
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
        <View style={styles.gridView}>
            <FlatList 
                style={styles.contentList}
                columnWrapperStyle={styles.listContainer}
                data={this.state.data}
                keyExtractor= {(item) => {
                return item.id.toString();
                }}
                renderItem={({item}) => {
                return (
                    <View style={styles.listGrid}>
                        <TouchableOpacity style={styles.card} onPress={() => {this.setState({ isVisible: true})}}>
                            {/* onPress ={()=>{this.setState({ isVisible: true})}} */}
                            <Image style={styles.image} source={item.image}/>
                            <View style={styles.cardContent}>
                            <Text style={styles.name}>{item.name}</Text>
                            {/* <Text style={styles.count}>{item.count}</Text> */}
                            {/* <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                                <Text style={styles.followButtonText}>Explore now</Text>  
                            </TouchableOpacity> */}
                            </View>
                        </TouchableOpacity>
                    </View>            
                )}}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    gridView:{
        justifyContent: 'center',
        flex:1,
        margin: 10,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        width:'100%'
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
        padding:6.4,
        borderRadius: 30,
    },
    close:{
        position:'absolute',
        bottom:10,
        right:120,
        color:'#fff',
        backgroundColor:'rgba(1, 0, 102,0.55)',  
        height:30,
        width:100,
        color: '#010066',
        alignItems:'center',
        padding:6.4,
        borderRadius: 30,
    },
    btnText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'bold'
    },
    textInput: {
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
      width:'40%',
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
        backgroundColor: 'rgba(1, 0, 102, 0.8)',
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
      alignItems: 'center'
     }
 });

