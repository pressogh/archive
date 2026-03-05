import { 
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import KeyChain from '../service/KeyChain';
import { useUserState, useUserDispatch, getUser } from '../context/UserContext';
import { refreshClassList, getVideoList, getClassList } from '../service/Api';
// import { DOMParser } from 'react-native-html-parser';
import IDomParser from 'advanced-html-parser';

export const HomeScreen = () => {
  const [classData, setclassData] = useState(null);

  const state = useUserState();
  const dispatch = useUserDispatch();

  const { data: user, loading, error } = state.user;
  const fetchData = async () => {
    await getUser(dispatch);

    refreshClassList();
    setclassData(await getClassList());
  };

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error</Text>
  if (classData === null) return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={fetchData}>
        <View style={styles.button}>
          <Text>불러오기</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{color: 'black'}}>{classData}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
