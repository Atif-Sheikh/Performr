import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

class ChatItem extends Component {
  async _goToDetail() {
    const {navigate} = this.props.navigation;
    const {chatRoom, userId} = this.props;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this._goToDetail()}
        style={styles.contentWrapper}>
        <View style={styles.chatContent}>
          <View style={styles.userInfoRow}>
            <View style={styles.thumbnail}>
              <Image
                source={require('../../assets/face.jpeg')}
                style={styles.thumbImage}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.usernameTxt}>username</Text>
              <Text style={styles.locationTxt}>Email</Text>
            </View>
          </View>
        </View>
        <View style={styles.dateView}>
          <Text style={styles.dateTxt}>lastMsgTime</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: '#F8F8F8',
    height: 100,
    marginBottom: 14,
    borderRadius: 8,
    paddingTop: 9,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    position: 'relative',
    justifyContent: 'center'
  },

  chatContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  titleView: {
    marginBottom: 10,
  },

  titleTxt: {
    color: '#3D3D3D',
    fontSize: 14,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 35,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImage: {
    width: 70,
    height: 70,
    borderRadius: (70) / 2,
  },
  userInfo: {
    paddingLeft: 30
  },
  usernameTxt: {
    fontSize: 13,
  },
  locationTxt: {
    color: '#3D3D3D',
    fontSize: 10,
  },

  dateView: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    bottom: 10,
  },

  dateTxt: {
    color: '#3D3D3D',
    fontSize: 9,
    opacity: 0.3,
  },
});

export default ChatItem;
