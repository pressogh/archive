import * as Keychain from 'react-native-keychain';

const setData = async (key, value) => {
    await Keychain.setInternetCredentials(
        key,
        key,
        value
    )
}

const getData = async (key) => {
    const result = await Keychain.getInternetCredentials(key);
    return result.password;
}

export default {
    setData, getData
}