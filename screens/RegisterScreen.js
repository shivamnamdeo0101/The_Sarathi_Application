import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image,StatusBar,LayoutAnimation} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons";
import UserPermissions from "../Utilities/UserPermissions";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";


export default class RegisterScreen extends React.Component {

  //Remove Unwanted Header
  static navigationOptions = {
    headerShown:false
  };

    state = {
      user:{
        name:"",
        email:"",
        password:"",
        avatar:null,
      },
      
      errorMessage:null
    }
  
  //User States
  
  handlePickAvatar = async ()=>{
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
        this.setState({user:{...this.state.user,avatar:result.uri}});
    }
  };

  //Signup Function
  handleSignup = () =>{
    Fire.shared.createUser(this.state.user);
  };
  
  render(){

    LayoutAnimation.easeInEaseOut();
    return(


      <View style={styles.container }>
         
         
          {/*Status Bar Light Content Color */}
          <StatusBar barStyle="light-content"></StatusBar>
          

          {/*back button */}
          <TouchableOpacity style={styles.back} onPress={()=>
            this.props.navigation.navigate("Login")
          }>
           <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"> </Ionicons>
          </TouchableOpacity>

          {/* Avatar Add Button */}
          <View style={{position:"absolute",top:-20,alignItems:"center",width:"100%"}
        
          }
          isRequired={true}
          >
              <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                <Image style={styles.avatar} source={this.state.user.avatar ? { uri: this.state.user.avatar } : require("../assets/page/user.png")}/>
                <Ionicons name = "ios-add" size={40} 
                color="#FFF"
                style={{alignSelf:"center"}}
                ></Ionicons>
              </TouchableOpacity>
          </View>

       {/* Sign Up Form*/}

      <View style={styles.form}> 
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput 

          style={styles.input} 
          autoCapitalize="none"
          onChangeText={name=>this.setState({user:{...this.state.user,name}})}
          value={this.state.user.name}

          ></TextInput>
        </View>

        <View style={{marginTop:32}}> 
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput 

          style={styles.input} 
          autoCapitalize="none"
          onChangeText={email=>this.setState({user:{...this.state.user,email}})}
          value={this.state.user.email}

          ></TextInput>
        </View>

        

        <View style={{marginTop:32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput 
          style={styles.input}
           secureTextEntry
          autoCapitalize="none"
          onChangeText={password=>this.setState({user:{...this.state.user,password}})}
          value={this.state.user.password}

           ></TextInput>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignup}>
          <Text style={{color:"#FFF",fontWeight:"500"}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignSelf:"center",marginTop:32}} 
          onPress={()=>
            this.props.navigation.navigate("Login")
          }
        >
          <Text style={{color:"#414959",fontSize:13}}>
            Already Have Account ? <Text style={{fontWeight:"500",color:"#1a95e8"}}>Login</Text>
          </Text>
        </TouchableOpacity>

         {/* Sign Up Form*/}

          {/* Error Mesagge*/}
         <View style={styles.errorMessage}> 
           {
            this.state.errorMessage &&
             <Text style={styles.error}>
               {this.state.errorMessage}
             </Text>
           }
         </View>


      </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#343434",
    
  },

  error:{
    color:"#f74343",
    fontSize:13,
    fontWeight:"600",
    textAlign:"center",

  },
  errorMessage:{
   
    alignItems:"center",
    justifyContent:"center",
 
  },
  form:{
    marginHorizontal:30,
    backgroundColor:"#f0f3f5",
    padding:45,
    marginTop:140,
    borderRadius:50,
  },
  inputTitle:{
    color:"#8A8F9E",
    fontSize:10,
    textTransform:"uppercase",
  },
  input:{
   borderBottomColor:"#8A8F9E",
   borderBottomWidth:StyleSheet.hairlineWidth,
   height:40,
   fontSize:15,
   color:"#161F30" ,
  },
  button:{
    marginTop:32,
    backgroundColor:"#1a95e8",
    borderRadius:20,
    height:52,
    alignItems:"center",
    justifyContent:"center",
  },
  back:{
    position:"absolute",
    top:30,
    left:"5%",
    width:50,
    height:50,
    borderRadius:16,
    backgroundColor:"#434343",
    alignItems:"center",
    justifyContent:"center",
  },
  avatar:{
    position:"absolute",
    width:100,
    height:100,
    borderRadius:50,
  },
  avatarPlaceholder:{
    width:100,
    height:100,
    backgroundColor:"#E1E2E6",
    borderRadius:50,
    marginTop:48,
    justifyContent:"center",
    alignItems:"center",
  },

})
