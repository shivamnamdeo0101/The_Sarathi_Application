import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation,Image } from 'react-native';
import Fire from "../Fire";
import firebase from "firebase";

export default class ProfileScreen extends React.Component {

    static navigationOptions = {
        headerShown: false,
    };
    
    state = {
        user:{}
    };
    componentDidMount() {
        const user  = this.props.uid || Fire.shared.uid;
        
        Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc=>{
            
            this.setState({user:doc.data()});
            
        });

    };
    signOutUser = () => {
        firebase.auth().signOut();
    };
    
    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.edit} onPress={() => this.props.navigation.navigate("Edit")}>
                    <Text style={{color:"#fff"}}>Edit</Text>
                </TouchableOpacity>



                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={ require("../assets/page/user.png")}/>
                </View>
               
                <View  style={styles.text}>
                <Text>Hi</Text>
                </View>

                <View style={styles.text}>
                    <Text>N</Text>
                </View>
                
                <TouchableOpacity style={{alignSelf:"center"},styles.logout} onPress={this.signOutUser}>
                    <Text style={{color:"#FFF",fontSize:20}}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        marginTop:70
    },
    logout:{
        marginTop:20,
        width:undefined,
        height:50,
        borderRadius:16,
        backgroundColor:"#aa89fa",
        alignItems:"center",
        justifyContent:"center",
        padding:20,
        
      },
      edit:{
        marginTop:-40,
        width:undefined,
        height:50,
        borderRadius:16,
        backgroundColor:"#aa89fa",
        alignItems:"center",
        justifyContent:"center",
        padding:20,
        marginLeft:"70%"
      },
      text:{
        marginTop:20,
        width:"80%",
        height:50,
        borderRadius:16,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
        padding:30,
      },
      avatar:{
        width:150,
        height:150,
        borderRadius:75,
        borderWidth:5,
        borderColor:"#f0f0f0",
        
        
      },
      avatarContainer:{
        borderWidth: 1,
        borderRadius: 75,
        borderColor: '#ddd',
        shadowColor: '#f03',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 50,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
      }
   
})