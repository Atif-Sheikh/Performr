import React,{useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../Header';
import database from '@react-native-firebase/database'; 
import auth from '@react-native-firebase/auth';

import DateTimePicker from '@react-native-community/datetimepicker';

export default class  Post extends React.Component {
  state = {
    title:'',
    description:'',
    skills:'',
    date:new Date().toLocaleDateString(),
    show:false
  }
  addPost = () => {
    let { title , description , skills , date ,} = this.state;
    
    let uid = auth().currentUser.uid;
    let post = {
      title,
      description,
      skills,
      date,
    }
    if(title !== '' && description !== '' && skills !== ''){

      database().ref(`posts/${uid}`).push(post)
    }

    this.emptyState()

    database()
    .ref('posts').child(uid)
    .on('value',(data)=>{
      let a= data.val()
      console.log(a,'data get ( * ) ( * ) ( * )')
    })
        
  }
  emptyState = () =>{
    this.setState({
      title:'',
      description:'',
      skills:'',
    })
  }
  onChange = (event, selectedDate) => {
    this.setState({show:false,date:new Date(event.nativeEvent.timestamp).toLocaleDateString()})
    
  };
  render(){
    const {navigation} = this.props;
    console.log(this.state)
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{flex: 1}}>
            <Header title="Add Post" navigation={navigation} />
              <View style={{paddingVertical: 50 , marginHorizontal:20}}>
                <View style={{marginBottom: 15}}>
                  <Text style ={{ marginVertical:7,fontSize:17 }} >Title </Text>
                  <TextInput
                    placeholder="Enter Title"
                    style={{
                      fontSize: 15,
                      borderColor: 'black',
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                    }}
                    onChangeText={(text) => this.setState({title: text})}
                    value={this.state.title}
                  />
                </View>
                <View style={{marginBottom: 15}}>
                <Text style ={{ marginVertical:7,fontSize:17 }} >Description </Text>
                  <TextInput
                    placeholder="Enter Description"
                    style={{
                      fontSize: 15,
                      borderColor: 'black',
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                    }}
                    onChangeText={(text) => this.setState({description: text})}
                    value={this.state.description}
                  />
                </View>
                <View style={{marginBottom: 15}}>
                <Text style ={{ marginVertical:7,fontSize:17 }} >Skills </Text>
                  <TextInput
                    placeholder="Enter skills"
                    style={{
                      fontSize: 15,
                      borderColor: 'black',
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderStyle: 'solid',
                    }}
                    onChangeText={(text) => this.setState({skills: text})}
                    value={this.state.skills}
                  />
                </View>
                <View style={{marginBottom: 15,}}>
                  <Text style ={{ marginVertical:7,fontSize:17 }} >Select date </Text>
                  <TouchableOpacity
                  onPress = {()=>this.setState({show:true})}
                   style={{
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid'
                    
                  }}>
                    <Text>{this.state.date}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={this.addPost}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1d7488',
                    borderRadius: 50,
                    padding: 10,
                  }}>
                  <Text style={{color: '#fff'}}>Add Post </Text>
                </TouchableOpacity>
              </View>
                
              {this.state.show && (<DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                // mode='date'
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />)}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  
}
