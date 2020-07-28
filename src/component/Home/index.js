import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import Loader from '../Loader';
import Header from '../Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Home({navigation}) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getData();
  }, [sortBy, showAll]);

  const getData = () => {
    setisRefreshing(true);
    database()
      .ref('posts')
      .on('value', (data) => {
        let a = data.val();

        let arr = [];
        for (var key in a) {
          for (var key1 in a[key]) {
            if (sortBy || showAll) {
              if (sortBy == a[key][key1].date) {
                arr.push(a[key][key1]);
              }
            } else if (true) {
              arr.push(a[key][key1]);
            }
          }
        }
        setisRefreshing(false);
        setPosts(arr);
      });
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    setShowAll(true);
    setDate(new Date(event.nativeEvent.timestamp));
    setSortBy(new Date(event.nativeEvent.timestamp).toLocaleDateString());
  };
  const renderItem = ({item}) => (
    <View
      style={{
        margin: 5,
        borderWidth: 1,
        borderColor: '#1d7488',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          borderBottomColor: '#1d7488',
          borderBottomWidth: 1,
          padding: 5,
          color: '#fff',
          backgroundColor: '#1d7488',
        }}>
        {item.title}
      </Text>
      <View style={{margin: 5}}>
        <View
          style={{display: 'flex', flexDirection: 'row', marginVertical: 5}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>description: </Text>
          <Text>{item.description}</Text>
        </View>

        <View
          style={{display: 'flex', flexDirection: 'row', marginVertical: 5}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>skills: </Text>
          <Text>{item.skills}</Text>
        </View>

        <View
          style={{display: 'flex', flexDirection: 'row', marginVertical: 5}}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>Date: </Text>
          <Text>{item.date}</Text>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <Header title="Home" navigation={navigation} />

        <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              margin: 8,
              alignItems: 'center',
            }}>
            <Text>Sort by Date</Text>
            <Icon
              type="FontAwesome"
              name="filter"
              style={{fontSize: 16, marginHorizontal: 3}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowAll(false);
              setSortBy(null);
            }}
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              margin: 8,
              alignItems: 'center',
            }}>
            <Text>Show All</Text>
            <Icon
              type="FontAwesome5"
              name="sort"
              style={{fontSize: 16, marginHorizontal: 3}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            refreshing={isRefreshing}
            data={posts}
            renderItem={renderItem}
            onRefresh={getData}
          />

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              // mode='date'
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
