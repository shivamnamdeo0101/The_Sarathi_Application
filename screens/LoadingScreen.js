import React from 'react';
import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native';
import firebase from "firebase";
import Fire from "../Fire";
export default class LoadingScreen extends React.Component {
  
    // Checking User States For Signed In 
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "App":"Auth");
    })
  }

  render(){
    return(
      
      //Loading
      <View style={styles.container }>
        <Text>
          Loading...
        </Text>
        <ActivityIndicator size="small"></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  }

});

