import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

//Import all the screens
import Screen1 from './home';


//Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

global.currentScreenIndex = 0;
//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Icon  
            name="md-menu"
            color={'#fff'}  
            size={36}  
            style={{marginLeft: 20}}
          />  
        </TouchableOpacity>
        {/* <Image source={require('./../assets/images/awash.png')} style={{width: 40, height:40, marginLeft:50}}/> */}
      </View>
    );
  }
}

//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      // title: 'Home',
      headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F69139',
      },
      headerTintColor: '#fff',
      headerTitleAlign:'left',
      headerTitle:()=><Image source={require('./../assets/images/header_image.png')} style={{width: 140, height:40, marginLeft:50}}/>,
    }),
  },
});

//Stack Navigator for the Second Option of Navigation Drawer
// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Second Option will be indexed here
//   Second: {
//     screen: Screen2,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 2',
//       headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

//Stack Navigator for the Third Option of Navigation Drawer
// const Screen3_StackNavigator = createStackNavigator({
//   //All the screen from the Third Option will be indexed here
//   Third: {
//     screen: Screen3,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Demo Screen 3',
//       headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: '#FF9800',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

//Drawer Navigator Which will provide the structure of our App
const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        // drawerLabel: 'Demo Screen 1',
      },
    },
    
  },
  {
    
    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 128,
  }
);
export default createAppContainer(DrawerNavigator);