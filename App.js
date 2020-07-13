import React from 'react';
import FirebaseKeys from './config';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import PostScreen from './screens/PostScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditScreen from './screens/EditScreen';
import CollegeFormScreen from './screens/CollegeFormScreen';
import ImagePreview from './screens/ImagePreview';
import * as firebase from 'firebase'

var firebaseConfig = FirebaseKeys;

const AppContainer = createStackNavigator(

  
  {
    default: createBottomTabNavigator(
      {
        
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={24} color={tintColor} />
          }
        },

        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) =>
              <Ionicons
                name="ios-add-circle"
                size={48}
                color="#aa89fa"
                style={{
                  shadowColor: "#ff787f",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 10,
                  shadowOpacity: 0.3
                }} />
          }
        },
       
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
          }
        },
        
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("postModal")
            } else {
              defaultHandler();
            }
          }
        },
        tabBarOptions: {
          activeTintColor: "#161F3D",
          inactiveTintColor: "#B8BBC4",
          showLabel: false,

        },
        
        initialRouteName:"Home"
      },
    ),
    postModal: {
      screen: PostScreen
    },
    Notification: {
      screen: NotificationScreen,
    },
    Message: {
      screen: MessageScreen,
    },
    Edit: {
      screen: EditScreen,
    },
    CollegeForm:{
      screen:CollegeFormScreen,
    },
    ImagePreview:{
      screen:ImagePreview,
    },
    
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
   
  },
  {
    initialRouteName:"Login",
    
  }

);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack,
      
    },
    {
      initialRouteName: "Loading"
    },
  )
);