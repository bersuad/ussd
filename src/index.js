import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens
import Screen1 from './Spalash';
import Screen2 from './home';


//Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

// load vector icon 
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
import Logo from './../assets/images/header_image.png';
global.currentScreenIndex = 0;

class NavigationDrawerStructure extends Component {


  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {

    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon
            name="md-menu"
            color={'#fff'}
            size={35}
            style={{ marginLeft: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const FirstActivity_StackNavigator = createStackNavigator({

  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F69139',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: () => <Image source={Logo} style={{ width: 135, height: 35, marginLeft: 0 }} />,
      header: null
    }),
  },
});

// Stack Navigator for the Second Option of Navigation Drawer
const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Second Option will be indexed here
  Second: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#F69139',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitle: () => <Image source={Logo} style={{ width: 135, height: 35, marginLeft: 0 }} />,
    }),
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    NavScreen1: {
      screen: FirstActivity_StackNavigator,
    },
    NavScreen2: {
      screen: Screen2_StackNavigator,
    },

  },
  {

    contentComponent: CustomSidebarMenu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 125,
  }
);


const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      flexDirection: 'row',
    },
    SplashScreen_RootView:
    {
      justifyContent: 'center',
      flex: 1,
      margin: 10,
      position: 'absolute',
      width: 1000,
      height: 2000,
      backgroundColor: '#FFFFFF'
    },
    Image: {
      height: 200,
      width: '100%',
      resizeMode: 'center',
      alignSelf: "center",
      alignContent: "center",
      marginTop: '70%',
      marginLeft: '36%',
      bottom: 0,
      top: 0,
    },
    SplashScreen_ChildView:
    {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      flex: 1,
    },
  });

export default createAppContainer(DrawerNavigator);