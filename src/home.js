
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';  
// import { FontAwesome5 } from 'react-native-vector-icons/vector-icons'; 
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Mobile from './mobile_ussd';
import Phone from './phone_ussd';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#F69139',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#010066',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: 16,
        },
        indicatorStyle: {
          borderBottomColor: '#F69139',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="Mobile"
        component={Mobile}
        options={{
          showIcon:true,
          tabBarLabel: 'Bank Account',
          tabBarIcon: (
            <Icon  
              name="md-menu"
              color={'#fff'}  
              size={30}  
              style={{marginLeft: 100}}
            />  
          ),
        }}  />
      <Tab.Screen
        name="Phone"
        component={Phone}
        options={{
          tabBarLabel: 'M-Wallet',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{
          headerStyle: { backgroundColor: '#F69139', height: 0, },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen name=" " component={TabStack}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;