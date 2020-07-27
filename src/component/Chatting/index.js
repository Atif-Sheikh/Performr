import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, Image, TextInput, TouchableOpacity} from 'react-native';

import Header from '../Header';

const {width} = Dimensions.get('window');

function Chatting(props) {
  console.log(props, '>>>>');
  const {
    navigation,
    route: {
      params: {displayName, userId},
    },
  } = props;
  return (
    <View style={styles.rootWrapper}>
      <Header backBtn="true" title={displayName} navigation={navigation} />

      <ScrollView style={styles.contentWrapper}>
        <View style={styles.height22} />

        <View style={styles.otherView}>
          <View style={styles.chatContent}>
            <Text>asdasdadasdasd</Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateTxt}>
              time
            </Text>
          </View>
        </View>

        <View style={styles.height104} />
      </ScrollView>
      <View style={styles.chatBtnBox}>
        <TextInput
          onChangeText={(text) => this._onChangeText(text)}
          placeholder={'Enter message'}
          multiline={true}
          numberOfLines={1}
          style={[styles.chatInput]}
          value={"asdasd"}
          secureTextEntry={false}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.btnSendMsg}
          activeOpacity={0.8}
        //   onPress={() => this._onSendMsg()}
          >
          <View style={styles.btnSendMsgBox}>
            <Text style={styles.btnSendTxt}>Enviar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
  },
  container: {},
  contentWrapper: {
    backgroundColor: '#FFFFFF',
    paddingLeft: width * 24,
    paddingRight: width * 24,
  },

  height44: {
    height: width * 30,
  },

  height56: {
    height: width * 106,
  },

  rootWrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  contentWrapper: {
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 15,
  },

  backIcon: {
    top: 20,
    left: 20,
    width: 22,
    height: 20,
    backgroundColor: 'transparent',
    zIndex: 3,
  },

  backIconStyle: {
    width: 22,
    height: 20,
    resizeMode: 'stretch',
  },

  otherView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 22,
    paddingTop: 14,
    paddingRight: 21,
    paddingBottom: 12,
    paddingLeft: 21,
    marginLeft: 28,
    marginRight: 27,
    backgroundColor: '#F8F8F8',
    borderRadius: 19,
  },

  otherViewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 7,
  },

  otherTxts: {
    color: '#3D3D3D',
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
    marginLeft: 7,
  },

  iconProfile: {
    width: 11,
    height: 13,
  },

  iconPoint: {
    width: 8,
    height: 12,
  },

  iconLocation: {
    width: 9,
    height: 13,
  },

  height22: {
    height: 22,
  },
  height104: {
    height: 104,
  },

  chatBtnBox: {
    height: 77,
    width: '100%',
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },

  chatInput: {
    width: 260,
    height: 47,
    color: '#3D3D3D',
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
    paddingTop: 17,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 5,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#ffffff',
  },
  btnAttach: {
    backgroundColor: '#ffffff',
  },
  paperClipBox: {
    width: 32,
    height: 47,
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  iconPaperClip: {
    width: 32,
    height: 32,
  },
  btnSendMsg: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
  },
  btnSendMsgBox: {
    width: 80,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#02C8A7',
  },
  btnSendTxt: {
    color: '#3D3D3D',
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
    opacity: 0.7,
  },

  contentWrapper: {
    marginTop: 5,
    width: 229,
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  chatContent: {
    flex: 1,

    paddingLeft: 19,
    paddingRight: 19,
    paddingBottom: 8,
    paddingTop: 9,
  },
  myMsg: {
    backgroundColor: '#7DDCD4',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 22,
  },
  custMsg: {
    backgroundColor: '#EDEDED',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 0,
  },
  chatMessage: {
    color: '#3D3D3D',
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
  },
  dateView: {
    marginTop: 3,
  },
  dateTxt: {
    color: '#3D3D3D',
    fontSize: 7,
    fontFamily: 'Raleway-Regular',
    opacity: 0.3,
  },
});

export default Chatting;
