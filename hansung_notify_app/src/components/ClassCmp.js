import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import * as Progress from 'react-native-progress';

const ClassCmp = ({route, classdata, classcolor}) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', padding: 10}}>
        <Text style={{marginBottom: 10, fontSize: 30}}>진도 현황</Text>
        <Progress.Circle
          showsText={true}
          size={100}
          progress={0.9}
          style={{marginRight: 100, marginLeft: 100, marginBottom: 10}}
          formatText={() => {
            return '90%';
          }}
          color={
            classcolor[route.params.class_name]
              ? classcolor[route.params.class_name].color
              : '#000000'
          }
          indeterminate={load}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.title}>실시간 강의</Text>
          <Text>디자인씽킹_14주차_실시간 화상수업</Text>
          <Text>시작 시간: 2020-12-03 17:00</Text>
          <Text>강의 시간: 60</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.title}>과제</Text>
          <Text>디자인씽킹_14주차_프리젠테이션 [팀제출]</Text>
          <Text>종료 일시: 2020-12-11 23:55</Text>
          <Text>마감까지 남은 기한: 6일 5시간</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.title}>동영상</Text>
          <Text>디자인씽킹_14주2강_프리젠테이션스킬</Text>
          <Text>강의 시간: 42:14</Text>
          <Text>마감까지 남은 기한: 6일 5시간</Text>
        </View>
      </View>
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
    fontSize: 10,
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
  },
});

export default ClassCmp;
