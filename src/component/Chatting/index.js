import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../Header';
import {connect} from 'react-redux';
import moment from 'moment';

import Loader from '../Loader';
import {firebase} from '@react-native-firebase/database';

const {width} = Dimensions.get('window');

class Chatting extends React.Component {
  constructor() {
    super();
    this.state = {
      chatMsgs: [],
      currentMsg: '',
      loading: true,
      chatID: '',
    };
  }

  componentDidMount() {
    this.fetchMsgs();
  }

  fetchMsgs = async () => {
    const {
      route: {
        params: {userId},
      },
      userUId,
    } = this.props;

    let path = `${userId}${userUId}`.split('').sort().join('');
    console.log(path, 'PATH');
    firebase
      .database()
      .ref(`chats/${path}`)
      .on('value', (snap) => {
        let messages = [];
        let data = snap.val();
        for (let key in data) {
          messages.push(data[key]);
        }
        messages = messages.sort((a, b) => a.time - b.time);
        this.setState({chatMsgs: messages, loading: false});
      });
  };

  sendMsg = async () => {
    const {
      route: {
        params: {userId},
      },
      userUId,
    } = this.props;
    const {currentMsg} = this.state;

    let path = `${userId}${userUId}`.split('').sort().join('');
    let obj = {
      msg: currentMsg,
      senderId: userUId,
      time: Date.now(),
    };
    await firebase.database().ref(`chats/${path}`).push(obj);
    Keyboard.dismiss();
    this.setState({message: ''});
  };

  render() {
    const {
      navigation,
      route: {
        params: {displayName, userId},
      },
      userUId,
    } = this.props;
    const {loading, currentMsg, chatMsgs} = this.state;

    let msgType = styles.custMsg;
    let alignSelf = styles.flexStart;
    if (this.props.message === userId) {
      msgType = styles.myMsg;
      alignSelf = styles.flexEnd;
    }

    return (
      <View style={styles.rootWrapper}>
        <Header backBtn="true" title={displayName} navigation={navigation} />

        {!loading && !chatMsgs.length && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>No messages found!</Text>
          </View>
        )}
        {loading ? (
          <Loader />
        ) : (
          <ScrollView style={styles.contentWrapper}>
            <View style={styles.height22} />

            {chatMsgs.map((msg) => {
              if (msg.senderId === userUId) {
                msgType = styles.myMsg;
                alignSelf = styles.flexEnd;
              }

              return (
                <View
                  key={msg.time}
                  style={[styles.contentWrapperMsg, alignSelf]}>
                  <View style={[styles.chatContent, msgType]}>
                    <Text>{msg.msg}</Text>
                  </View>
                  <View style={[styles.dateView, alignSelf]}>
                    <Text style={styles.dateTxt}>
                      {moment(msg.time).fromNow()}
                    </Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.height104} />
          </ScrollView>
        )}
        <View style={styles.chatBtnBox}>
          <TextInput
            onChangeText={(currentMsg) => this.setState({currentMsg})}
            placeholder={'Enter message'}
            multiline={true}
            numberOfLines={1}
            style={[styles.chatInput]}
            value={currentMsg}
            secureTextEntry={false}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.btnSendMsg} onPress={this.sendMsg}>
            <View style={styles.btnSendMsgBox}>
              <Text style={styles.btnSendTxt}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentWrapperMsg: {
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
    paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  myMsg: {
    backgroundColor: '#72bed0',
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
    fontSize: 10,
    fontFamily: 'Raleway-Regular',
    opacity: 0.3,
  },
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
    width: width - 100,
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
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#72bed0',
  },
  btnSendTxt: {
    color: '#000',
    fontSize: 14,
  },
});

function mapStateToProps(state, props) {
  return {
    userUId: state.AuthReducer.userId,
  };
}

export default connect(mapStateToProps, null)(Chatting);
