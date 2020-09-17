import React, { Component, Fragment } from 'react';
// import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    Image,
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import SendSMS from 'react-native-sms'
import SmsAndroid from 'react-native-get-sms-android';


export default class  SendSMSContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          message: ''
      };
  }
  async _alert() {

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: "SMS Permission",
            message:
              "Awash Bank needs access to your message " +
              "so it can use it to top-up your mobile banking transaction SMS.",
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

  getSMS = () => {
      const copy = []; 
      let filter = {
          box: '', 
          address: 'Awash Bank', // sender's phone number
          
          indexFrom: 0, // start from index 0
          maxCount: 99, // count of SMS to return each time
      };
      SmsAndroid.list(
          JSON.stringify(filter),
          (fail) => {
              console.log('message');
              console.log('Failed with this error: ' + fail);
          },
          (count, smsList) => {
              // console.log('Count: ', count);
              // console.log('List: ', smsList);
              var arr = JSON.parse(smsList);

              arr.forEach(function (object) {
                  copy.push(<View style={styles.Messagecontent} ><Text style={styles.Messagetext}>{object.body}</Text></View>); 
                  // alert(object.body)
              });
              this.setState({body: copy});
              
          },
      );
  }


  render() {
    // console.log);
    return (
      <View style={styles.scrollViewStyle}>

            <StatusBar barStyle = "white-content" hidden = {false} backgroundColor = "#010066" translucent = {true}/>
              
            <View style={styles.cardView} >
                
                <ScrollView onPress={this.getSMS()} style={styles.buttonTouchableRead}>
                    {this.state.body}
                </ScrollView>
                
            </View>              
          
      </View >

  );
  }
}
          

const styles = StyleSheet.create({
  Messagecontent:{
    backgroundColor:'#f69139',
    marginTop: 10,
    marginRight: 25,
    marginLeft: 40,
    paddingTop: 20,
    paddingBottom:20,
    paddingLeft: 30,
    paddingRight:10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 50,
    borderTopLeftRadius:50,
    borderTopRightRadius: 30
  },
  Messagetext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "600",
    marginTop: 0
  },
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