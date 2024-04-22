import { useCallback, useState, useContext, useEffect } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Formik } from 'formik';
import * as Yup from "yup";

import AppButton from '../assets/components/AppButton';
import colors from '../assets/config/colors';
import AppText from '../assets/components/AppText';
import WavyHeader from '../assets/components/WavyHeader';
import AppTextInput from '../assets/components/AppTextInput';
import authApi from '../api/auth';
import AuthContext from '../auth/context';
import authStorage from '../auth/storage';
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

function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [passwrdIcon, setPasswrdIcon] = useState('eye-off');
  const [hidden, setHidden] = useState(true);
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

  const handleSubmitForm = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    const user = result.data.user;
    const token = result.data.jwt;
    authContext.setUser(user);
    authStorage.storeToken(token);
    authStorage.storeUser(JSON.stringify(user));
  }

  const onPress = () => {
    navigation.navigate('Welcome');
  }

  const onPressIcon = () => {
    if (passwrdIcon === "eye-off") {
      setHidden(false);
      setPasswrdIcon("eye");
    } else {
      setHidden(true);
      setPasswrdIcon("eye-off");
    }
  }

  const navToRegister = () => {
    navigation.replace('Register')
  }

  return (
    <SafeAreaView style={styles.container} >
      <WavyHeader cy="-10" fill={colors.primary} />
      <TouchableOpacity style={styles.backIcon} onPress={onPress}>
        <Ionicons name="chevron-back" size={34} color="white"/>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <View style={styles.imageContainer}>
          <AppText style={{ fontSize: 34, fontWeight: 700, color: "#ffffff" }} text="Login" />
          <Image style={{ width: 125, height: 316, marginLeft: 110, }} source={require('../assets/man.png')} />
        </View>
        <Formik
          initialValues={{ email: '', password: ''}}
          onSubmit={handleSubmitForm}
          validationSchema={validationSchema}
        >
          { ({ errors, handleChange, handleSubmit, resetForm, setFieldTouched, values, touched }) => (
            <>
              <View style={styles.inputContainer1}>
                {loginFailed &&
                  <Text style={{ fontSize: 10, color: 'red', }}>Invalid email and/or password.</Text>
                }
                <AppFormField
                  fieldName="email"
                  placeholder="yourmail@mail.com"
                  value={values.email}
                  keyboardType="email-address"
                />
              </View>
             <View style={styles.inputContainer2}>
                 <AppFormField
                  fieldName="password"
                  iconName={passwrdIcon}
                  onPress={onPressIcon}
                  placeholder="your password"
                  value={values.password}
                  secureTextEntry={hidden}
                />
              </View>
              <View style={{ display: 'flex', top: 383, width: '90%', }}>
                <Text style={{color: colors.primary, fontSize: 10, marginLeft: 'auto' }}>
                Forgot password
                </Text>
              </View>
              <AppButton backgroundColor={colors.primary} borderRadius={10} fontSize={18} title="Login" top={410} color={colors.white} fontSize={18} onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={navToRegister} style={{ display: 'flex', alignItems: 'center', top: 428, height: 28, width: 425, }}>
            <Text style={{color: colors.primary, fontSize: 12, fontFamily: 'Inter-Regular'}}>
            Don’t have an account? <Text style={{ fontWeight: "700" }}>Register</Text>
            </Text>
        </TouchableOpacity>
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
  icon: {
    position: 'absolute',
    right: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 103,
    height: 225,
    width: '100%',
    left: 30,
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
    top: 402,
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
  backIcon: {
    padding: 10,
    marginTop: 20,
    width: 60,
  },
});

export default LoginScreen;