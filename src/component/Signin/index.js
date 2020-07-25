import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { Header } from '..';

class Signup extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'rgba(29, 138, 137,0.5)'}}>
		<Header title="Login" navigation={navigation} />
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 30,
              marginVertical: 100,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>PERFORMR</Text>
            </View>
            <View style={{paddingVertical: 50}}>
              <View style={{marginBottom: 15}}>
                <TextInput
                  placeholder="Enter email address"
                  style={{
                    fontSize: 15,
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                />
              </View>
              <View style={{marginBottom: 5}}>
                <TextInput
                  placeholder="Enter password"
                  secureTextEntry={true}
                  style={{
                    fontSize: 15,
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  paddingRight: 10,
                  height: 50,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{height: 30, justifyContent: 'center'}}
                  onPress={() => navigation.navigate('Signup')}>
                  <Text style={{fontWeight: 'bold'}}>
                    Don't have an account?
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1d7488',
                  borderRadius: 50,
                  padding: 10,
                }}>
                <Text style={{color: '#fff'}}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Signup;
