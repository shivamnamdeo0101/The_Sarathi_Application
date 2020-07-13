import React, { Component} from "react";
import {View,Text,StyleSheet,Image, SafeAreaView,Share,Button,Linking} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {StatusBar} from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';



export default class MessageScreen extends React.Component{

    
    render(){

        
        const { navigation } = this.props;  
        const text = navigation.getParam('text', 'NO-text');  
        const image = navigation.getParam('image', 'NO-Image');  
        const time = navigation.getParam('time', 'NO-Time');  

        
        const onShare = async () => {
          FileSystem.downloadAsync(
            image,
            FileSystem.documentDirectory  + '.jpeg'
          )
            .then(({ uri }) => { 
                console.log('Finished downloading to ', uri);

                const options ={
                  url:uri,
                  message:text,
                }

                let url = 'whatsapp://send?text='+encodeURIComponent(uri);
                Linking.openURL(url);
               // Share.share(url);
                //Sharing.shareAsync(uri); 
            })
            .catch(error => {
              console.error(error); 
            });
          };


        return(

            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <Image source={{uri: image}} style={styles.image} />
                <Ionicons onPress={()=>navigation.goBack()} style={styles.back} name="ios-close"/>
                <Ionicons onPress={() =>onShare()} style={styles.share} name="md-share"/>
               
                <View style={styles.cover_text}>
                    
                    <Text style={styles.time}>{time}</Text>
                    <SafeAreaView>
                        <ScrollView>
                            <Text style = {styles.item}>{text}</Text>
                        </ScrollView>   
                    </SafeAreaView>
                    
                </View>
                
                
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:20
    },
    image: {
     
      justifyContent: "center",
      width:undefined,
      height:"40%",
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20,
     
      
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom:"80%",

        
     },
    back: {
      color: "#fff",
      fontSize: 50,
      top:-230,
      marginLeft:25,
      fontWeight: "bold",
      
    },
    share: {
        color: "#fff",
        fontSize: 30,
        top:-270,
        marginLeft:"85%",
        fontWeight: "bold",
        
      },
    cover_text:{
        marginTop:-50,
        padding:10,
        paddingBottom:100,
        

    },
    time:{
        fontSize:11,
        color:"#C4C6CE",
        marginTop:4,
        marginBottom:4,
        textAlign:"left",
    }
  });
  