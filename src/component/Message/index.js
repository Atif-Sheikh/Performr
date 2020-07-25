import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';

import ChatItem from '../ChatItem';
import Header from '../Header';

const {width, height} = Dimensions.get('window');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: [1, 2, 3, 4, 5, 6],
      isRefreshing: false,
    };
  }

  onRefresh = () => {
    this.setState({isRefreshing: true});
  };

  _fetchChatRooms = () => {
    // this.props.setLoadingSpinner(true);
    // authActions.fetchingChatRooms(this.props.userMeta, chatRooms => {
    //     this.props.setLoadingSpinner(false);
    //     if (chatRooms !== null) {
    //         let sorted = chatRooms.sort((a, b) => b.lastMsgTime - a.lastMsgTime);
    //         this.setState({ chatRooms: sorted });
    //     }
    // });
  };

  renderItems = (item) => (
    <ChatItem navigation={this.props.navigation} chatRoom={item} />
  );

  render() {
    return (
      <View style={styles.rootWrapper}>
        <Header title="Chat List" navigation={this.props.navigation} />
        <FlatList
          data={this.state.chatRooms}
          renderItem={this.renderItems}
          refreshing={this.state.isRefreshing}
          onRefresh={() => this.onRefresh()}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
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
});

export default Messages;
