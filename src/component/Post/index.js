import React from 'react';
import {View, Text} from 'react-native';
import Header from '../Header';

export default function Post({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Header title="Add Post" navigation={navigation} />
      <Text>Post!</Text>
    </View>
  );
}
