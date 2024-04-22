import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from './app/auth/context';
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from './app/navigation/AppNavigator';
import authStorage from './app/auth/storage';
import chowsApi from './app/api/chows';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';


function App() {
  const [user, setUser] = useState();
  const [chows, setChows] = useState([]);
  //Session Restore
  const restoreToken = async () => {
    try {
      const token = await authStorage.getToken();
      const user = await authStorage.getUser();
      if (!(token && user))  return;

      setUser(JSON.parse(user));
    } catch (error) {
      console.log('Error restoring token', error);
    }
  };
  //Logout
  const removeToken = async () => {
    try {
      return authStorage.removeToken();
    } catch (error) {
      console.log('Error removing token', error);
    }
  };

  const loadChows = async () => {
    try {
      const response = await chowsApi.getChows();
      setChows(response.data.data);
    } catch (error) {
      console.log('Error loading chows', error);
    }
  };

  useEffect(() => {
    // restoreToken();
    removeToken();
  }, []);

  useEffect(() => {
    if (user) {
      loadChows();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{user, chows, setUser}}>
      <NavigationContainer>
       {user ? <AppNavigator /> : <AuthNavigator />}
{/* <RegisterScreen /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;