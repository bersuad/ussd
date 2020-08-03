//This is an example code for Navigation Drawer with Custom Side bar//
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Modal, Share } from 'react-native';
import { Icon } from 'react-native-elements';
import Pincode from './general/PinCode';
import UssdLanguage from './general/UssdLang';
import Transaction from './general/Transaction';

export default class CustomSidebarMenu extends Component {
  
  constructor() {
    
    super();
    this.proileImage ='./../assets/images/awash.png';
    this.state={
      pinModal: false,
      language: false,
      stop:     false,
    }
    this.items = [
      {
        navOptionThumb: 'lock',
        navOptionName: 'Change Pincode',
        navID:'1'
      },
      {
        navOptionThumb: 'language',
        navOptionName: 'Change USSD Language',
        navID: '2'
      },
      {
        navOptionThumb: 'block',
        navOptionName: 'Stop Payment Request',
        navID: '3'
      },
      {
        navOptionThumb: 'share',
        navOptionName: 'Share',
        navID: '4'
      },
    ];
  }
  settingListener = (item) => {
    console.log(item);
    if (item == 1) {
      this.setState({ pinModal: true})
    }
    if (item == 2) {
      this.setState({ language: true})
    }
    if (item == 3) {
      this.setState({ stop: true})
    }
    if (item == 4) {
      this._share()
    }
  }
  closeLanguage(){
    this.setState({ language:!this.state.language})
  }
  closeModal() {
    this.setState({ pinModal:!this.state.pinModal})
  }
  closeTransaction() {
    this.setState({ stop:!this.state.stop})
  }

   async _share() {
    try {
      const result = await Share.share({
        message:'https://www.google.com'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.language}
                onRequestClose = {() =>{ this.setState({ language:!this.state.language}) } }>
          <UssdLanguage closeLangModal={() => this.closeLanguage()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.pinModal}
                onRequestClose = {() =>{ this.setState({ pinModal:!this.state.pinModal}) } }>
          <Pincode closePincodeModal={() => this.closeModal()}/>
        </Modal>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.stop}
                onRequestClose = {() =>{ this.setState({ stop:!this.state.stop}) } }>
          <Transaction _closeBlockModal={() => this.closeTransaction()}/>
        </Modal>
        {/*Top Large Image */}
        <Image
          source={require('./../assets/images/awash.png')}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={{color:'#010066', fontSize:20, paddingTop: 22}}>Awash Bank</Text>
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                // backgroundColor: global.currentScreenIndex === key ? '#7171bc' : '#ffffff',
              }}
              key={key}>
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#F69139" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: global.currentScreenIndex ? '#FFFFFF' : '#010066',
                }}
                onPress ={()=>this.settingListener(item.navID)}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});