//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import Pincode from './general/PinCode';

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.proileImage ='./../assets/images/awash.png';
    this.state={
      pinModal:false,
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
      },
      {
        navOptionThumb: 'smartphone',
        navOptionName: 'Change App Language',
      },
      {
        navOptionThumb: 'block',
        navOptionName: 'Block Transaction',
      },
      {
        navOptionThumb: 'share',
        navOptionName: 'Share',
      },
    ];
  }
  clickEventListener = (item) => {
    if (item === 1) {
      this.setState({ pinModal: true})
    }
  }
  closeModal() {
    this.setState({ pinModal:!this.state.pinModal})
  }
  render() {
    return (
      <View style={styles.sideMenuContainer}>
        <Modal animationType = {"slide"} transparent = {true}
                visible = {this.state.pinModal}
                onRequestClose = {() =>{ this.setState({ pinModal:!this.state.pinModal}) } }>
          <Pincode closePincodeModal={() => this.closeModal()}/>
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
                  fontSize: 15,
                  color: global.currentScreenIndex ? '#FFFFFF' : '#010066',
                }}
                onPress ={()=>this.setState({ pinModal: true})}>
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