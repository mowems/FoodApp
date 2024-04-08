import * as SecureStore from 'expo-secure-store';

const keyToken = "authToken";
const keyUser = "authUser";

const storeToken = async authToken => {
  try {
    await SecureStore.setItemAsync(keyToken, authToken);
  } catch (error) {
    console.log('Error storing the auth token', error);
  }
}

const storeUser = async authUser => {
  try {
    await SecureStore.setItemAsync(keyUser, authUser);
  } catch (error) {
    console.log('Error storing the user', error);
  }
}

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(keyToken);
  } catch (error) {
    console.log('Error getting token', error);
  }
}

const getUser = async () => {
  try {
    return await SecureStore.getItemAsync(keyUser);
  } catch (error) {
    console.log('Error getting user object', error);
  }
}

//For logging out
const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(keyToken);
  } catch (error) {
    console.log('Error removing the auth token', error);
  }
}

export default {getToken, getUser, removeToken, storeToken, storeUser };