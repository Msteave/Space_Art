import React from 'react';
import Login from './elements/User/Login';
import Register from './elements/User/Register';
import  Profile  from './elements/User/Profile';
import UpdateProfile from './elements/User/Update/UpdateProfile';
import AddAudio from './elements/User/Add/AddAudio';
import AddVideo from './elements/User/Add/AddVideo';
import Test from './elements/test';
import Loading from './elements/Loading/Loading';
import Disconnected from './elements/Loading/Disconnected';
import {createStackNavigator, createAppContainer} from "react-navigation";

const App = createStackNavigator({



  Login: {
    screen: Login,
    navigationOptions:{
      header: null,
    }
  },

  Profile: {
    screen: Profile,
    navigationOptions:{
      header: null,
    }
  },

  UpdateProfile: {
    screen: UpdateProfile,
    navigationOptions:{
      header: null,
    },
  },


  Test: {
    screen: Test,
    navigationOptions:{
      header: null,
    }
  },

  Register: {
    screen: Register,
    navigationOptions:{
      header: null,
    }
  },



  Disconnected: {
    screen: Disconnected,
    navigationOptions:{
      header: null
    }
  },

  Loading: {
    screen: Loading,
    navigationOptions:{
      header: null,
    }
  },


  AddAudio:{
    screen: AddAudio,
    navigationOptions:{
      header: null,
    }
  },

  AddVideo:{
    screen: AddVideo,
    navigationOptions:{
      header: null,
    }
  },



});

export default createAppContainer(App);
