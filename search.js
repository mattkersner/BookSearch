import React, { Component } from 'react';
import { StyleSheet, View, Text, NavigatorIOS } from 'react-native';
import SearchBooks from './searchbooks';

class Search extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Search Books',
          component: SearchBooks
        }} />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = Search;
