import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Label, Button } from 'native-base';
import { RadioGroup } from 'react-native-btr';
import { TouchableOpacity } from 'react-native-gesture-handler';


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
					size: 11

				},

				{
					label: 'Organizer',
					value: 'Organizer',
					checked: false,
					color: 'black',
					// color: '#FF8F00',
					disabled: false,
					flexDirection: 'row',
					size: 11

				}
			]
		}
	}
	render() {
		const { navigation } = this.props;

		let selectedItem = this.state.radioButtons.find(e => e.checked == true);
		selectedItem = selectedItem ? selectedItem.value : this.state.radioButtons[0].value;
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(29, 138, 137,0.5)' }}>
				<ScrollView>
					<View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30, marginVertical: 50 }}>
						<View style={{ alignItems: 'center' }}><Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN UP</Text></View>
						<View style={{ paddingVertical: 50 }}>
							<View style={{ marginBottom: 15 }}>
								<Label>Username</Label>
								<TextInput value='hello' style={{ fontSize: 15, borderColor: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: 'solid' }} />
							</View>
							<View style={{ marginBottom: 15 }}>
								<Label>Email</Label>
								<TextInput value='hello' style={{ fontSize: 15, borderColor: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: 'solid' }} />
							</View>
							<View style={{ marginBottom: 15 }}>
								<Label>Password</Label>
								<TextInput secureTextEntry={true} value='world' style={{ fontSize: 15, borderColor: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderStyle: 'solid' }} />
							</View>
							<View>
								<RadioGroup
									color='#31ab8c'
									labelStyle={{ fontSize: 14, }}
									radioButtons={this.state.radioButtons}
									onPress={radioButtons => this.setState({ radioButtons })}
									// style={{ paddingTop: 20 }}
								/>
							</View>
							<View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 10, height: 40, justifyContent: 'center' }}>
								<TouchableOpacity onPress={() => navigation.navigate('Login')}>
									<Text>Already have an account?</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								<Button block style={{ backgroundColor: '#1d7488', borderRadius: 50 }}><Text>SIGN UP</Text></Button>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		)
	}
}
export default Signup;

const styles = StyleSheet.create({

	MainContainer: {
		flex: 1,
		backgroundColor: '#FFF8E1',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: (Platform.OS) === 'ios' ? 20 : 0,

	},

	selectedItemView:
	{
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		padding: 14,
		backgroundColor: '#263238',
		justifyContent: 'center',
		alignItems: 'center'
	},

	selectedText:
	{
		fontSize: 17,
		color: '#fff'
	}
});