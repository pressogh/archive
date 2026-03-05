import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { loginCheck } from '../service/Api';

import KeyChain from '../service/KeyChain';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const passwordInputRef = useRef();

  const handleSubmitPress = async () => {
    if (!username) {
      console.log("학번을 입력해주세요!!");
      return;
    }
    if (!password) {
      console.log("비밀번호를 입력해주세요!!");
      return;
    }

    setLoading(true);
    console.log(await loginCheck(username, password));
    if (await loginCheck(username, password)) {
      console.log(`!!!!Login Success!!!!`);
      KeyChain.setData("username", username);
      KeyChain.setData("password", password);
      
      navigation.replace('HomeScreen');
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 25, color: 'black'}}>학번</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setUsername(text)}
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current && passwordInputRef.current.focus()
            }}
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 25, color: 'black'}}>비밀번호</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text)=>setPassword(text)}
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <TouchableWithoutFeedback 
          onPress={handleSubmitPress}
        >
          <View style={styles.submit}>
            <Text style={{color: 'black'}}>로그인</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form: {
    margin: 50,
    marginTop: 400,
    width: wp('80%'),
    height: hp('40%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '70%',
    height: hp('4%'),
  },
  
  submit: {
    borderRadius: 100,
    backgroundColor: 'red',
    width: '100%',
    height: hp('5%'),
    marginTop: '10%',

    alignItems: 'center',
    justifyContent: 'center',
  }
});
