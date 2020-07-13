import React,{Component} from "react";
import {View,Text,StyleSheet,TouchableOpacity,TextInput,Button,StatusBar} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { FontAwesome5 ,AntDesign,MaterialIcons } from '@expo/vector-icons';

 
export default class EditScreen extends Component {  

  
    render() {  
        return (  
            
            <View style={styles.container}>  

                <StatusBar barStyle="light-content"></StatusBar>

                <View style={styles.back}>  
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <AntDesign name="leftcircleo" size={38} color="#444449" />
                    </TouchableOpacity>
                </View>


                <View style={{width:"80%",height:50,backgroundColor:"#FFF",
                    justifyContent:"center",alignSelf:"center",borderRadius:20,marginTop:30}}>
                    <Text style={{fontSize:20,textAlign:"center",color:"#444449"}}>ARE YOU IN...?</Text>
                </View>
               
                <View style={styles.innerContainer}>  

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CollegeForm')}>
                        <Ionicons name="ios-school" size={80} color="#444449" />
                        <Text  style={{fontSize:20,paddingLeft:10,paddingTop:10,color:"#444449"}}>COLLEGE</Text>
                    </TouchableOpacity>

                    <Text style={{fontSize:20,color:"#444449"}}>
                        OR
                    </Text>

                    <TouchableOpacity>
                        <FontAwesome5 name="school" size={60} color="#444449" />
                        <Text>            </Text>
                        <Text style={{fontSize:20,paddingLeft:10,paddingTop:10,color:"#444449"}}>SCHOOL</Text>
                    </TouchableOpacity>


                </View>  
                    
                <TouchableOpacity style={{width:"80%",height:50,backgroundColor:"#aa89fa",
                    
                    justifyContent:"center",alignSelf:"center",borderRadius:20,marginBottom:60}}>
                    
                    <Text style={{fontSize:20,textAlign:"center",color:"#fff"}}>NEXT</Text>
  
                </TouchableOpacity>
         
            </View>  
        );  
    }  
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex:1,
        borderRadius:10,
        backgroundColor: "#f0f3f5",  
        padding:30
    },  
    innerContainer:{  
        flex: 1,  
        width: "100%",  
        flexDirection: "row",  
        justifyContent: "space-around",  
        alignItems: "center" ,
        marginBottom:150,

    },
    back:{
        width: "100%",  
        flexDirection: "row",  
        justifyContent: "space-between",  
        alignItems: "center" ,
    },

});  