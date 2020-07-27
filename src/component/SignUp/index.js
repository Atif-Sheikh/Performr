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
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

import * as authActions from '../../store/actions/authActions';
import Header from '../Header';
import Loader from '../Loader';

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

      displayName: '',
      email: '',
      password: '',
      contactNo: '',
      address: '',
      loading: false,
    };
  }

  signup = async () => {
    try {
      const {
        navigation: {navigate},
        fetchSignup,
      } = this.props;
      const {
        email,
        password,
        displayName,
        radioButtons,
        contactNo,
        address,
      } = this.state;

      let selectedItem = radioButtons.find((e) => e.checked == true);
      selectedItem = selectedItem ? selectedItem.value : radioButtons[0].value;

      if (email && password && displayName && contactNo && address) {
        this.setState({loading: true});

        await fetchSignup(
          {
            email,
            password,
            displayName,
            userType: selectedItem,
            contactNo,
            address,
            callback: () => this.setState({loading: false}),
          },
          navigate,
        );
      } else {
        Toast.show('Please enter all fields!', Toast.SHORT);
      }
    } catch (err) {
      Toast.show(err, Toast.SHORT);
    }
  };

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;

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
                  onChangeText={(text) => this.setState({displayName: text})}
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
                  onChangeText={(text) => this.setState({email: text})}
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
                  onChangeText={(text) => this.setState({password: text})}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <TextInput
                  placeholder="Enter contact no"
                  style={{
                    fontSize: 15,
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                  onChangeText={(text) => this.setState({contactNo: text})}
                />
              </View>
              <View style={{marginBottom: 15}}>
                <TextInput
                  placeholder="Enter address"
                  style={{
                    fontSize: 15,
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                  onChangeText={(text) => this.setState({address: text})}
                />
              </View>
              <View>
                <RadioGroup
                  color="#1d7488"
                  style={{flexDirection: 'row', height: 50}}
                  labelStyle={{fontSize: 14}}
                  radioButtons={this.state.radioButtons}
                  onPress={(radioButtons) => this.setState({radioButtons})}
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
              {loading ? (
                <Loader />
              ) : (
                <TouchableOpacity
                  onPress={this.signup}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1d7488',
                    borderRadius: 50,
                    padding: 10,
                  }}>
                  <Text style={{color: '#fff'}}>SIGN UP</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    authErrorMessage: state.AuthReducer.authErrorMessage,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignup: (data, userMeta) =>
      dispatch(authActions.fetchSignup(data, userMeta)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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
