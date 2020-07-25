import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

export default function Header({title, navigation, backBtn = false}) {
  const {goBack} = navigation;
  return (
    <View style={styles.rootContainer}>
      <View style={styles.nestedContent}>
        {backBtn && (
          <TouchableOpacity onPress={() => goBack()} style={styles.backIcon}>
            <Icon name="arrow-back" style={{color: '#fff'}} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 20,
            color: '#fff',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#1d7488',
    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  nestedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 10,
    width: 30,
    height: 30,
    zIndex: 1,
  },
});
