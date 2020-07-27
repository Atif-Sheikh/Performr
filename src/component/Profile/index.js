import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Container,
  Title,
  Icon,
  Text,
  Thumbnail,
  Form,
  Item,
  Input,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';

import * as authActions from '../../store/actions/authActions';
import Header from '../Header';
import { Loader } from '..';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: true,
      photos: false,
      friends: false,
      pickerModal: false,
      email: props.userMeta.email,
      name: props.userMeta.displayName,
      photo: props.userMeta.thumbnail,
      number: props.userMeta.contactNo,
      address: props.userMeta.address,
    
      imageUploading: false
    };
  }

  imagepicker = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState(
          {
            photo: source.uri,
            imageUploading: true
          },
          () => {
            this.props.uploadPhoto(source.uri, this.props.userId, callback = () => this.setState({ imageUploading: false }));
          },
        );
      }
    });
  };

  update = () => {};

  _focusNextField = (nextField) => {
    this.refs[nextField]._root.focus();
  };

  render() {
    const {navigation} = this.props;
    const { imageUploading } = this.state;

    return (
      <Container>
        <Header title="Profile" navigation={navigation} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: screenHeight / 5,
            backgroundColor: '#1d7488',
          }}>
            {
              imageUploading
              ?
              <Loader />
              :
              <TouchableOpacity
                onPress={this.imagepicker}
                style={{height: 120, width: 120, borderRadius: 60}}>
                <Thumbnail
                  resizeMode="cover"
                  source={
                    this.state.photo
                      ? {uri: this.state.photo}
                      : require('../../assets/face.jpeg')
                  }
                  style={{
                    height: '100%',
                    width: '100%',
                    borderWidth: 2.0,
                    borderColor: 'grey',
                    borderRadius: 60,
                  }}
                />
              </TouchableOpacity>
            }
          <Title style={{paddingTop: 10}}>{this.state.name}</Title>
        </View>
        <ScrollView style={{height: screenHeight / 1.6}}>
          <View style={{height: screenHeight / 1.6}}>
            <Form
              style={{marginTop: 10, flex: 1, justifyContent: 'space-between'}}>
              <View
                style={{
                  width: screenWidth / 1.1,
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  flex: 1,
                }}>
                <Item style={styles.item} regular>
                  <Input
                    value={this.state.email}
                    placeholder={(this.state.email && null) || 'No Email Found'}
                    disabled
                    style={styles.inputStyle}
                  />
                </Item>
                <Item style={styles.item} regular>
                  <Input
                    returnKeyType="next"
                    onSubmitEditing={() => this._focusNextField('number')}
                    value={this.state.name}
                    placeholder={(this.state.name && null) || 'No Name Found'}
                    onChangeText={(name) => this.setState({name})}
                    style={styles.inputStyle}
                  />
                </Item>
                <Item style={styles.item} regular>
                  <Input
                    ref="number"
                    maxLength={13}
                    onSubmitEditing={() => this._focusNextField('address')}
                    keyboardType="numeric"
                    placeholder={
                      (this.state.number && null) || 'No Number Found'
                    }
                    value={this.state.number}
                    onChangeText={(number) => this.setState({number})}
                    style={styles.inputStyle}
                  />
                </Item>
                <Item style={styles.item} regular>
                  <Input
                    ref="address"
                    placeholder={
                      (this.state.address && null) || 'No Address Found'
                    }
                    value={this.state.address}
                    onChangeText={(address) => this.setState({address})}
                    style={styles.inputStyle}
                  />
                </Item>
                {this.props.loader ? (
                  <Loader />
                ) : (
                  <TouchableOpacity
                    style={{
                      borderRadius: 5,
                      width: '100%',
                      height: screenHeight / 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#1d7488',
                    }}>
                    <Text style={{color: '#fff'}}>Update Profile</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  style={{
                    borderRadius: 5,
                    width: '100%',
                    height: screenHeight / 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1d7488',
                  }}>
                  <Text style={{color: '#fff'}}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    marginLeft: 0,
    borderWidth: 1.0,
    // marginTop:10,
    borderColor: '#1d7488',
    borderRadius: 5,
  },
  inputStyle: {
    padding: 10,
    // fontSize:Styles.fonts.regular
  },
});

function mapStateToProps(state, props) {
  return {
    userMeta: state.AuthReducer.userMeta,
    userId: state.AuthReducer.userId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPhoto: (imageSrc, userId, callback) =>
      dispatch(authActions.uploadImage(imageSrc, userId, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
