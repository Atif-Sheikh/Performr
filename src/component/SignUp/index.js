import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {RadioGroup} from 'react-native-btr';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Header from '../Header';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioButtons: [
        {
          label: 'Performer',
          value: 'Performer',
          checked: true,
          color: 'black',
          // color: '#F44336',
          disabled: false,
          flexDirection: 'row',
          size: 11,
        },

        {
          label: 'Organizer',
          value: 'Organizer',
          checked: false,
          color: 'black',
          // color: '#FF8F00',
          disabled: false,
          flexDirection: 'row',
          size: 11,
        },
      ],
    };
  }
  render() {
    const {navigation} = this.props;

    let selectedItem = this.state.radioButtons.find((e) => e.checked == true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioButtons[0].value;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'rgba(29, 138, 137,0.5)'}}>
        <Header title="Signup" navigation={navigation} />
        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 30,
              marginVertical: 50,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN UP</Text>
            </View>
            <View style={{paddingVertical: 50}}>
              <View style={{marginBottom: 15}}>
                <TextInput
                  placeholder="Enter username"
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
              <View style={{marginBottom: 15}}>
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
              <View>
                <RadioGroup
				  color="#1d7488"
				  style={{ flexDirection: 'row', height: 50 }}
                  labelStyle={{fontSize: 14}}
                  radioButtons={this.state.radioButtons}
                  onPress={(radioButtons) => this.setState({radioButtons})}
                  // style={{ paddingTop: 20 }}
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
                  onPress={() => navigation.navigate('Login')}>
                  <Text style={{fontWeight: 'bold'}}>
                    Already have an account?
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#1d7488',
                  borderRadius: 50,
                  padding: 10,
                }}>
                <Text style={{color: '#fff'}}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Signup;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  selectedItemView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    backgroundColor: '#263238',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedText: {
    fontSize: 17,
    color: '#fff',
  },
});
