import React, { Component } from 'react';
import {
  Modal, 
  View, 
  Alert, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  PermissionsAndroid, 
  Image,
  BackHandler
  } from 'react-native';
import { SuperGridSectionList } from 'react-native-super-grid';
import BalanceModal from './phone_ussd/MobileBalance';
import SendCard from './phone_ussd/SendCard';
import SendMoney from './phone_ussd/SendMoney';
import MiniStatement from './phone_ussd/MiniState';
import MobileCard from './phone_ussd/MobileCard';
import 'react-native-gesture-handler';
export default class FlexDirectionBasics extends Component {
  componentDidMount(){
    this._alert()
  }
  
  async _alert(){
    
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            {
                title: "Phone Call Permission",
                message:
                    "Awash Bank needs access to your phone call " +
                    "so it can use it to top-up your mobile banking sysytem when requested.",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
        } else {
          BackHandler.exitApp()
        }
    } catch (err) {
        alert("Error occured while requesting permission for phone call.");
    }
  }
  constructor(props){
    super(props)

    this.state = {
        pincode: '',
        password: '',
        amount:'',
        balance:false,
        cardModal: false,
        sendCard:false,
        sendMoney:false,
        miniStatement:false,
        userSelected:[],
        items:[
            {
                data: [
          {id:1,  name: "Check Balance",          image:require("./../assets/images/bonds.png"),                  },
          {id:2,  name: "Mobile Card",            image:require("./../assets/images/mobile-payment.png"),         } ,
          {id:3,  name: "Send Mobile Card",       image:require("./../assets/images/send_card.png"),              } ,
          {id:4,  name: "Money Transfer",         image:require("./../assets/images/transfer.png"),               } ,
          {id:5,  name: "Mini Statement",         image:require("./../assets/images/mini_statement.png"),         } ,
          
        ]}]
      };
  }
  
     
    clickEventListener = (item) => {
      if (item === 1) {
        this.setState({ balance: true})
      } else if(item === 2) {
        this.setState({ cardModal: true})
      }else if(item === 3){
        this.setState({ sendCard: true})
      }else if(item === 4){
        this.setState({ sendMoney: true})
      }else if(item === 5){
        this.setState({ miniStatement: true})
      }else{
        Alert.alert('Nothing')
      }
                
        prompt:true
      }
      // closing modals
      closeModal(){
        this.setState({ balance:!this.state.balance})
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
      
     
      closeCardModal(){
        this.setState({ cardModal:!this.state.cardModal})
      }
  
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={styles.MainContainer}>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.balance}
                onRequestClose = {() =>{ this.setState({ balance:!this.state.balance}) } }>
          <BalanceModal closeModal={() => this.closeModal()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
          visible = {this.state.cardModal}
          onRequestClose = {() =>{ this.setState({ cardModal:!this.state.cardModal}) } }>
            <MobileCard closeMobleCard={()=>this.closeCardModal()}/>
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

