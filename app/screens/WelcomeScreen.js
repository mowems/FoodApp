import { useCallback } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppButton from '../assets/components/AppButton';
import colors from '../assets/config/colors';
import AppText from '../assets/components/AppText';
import WavyHeader from '../assets/components/WavyHeader';

function WelcomeScreen({navigation}) {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Montserrat-Alternates': require('../assets/fonts/MontserratAlternates-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} >
      <WavyHeader cy="20" fill="#61b882" />
      <View style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <View style={styles.headerContainer}>
        <AppText style={styles.headerText} text="CiaoChow" />
        <FontAwesome6 name="carrot" size={28} color="white" />
      </View>
      <View style={styles.imageContainer}>
        <Image style={{ width: 125, height: 285, }} source={require('../assets/woman.png')} />
        <Image style={{ width: 144.65, height: 289.9, }} source={require('../assets/man.png')} />
      </View>
      <View style={{ top: 522, height: 60, width: 225, }}>
        <Text style={{fontFamily: 'Inter-Regular', fontWeight: '400', fontSize: 18, lineHeight: 30, color: '#ffffff' }}>Hungry? <Text style={{ fontWeight: "700" }}>CiaoChow</Text> helps you find something to eat.</Text>
      </View>
      <AppButton backgroundColor={colors.white} title="Get Started" top={582} color={colors.primary} fontSize={18} borderRadius={10} onPress={()=> navigation.navigate('Login')} />
      <View style={styles.circlesContainer}>
        <FontAwesome name="circle" size={8} color="#BDBDBD" margin={2} />
        <FontAwesome name="circle" size={8} color="#BDBDBD" margin={2} />
        <FontAwesome name="circle" size={8} color={colors.white} margin={2} />
      </View>
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  carrotIcon: {
    flex: 1,
  },
  circlesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    top: 749,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 197,
    height: 34.13,
    top: 81,
    left: 89,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '600',
    height: 34,
    paddingRight: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 168,
    height: 285,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginRight: 5,
    fontFamily: 'Montserrat-Alternates',
  }
});

export default WelcomeScreen;