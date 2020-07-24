import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { Label, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Signup extends Component {

	render() {
		const { navigation } = this.props;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(29, 138, 137,0.5)' }}>
				<ScrollView>
					<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30, marginVertical: 100 }}>
						<View style={{ alignItems: 'center' }}><Text style={{ fontSize: 20, fontWeight: 'bold' }}>PERFORMR</Text></View>
						<View style={{ paddingVertical: 50 }}>
							<View style={{ marginBottom: 15 }}>
								<Label>Username</Label>
								<TextInput value='hello' style={{ fontSize:15, borderColor: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: 'solid' }} />
							</View>
							<View style={{ marginBottom: 5 }}>
								<Label>Password</Label>
								<TextInput secureTextEntry={true} value='world' style={{ fontSize:15, borderColor: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: 'solid' }} />
							</View>
							<View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10, height: 40, justifyContent: 'center' }}>
								<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
									<Text>Don't have an account?</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								<Button block style={{ backgroundColor: '#1d7488', borderRadius: 50 }}><Text>Login</Text></Button>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
export default Signup;