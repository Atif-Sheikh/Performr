import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import database from '@react-native-firebase/database';

import ChatItem from '../ChatItem';
import Header from '../Header';
import { connect } from 'react-redux';


const {width, height} = Dimensions.get('window');

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRooms: [],
      isRefreshing: false,
    };
  };

  componentDidMount() {
    this._fetchChatRooms();
  }

  onRefresh = () => {
    this._fetchChatRooms();
  };

  _fetchChatRooms = () => {
    const { userId } = this.props;
    try {
    this.setState({isRefreshing: true}, () => {
      database()
        .ref(`users`)
        .once('value')
        .then((snapshot) => {
            let data = snapshot.val();
            let users = [];
            for(let key in data) {
              if(key !== userId){
                users.push(data[key]);
              }
            }
            this.setState({ isRefreshing: false, chatRooms: users });
        });
    });
    } catch (err) {
      console.log(err, 'ERRO');
    }
  };

  renderItems = (item) => (
    <ChatItem navigation={this.props.navigation} userData={item} />
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
          keyExtractor={(item) => item.email}
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


function mapStateToProps(state, props) {
  return {
    userMeta: state.AuthReducer.userMeta,
    userId: state.AuthReducer.userId,
  };
};

export default connect(mapStateToProps, null)(Messages);