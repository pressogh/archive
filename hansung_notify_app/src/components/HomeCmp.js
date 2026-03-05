/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import moment from 'moment';
import {Directions} from 'react-native-gesture-handler';

const HomeCmp = ({navigation, classdata, classcolor, tomark}) => {
  const [selected, setSelected] = useState(
    moment(new Date()).format('YYYY-MM-DD'),
  );

  const renderBottomSheet = () => (
    <View
      style={{
        paddingTop: 10,
        paddingRight: 16,
        paddingLeft: 16,
        height: 380,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: '#252525',
          width: 150,
          height: 10,
          borderRadius: 20,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      />

      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
          navigation.navigate('Calendar', {
            selected: day.dateString,
            classcolor: classcolor,
          });
        }}
        monthFormat={'yyyy년 MM월'}
        style={{
          width: 425,
          height: 500,
          borderRadius: 30,
        }}
        markedDates={{
          ...tomark,
          [selected]: {selected: true},
        }}
        theme={{
          selectedDayBackgroundColor: '#70d7c7',
        }}
        markingType={'multi-dot'}
      />
    </View>
  );

  const renderitem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Class', {class_name: item.class_name})
        }>
        <View style={styles.item}>
          <View
            style={{
              height: 8,
              width: 8,
              borderRadius: 1000,
              backgroundColor: classcolor[item.class_name]
                ? classcolor[item.class_name].color
                : '#000000',
              marginTop: 8,
              marginRight: 10,
            }}
          />
          <Text style={styles.title}>{item.class_name}</Text>
          {item.class_name === '다문화 여행과 세계시민성' ||
          item.class_name === '사고와 표현(발표와 토론)' ||
          item.class_name === '디자인 Thinking' ? (
            <View
              style={{
                height: 5,
                width: 5,
                borderRadius: 1000,
                backgroundColor: '#FF0000',
                marginTop: 8,
                marginRight: 10,
              }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const sheetRef = React.useRef(null);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={classdata}
          renderItem={renderitem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={['52%', '5%']}
        renderContent={renderBottomSheet}
        initialSnap={1}
        enabledContentTapInteraction={false}
      />
    </>
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
    flexDirection: 'row',
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

  title: {
    fontSize: 16,
    paddingBottom: 10,
    fontWeight: 'bold',
    flex: 11,
  },
});

export default HomeCmp;
