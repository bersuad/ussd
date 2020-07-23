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
import BalanceModal from './w_ussd/MobileBalance';
import SendCard from './w_ussd/SendCard';
import SendMoney from './w_ussd/SendMoney';
import MiniStatement from './w_ussd/MiniState';
// import 'react-native-gesture-handler';
export default class FlexDirectionBasics extends Component {
  
  constructor(props){
    super(props)

    this.state = {
        pincode: '',
        password: '',
        amount:'',
        isVisible:false,
        cardModal: false,
        sendCard:false,
        sendMoney:false,
        modalVisible:false,
        miniStatement:false,
        userSelected:[],
        items:[
            {
                data: [
          {id:1,  name: "Check Balance", url:"",         image:require("./../assets/images/bonds.png"),   count:1234},
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
                        "Awash Bank needs access to your phone call " +
                        "so it can use it to top-up your mobile credits when requested.",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // console.log(this.state.pincode); 
              this.setState({ cardModal:!this.state.cardModal});
              RNImmediatePhoneCall.immediatePhoneCall(`*901*${this.state.pincode}*2*2*1*1*${this.state.amount}*1#`);
              
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
    // _close(){
    //     this.setState({ isVisible:false})
    // }
    
    clickEventListener = (item) => {
      if (item === 1) {
        console.log(item);
        this.setState({ isVisible: true})
        
        } else if(item === 2) {
          this.setState({ cardModal: true})
        }else if(item === 3){
          this.setState({ sendCard: true})
        }else if(item === 4){
          this.setState({ sendMoney: true})
        }else if(item === 11){
          this.setState({ miniStatement: true})
        }else{
          Alert.alert('Nothing')
        }
        // const url=item.url;
        // RNImmediatePhoneCall.immediatePhoneCall(`*804#`);
                
        prompt:true
      }
      // closing modals
      closeModal(){
        this.setState({ isVisible:!this.state.isVisible})
      }
      closeSend() {
        this.setState({ sendCard:!this.state.sendCard})
      }
      closeSendMoney() {
        this.setState({ sendMoney:!this.state.sendMoney})
      }
      closeMiniState() {
        this.setState({ miniStatement:!this.state.miniStatement})
      }
  
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={styles.MainContainer}>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.isVisible}
                onRequestClose = {() =>{ this.setState({ isVisible:!this.state.isVisible}) } }>
          <BalanceModal closeModal={() => this.closeModal()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.sendCard}
                onRequestClose = {() =>{ this.setState({ sendCard:!this.state.sendCard}) } }>
          <SendCard closeSend={() => this.closeSend()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.sendMoney}
                onRequestClose = {() =>{ this.setState({ sendMoney:!this.state.sendMoney}) } }>
          <SendMoney closeSend={() => this.closeSendMoney()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.miniStatement}
                onRequestClose = {() =>{ this.setState({ miniStatement:!this.state.miniStatement}) } }>
          <MiniStatement closeMiniState={() => this.closeMiniState()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
          visible = {this.state.cardModal}
          onRequestClose = {() =>{ this.setState({ cardModal:!this.state.cardModal}) } }>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.modal_view}
          >
            <View style = {styles.modal}>
              <Text style = {styles.text}>Please Enter your wallet pincode</Text>
                
              <TextInput
                onChangeText={(text) => this.setState({pincode:text})}
                      returnKeyLabel = {"Next"}
                      placeholder='Pin Code'
                      keyboardType={'numeric'}
                      maxLength={4}
                      style={styles.text}
                      placeholderTextColor={'#fff'}
                      // ref={(input)=>this.secondTextInput = input}
                      secureTextEntry={true}
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
                      // returnKeyType="next"
                style={styles.textInput}
              />
              
              <TouchableOpacity
                  style={styles.close}
                  onPress = {() => {
                      this.setState({ cardModal:!this.state.cardModal})
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
                    <TouchableOpacity style={styles.card} onPress ={()=>this.clickEventListener(item.id)}>
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
        minHeight: 330,
        maxHeight:600,
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

