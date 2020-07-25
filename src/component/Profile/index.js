import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import {
    Container, Title, Icon, Text, Thumbnail,
    Form, Item, Input
} from "native-base";
import ImagePicker from 'react-native-image-picker';

import Header from '../Header';

const { height:screenHeight, width:screenWidth } = Dimensions.get('window');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: true,
            photos: false,
            friends: false,
            pickerModal: false,
            email: "Test@gmail.com",
            name: "Test",
            photo: "",
            number: "+923002410353",
        };
    };

    imagepicker = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.uri);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    photo: source.uri
                });
            };
        });
    };

    update = () => {
        let { name, number, email, photo, classArray } = this.state

        let obj = {
            userName: name,
            number,
            email,
            photo,
            classArray
        }
        if (photo == this.props.user.photo) {
            delete obj['photo'];
        }
        this.props.UpdateProfile(obj);
    }
    
    _focusNextField = (nextField) => {
        this.refs[nextField]._root.focus();
    };

    render() {

        const {navigation} = this.props;

        return (
            <Container>
              <Header title="Profile" navigation={navigation} />
                <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%", height: screenHeight / 5, backgroundColor: "#1d7488" }}>
                    <TouchableOpacity onPress={this.imagepicker} style={{ height: 120, width: 120, borderRadius: 60 }}  >
                        <Thumbnail resizeMode="cover" source={this.state.photo ? { uri: this.state.photo } : require("../../assets/face.jpeg")} style={{ height: "100%", width: "100%", borderWidth: 2.0, borderColor: "grey", borderRadius: 60 }} />
                    </TouchableOpacity>
                    <Title style={{ paddingTop: 10 }}>{this.state.name}</Title>
                </View>
                <ScrollView style={{ height: screenHeight / 1.6 }}>
                    <View style={{ height: screenHeight / 1.6 }} >
                        <Form style={{ marginTop: 10, flex: 1, justifyContent: "space-between" }}>
                            <View style={{ width: screenWidth / 1.1, alignSelf: "center", justifyContent: "space-around", flex: 1 }}>
                                <Item style={styles.item} regular>
                                    <Input value={this.state.email} placeholder={this.state.email && null || "No Email Found"} disabled style={styles.inputStyle} />
                                </Item>
                                <Item style={styles.item} regular>
                                    <Input returnKeyType='next' onSubmitEditing={() => this._focusNextField('number')} value={this.state.name} placeholder={this.state.name && null || "No Name Found"} onChangeText={(name) => this.setState({ name })} style={styles.inputStyle} />
                                </Item>
                                <Item style={styles.item} regular>
                                    <Input ref="number" maxLength={13} keyboardType='numeric' placeholder={this.state.number && null || "No Number Found"} value={this.state.number} onChangeText={(number) => this.setState({ number })} style={styles.inputStyle} />
                                </Item>
                                {this.props.loader ? <Loader />
                                    : <TouchableOpacity style={{ borderRadius: 5, width: "100%", height: screenHeight / 18, justifyContent: "center", alignItems: "center", backgroundColor: "#1d7488" }}>
                                        <Text style={{ color: "#fff" }}>Update Profile</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ borderRadius: 5, width: "100%", height: screenHeight / 18, justifyContent: "center", alignItems: "center", backgroundColor: "#1d7488" }}>
                                    <Text style={{ color: "#fff" }}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </Form>
                    </View>
                </ScrollView>
            </Container>
        );
    };
};
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
    }
})

export default Profile;