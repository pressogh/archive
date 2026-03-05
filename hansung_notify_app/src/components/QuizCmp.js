import React, {useState, useEffect, useCallback} from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';

import FlipCard from 'react-native-flip-card';
import Icon from 'react-native-vector-icons/EvilIcons';

import {getData} from '../service/Api';

const QuizCmp = ({route}) => {
  const [quizdata, setQuizData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const get_data = async () => {
    setQuizData(await getData('quiz'));
    setIsLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    await get_data();
  }, []);

  useEffect(() => {
    if (!quizdata) get_data();
  }, [quizdata]);

  const renderitem = ({item, index}) => {
    if (route.params.class_name === item.class_name) {
      return (
        <FlipCard
          style={styles.card}
          friction={4}
          perspective={1000}
          flipHorizontal={false}
          flipVertical={true}
          flip={false}
          clickable={true}>
          <View style={styles.item}>
            <Text style={styles.title}>{item.class_name}</Text>
            <Text>{item.title}</Text>
          </View>

          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.due_date}</Text>
            <Text>{item.grade === '' ? '0.00/0.00' : item.grade}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(item.link)}
              style={styles.linkbtn}>
              <Text style={styles.linktext}>
                <Icon name="link" size={25} style={{alignItems: 'center'}} />
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        </FlipCard>
      );
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={quizdata}
          renderItem={renderitem}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={100}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
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

  linkbtn: {
    marginTop: 10,
    backgroundColor: '#0081ff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  linktext: {
    color: 'white',
  },

  title: {
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
});

export default QuizCmp;
