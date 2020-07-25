import React from 'react';
import {View, Text} from 'react-native';
import Loader from '../Loader';
import Header from '../Header';

export default function Home({navigation}) {
  return (
    <View style={{flex: 1}}>
      <Header title="Home" navigation={navigation} />
      <Text>Home!</Text>
    </View>
  );
}
