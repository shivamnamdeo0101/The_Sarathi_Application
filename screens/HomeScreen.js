import React ,{useState}from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
  Button,LayoutAnimation , RefreshControl,StatusBar,Modal,ScrollView,
   FlatList,Image,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from "moment";
import firebase from "firebase";
import Constants from 'expo-constants';
import Fire from "../Fire";

const post_list = [];

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isDataLoaded: false,
      isFetching: false,
      user:{},
      
    }
  }

  onRefresh() {
    this.setState({ isFetching: true }, function() { this.searchRandomUser() });
 }
  
 searchRandomUser = async () =>{
    const RandomAPI = await fetch('https://randomuser.me/api/?results=20')
    const APIValue = await RandomAPI.json();
     const APIResults = APIValue.results
       console.log(APIResults[0].email);
       this.setState({
           data:APIResults,
           isFetching: false
       })

 }

  
  componentDidMount(){
    
    firebase.firestore()
    .collection('posts')
    .get()
    .then(doc => {
     doc.forEach(doc => {
        post_list.push({
          id: doc.data().uid,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          image: doc.data().image,
        }); 
      });
    });

    const user  = this.props.uid || Fire.shared.uid;

        Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc=>{
            this.setState({user:doc.data()});
        });

    
  
  }


    UNSAFE_componentWillMount(){
      this.searchRandomUser()
      this.setState({
      posts: post_list,
      isDataLoaded: true
    })
  }



  renderPost = post =>{
    return(
      
      <TouchableOpacity style={styles.feedItem}
      onPress={() =>  
        this.props.navigation.navigate('Message', {  
            image: post.image, 
            time: moment(post.timestamp).fromNow(), 
            text: post.text,  
            
        })  
    }  
      >
        
          <View style={{flex:1}}>
              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              </View>
              <Image style={styles.postImage} source={post.image ? {uri:post.image} : require("../assets/page/img.png")} resizeMode="cover"/>
                <View style={styles.text}>
                  <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                  <View style={{flexDirection:"row"}}>
                    <Text style={styles.post}>{post.text.substring(0, 80)}...</Text>
                  </View>
                </View>    
          </View>
      </TouchableOpacity>
    );
  };


  render() {
    LayoutAnimation.easeInEaseOut();

    const { navigation } = this.props;  
        const name = navigation.getParam('name', 'NO-text');  
        const image = navigation.getParam('image', 'NO-Image');  



    if(this.state.isDataLoaded && this.state.posts){
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
        <View style={styles.header}>

           <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.props.navigation.navigate("Profile")}>
              <Image style={styles.img} source={{uri:image}}/>
              <Text style={styles.user}>{name}</Text>  
           </TouchableOpacity>

           <TouchableOpacity 
            onPress={() => this.props.navigation.navigate("Notification")}
           >
              <Ionicons name="ios-notifications"
              size={30} color="#343434" />
           </TouchableOpacity>

        </View>
          <FlatList 

            style={styles.feed}
            
            data={this.state.posts}
            renderItem={({ item })=> this.renderPost(item)}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            onRefresh={() => this.onRefresh()}
            onScrollToIndexFailed={() => this.onRefresh()}
            
            refreshing={this.state.isFetching}
            
          />
      
         

        </View>
    )
    }else{
      console.log("State var tom") 
      return (<Text> Waiting for data</Text>)
    }
}
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:"#343434",
  },
  header:{

    backgroundColor:"#FFF",
    paddingBottom:10,
    flexDirection:"row",
    padding:16,
    justifyContent:"space-between",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10

  },
  feedItem:{
    flexDirection:"row",
    marginVertical:8,
    marginBottom:34
  },
  img:{
    width:40,
    height:40,
    borderRadius:20,
  },

  timestamp:{
    fontSize:11,
    color:"#C4C6CE",
    marginTop:4,
    marginBottom:4,
    textAlign:"left",
  },
  user:{
    fontSize:15,
    color:"#000",
    marginTop:8,
    marginHorizontal:10
   
  },
  post:{
    fontSize:14,
    color:"#000",
  },
  text:{
    padding:20,
    width:"95%",
    backgroundColor:"#f0f3f5",
    alignSelf:"center",
    marginTop:-30,
    borderRadius:10

  },
  postImage:{
    width:undefined,
    height:250,

    
  }

})