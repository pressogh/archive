import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';

import {getData} from '../service/Api';

const HomeworkCmp = ({route}) => {
  const [homeworkdata, setHomeworkData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const get_data = async () => {
    setHomeworkData(await getData('homework'));
    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    await get_data();
  }, []);

  useEffect(() => {
    if (!homeworkdata) {
      get_data();
    }
  }, [homeworkdata]);

  const parseDate = (dateString) => {
    const yyyy = parseInt(dateString.substr(0, 4));
    const mm = parseInt(dateString.substr(5, 2));
    const dd = parseInt(dateString.substr(8, 2));
    const hh = parseInt(dateString.substr(11, 2));
    const min = parseInt(dateString.substr(14, 2));

    return new Date(yyyy, mm - 1, dd, hh + 9, min);
  };

  const renderitem = ({item, index}) => {
    if (route.params.class_name === item.class_name) {
      if (parseDate(item.due_date) > new Date().getTime()) {
        return (
          <View style={styles.alertcard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.due_date}</Text>
            <Text>{item.status}</Text>
            <Text>
              {item.grade === '-' ? '0.00/0.00' : item.grade + '/100.00'}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              style={styles.linkbtn}>
              <Text style={styles.linktext}>
                <Icon name="link" size={25} style={{alignItems: 'center'}} />
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
      return (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.due_date}</Text>
          <Text>{item.status}</Text>
          <Text>
            {item.grade === '-' ? '0.00/0.00' : item.grade + '/100.00'}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(item.link)}
            style={styles.linkbtn}>
            <Icon name="link" size={25} />
            <Text style={styles.linktext}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={homeworkdata.sort((a, b) => {
            return parseDate(a.due_date) - parseDate(b.due_date) < 0;
          })}
          renderItem={renderitem}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={100}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
  },

  item: {
    padding: 5,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },

  alertcard: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff0000',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },

  linkbtn: {
    marginTop: 10,
    backgroundColor: '#0081ff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  linktext: {
    color: 'white',
    marginLeft: 20,
  },

  title: {
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
});

export default HomeworkCmp;
