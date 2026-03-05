import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';

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
} from 'react-native';

import FileCmp from './FileCmp';
import HomeworkCmp from './HomeworkCmp';
import QuizCmp from './QuizCmp';
import NoticeCmp from './NoticeCmp';
import HomeCmp from './HomeCmp';
import NavbarCmp from './NavbarCmp';
import ClassCmp from './ClassCmp';
import CalendarCmp from './CalendarCmp';

import AnimatedSplash from 'react-native-animated-splash-screen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const HomeNavCmp = (
  classdata,
  noticedata,
  homeworkdata,
  quizdata,
  calendardata,
  day,
  tomark,
  classcolor,
) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeCmp
              {...props}
              classdata={classdata}
              tomark={tomark}
              classcolor={classcolor}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Class"
          options={({route}) => ({title: route.params.class_name})}>
          {(props) => (
            <NavbarCmp
              {...props}
              classdata={classdata}
              noticedata={noticedata}
              homeworkdata={homeworkdata}
              quizdata={quizdata}
              filedata={filedata}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Calendar">
          {(props) => (
            <CalendarCmp {...props} calendardata={calendardata} day={day} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavCmp;
