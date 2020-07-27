import React,{useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import Header from '../Header';

export default class  Post extends React.Component {
  state = {
    title:'',
    description:'',
    skills:'',
  }
  render(){
    const {navigation} = this.props;
    return (
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
              />
            </View>
          </View>
      </View>
    );
  }
  
}
