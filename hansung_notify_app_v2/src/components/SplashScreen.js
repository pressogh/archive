import {
  StyleSheet, 
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import KeyChain from '../service/KeyChain';

export const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      KeyChain.getData('username')
        .then((value) => {
          console.log(`In SplashScreen`, value);
          navigation.replace(
            (value === undefined || value === null) ? 'Auth' : 'HomeScreen'
          )
        }
      );
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/hansung-character.jpg')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color='#FFFFFF'
        size='large'
        style={styles.activityIndicator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItem: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
