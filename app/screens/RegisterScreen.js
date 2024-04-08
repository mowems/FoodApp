import { useCallback, useContext, useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Formik } from 'formik';
import * as Yup from "yup";

import authApi from '../api/auth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
import AppButton from '../assets/components/AppButton';
import colors from '../assets/config/colors';
import AppText from '../assets/components/AppText';
import WavyHeader from '../assets/components/WavyHeader';
import AppTextInput from '../assets/components/AppTextInput';
import AppFormField from '../assets/components/AppFormField';

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: Yup
    .string()
    .min(4)
    .required('Password is required'),
})

function RegisterScreen({navigation}) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleSubmitForm = async ({ username, email, password }) => {
    const result = await authApi.register(username, email, password);
    const res = result.ok;
    console.log({res});
    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);
    const user = result.data.user;
    const token = result.data.jwt;
    authContext.setUser(user);
    authStorage.storeToken(token);
    authStorage.storeUser(JSON.stringify(user));
  }

  return (
    <SafeAreaView style={styles.container} >
      <WavyHeader cy="0" fill={colors.primary} />
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
        <Ionicons name="chevron-back" size={24} color="white" style={{top: 40, left: 20}}/>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
          <AppText style={{ fontFamily: 'Inter-Medium', top: 35, fontSize: 34, fontWeight: 700, color: "#ffffff" }} text="Register" />
          <Image style={{ width: 125, height: 316, marginLeft: 42 }} source={require('../assets/woman.png')} />
        </View>
            <Formik
              initialValues={{ username:'', email: '', password: ''}}
              onSubmit={handleSubmitForm}
              validationSchema={validationSchema}
            >
              {({ errors, handleChange, handleSubmit, setFieldTouched, values, touched }) => (
              <>
                <View style={styles.inputContainer}>
                {loginFailed &&
                  <Text style={{ fontSize: 10, color: 'red' }}>Registration unsuccesful</Text>
                }
                  <AppFormField
                    fieldName="username"
                    placeholder="muncher"
                    value={values.username}
                  />
                  <AppFormField
                    fieldName="email"
                    placeholder="yourmail@mail.com"
                    value={values.email}
                    keyboardType="email-address"
                  />
                  <AppFormField
                    fieldName="password"
                    iconName="eye-off"
                    placeholder="your password"
                    value={values.password}
                    secureTextEntry
                  />

                </View>
                <AppButton backgroundColor={colors.primary} borderRadius={10} fontSize={18} title="Register" top={392} color={colors.white} onPress={handleSubmit} />
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <View style={{ display: 'flex', alignItems: 'center', top: 408, height: 118, width: 225, }}>
                      <Text style={{color: colors.primary, fontSize: 12, fontFamily: 'Inter-Regular'}}>
                        Have an account? <Text style={{ fontWeight: "700" }}>Login</Text>
                      </Text>
                    </View>
                  </TouchableOpacity>
              </>
              )}
            </Formik>
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 103,
    height: 285,
    width: '100%',
    left: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 103,
    height: 285,
    width: '100%',
    left: 30,
  },
  inputContainer: {
    width: "90%",
    top: 381,
  },
  passwContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer1: {
    width: "90%",
    top: 381,
  },
  inputContainer2: {
    width: "90%",
    top: 382,
  },
  textInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    fontWeight: '500',
    width: '100%',
    padding: 10,
    marginVertical: 10,
    fontFamily: 'Inter-Regular',
  },
  labelText: {
    color: 'black',
    fontSize: 15,
    marginLeft: 5,
    fontFamily: 'Inter-Medium',
  },
});

export default RegisterScreen;