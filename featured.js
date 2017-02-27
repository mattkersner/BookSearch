import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import BookList from './booklist';

class Featured extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Featured Books',
          component: BookList
        }} />
    );
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

module.exports = Featured;
