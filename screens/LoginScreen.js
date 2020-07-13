import React,{useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image,StatusBar,LayoutAnimation,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from "firebase";
import {Ionicons} from "@expo/vector-icons";
import * as Google from 'expo-google-app-auth';
import Fire from "../Fire";

export default class LoginScreen extends React.Component {

  //Remove Unwanted Header
  static navigationOptions = {
    headerShown:false
  };

  constructor(props) {
    super(props)
    this.state={
      user:null
    }
  }


  handleSignup = (user) =>{
    Fire.shared.createUser(user);
     
   

  };


  signInWithGoogle= async (user) => {
    if (user){
      this.props.navigation.navigate("Home");
    }
  }

    signInWithGoogleAsync= async () => {
      try {
        const { type, user } = await Google.logInAsync({
          behaviour: 'web',
          androidClientId: '449017823723-s6rcaq58ct97s9d57q7kevns8f978vu1.apps.googleusercontent.com',
          scopes: ['profile', 'email'],
        })
        
       
        if (type === 'success') {
          this.setState({ 
            user 
          });
          this.handleSignup(user)
          
        }


          

          console.log(user.name);
          console.log(user.photoUrl);
          console.log(user.email);
      } catch ({ message }) {
        alert('login: Error:' + message);
      }
    }



  
  render(){

    LayoutAnimation.easeInEaseOut();
    return(

      <View style={styles.container }>
         


         {/*Status Bar Light Content Color */}
          <StatusBar barStyle="light-content"></StatusBar>




          {/* Header Image */}
          <Image source={require("../assets/page/img.png")}
          style={{
            alignSelf:"center",
            justifyContent:"center",
            width:"100%",
            height:"30%",
            marginBottom:-50,
            borderBottomLeftRadius:50,
            borderBottomRightRadius:50
        
          }}
          />
            
          <Text style={styles.greeting}></Text>
      
        {/**  Login Form*/}

      <View style={styles.form}> 
        <View>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput 

          style={styles.input} 
          autoCapitalize="none"
          onChangeText={email=>this.setState({email})}
          value={this.state.email}

          ></TextInput>
        </View>



        <View style={{marginTop:32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput 
          style={styles.input}
           secureTextEntry
          autoCapitalize="none"
          onChangeText={password=>this.setState({password})}
          value={this.state.password}

           ></TextInput>
        </View>



        {/*Login Button*/}
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{color:"#FFF",fontWeight:"500"}}>Sign In</Text>
        </TouchableOpacity>





        {/*Social Login*/}
        <Text style={{color:"#414959",fontSize:12,marginBottom:4,alignSelf:"center"}} >{`\n`}Sign in with</Text>
        <View style={{flexDirection:"row",alignSelf:"center",justifyContent:"space-evenly"}}>
        
        <TouchableOpacity style={styles.social} onPress={() =>this.signInWithGoogleAsync()}>
           <Ionicons name="logo-googleplus" size={20} color="#FFF"> </Ionicons>
        </TouchableOpacity>
        <Text>{`  `}</Text>
        <TouchableOpacity style={styles.social} >
           <Ionicons name="logo-linkedin" size={20} color="#FFF"> </Ionicons>
        </TouchableOpacity>
        <Text>{`   `}</Text>
        <TouchableOpacity style={styles.social} onPress={this.signInWithGoogle(this.state.user)}>
           <Ionicons name="logo-facebook" size={20} color="#FFF"> </Ionicons>
        </TouchableOpacity>
        <Text>{`   `}</Text>
        <TouchableOpacity style={styles.social}>
           <Ionicons name="logo-twitter" size={20} color="#FFF"> </Ionicons>
        </TouchableOpacity>
        
        </View>
        


          {/*Signup Login Switch*/}
        <TouchableOpacity style={{alignSelf:"center",marginTop:32}}
           onPress={()=>
            this.props.navigation.navigate("Register")
          }
        >
          <Text style={{color:"#414959",fontSize:13}}>
            New To The Sarathi ? <Text style={{fontWeight:"500",color:"#1a95e8"}}>Sign up</Text>
          </Text>
        </TouchableOpacity>


        {/**  Error Message*/}
        <View style={styles.errorMessage}> 
             {
              this.state.errorMessage &&
               <Text style={styles.error}>
                 {this.state.errorMessage}
               </Text>
             }
        </View>


         {/**  Login Form*/}

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
  greeting:{
    marginTop:32,
    fontSize:10,
    textAlign: "center",
   
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
    padding:50,
    marginTop:-30,
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
  social:{
    width:40,
    height:40,
    borderRadius:16,
    backgroundColor:"#343334",
    alignItems:"center",
    justifyContent:"center",
    padding:10,
  },

})
