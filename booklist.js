import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView }
from 'react-native';
import BookDetail from './bookdetail';


export default class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
    this.renderBook = this.renderBook.bind(this);
    this.renderLoadingView = this.renderLoadingView.bind(this);
    this.showBookDetail = this.showBookDetail.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40';
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
         this.setState({
           dataSource: this.state.dataSource.cloneWithRows(responseData.items),
           isLoading: false
         });
       })
       .done();
   }

  renderBook(book) {
    return (
      <ScrollView>
      <TouchableHighlight onPress={() => this.showBookDetail(book)} underlayColor='#dddddd'>
        <View>
          <View style={styles.container}>
          <Image
            source={{uri: book.volumeInfo.imageLinks.thumbnail.replace(/http:/, 'https:')}}
            style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{book.volumeInfo.title}</Text>
            <Text style={styles.author}>{book.volumeInfo.authors}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        </View>
      </TouchableHighlight>
      </ScrollView>
    )
  }

  showBookDetail(book) {
       this.props.navigator.push({
           title: book.volumeInfo.title,
           component: BookDetail,
           passProps: {book}
       });
   }

  renderLoadingView() {
    return (
        <View style={styles.loading}>
            <ActivityIndicator
                animating={this.state.animating}
                size='large'/>
            <Text>
                Loading books...
            </Text>
        </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView();
    }
   return (
    <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderBook.bind(this)}
      style={styles.listView}
     />
    );
  }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10,
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
      height: 1,
      backgroundColor: '#dddddd'
    },
    listView: {
      backgroundColor: '#F5FCFF',
      marginTop: 60,
      marginBottom: 50
    },
    loading: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40
    }
});

