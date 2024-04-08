import { useEffect, useCallback, useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import AppButton from '../assets/components/AppButton';
import colors from '../assets/config/colors';
import chowsApi from '../api/chows';
import AuthContext from '../auth/context';

export default function NutritionScreen() {
  const { user } = useContext(AuthContext);
  const { chows } = useContext(AuthContext);
  const [item, setItem] = useState();
  const [imSource, setImSource] = useState('');
  const [img, setImg] = useState('');

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin.ttf'),
  });

  const RandomItem = () => {
    if (chows.length > 0) {
      const randNo = Math.floor(Math.random() * chows.length);
      const item = chows[randNo];
      setItem(item);
    }
  };

  useEffect(()=> {
     RandomItem();
  }, [chows]);

  useEffect(() => {
    if (item) { setImg(item.attributes.Title); }
  }, [item]);

  useEffect(()=> {
    if (img === "Hamburger") {
      setImSource(require('./uploads/Hamburger.jpeg'))
    } else if (img === "Carrots") {
      setImSource(require('./uploads/carrotImage.png'));
    }
  }, [img]);

  return (
    <>
      {imSource &&
      <SafeAreaView style={styles.container}>
        <View style={styles.circlesContainer}>
          <View style={styles.imageContainer}>
            {imSource && <Image style={{ width: '100%', }} source={imSource} />}
          </View>
          <View style={styles.circlesLine}>
            <FontAwesome name="circle" size={10} color={colors.white} margin={2} />
            <FontAwesome name="circle" size={10} color="#BDBDBD" margin={2} />
            <FontAwesome name="circle" size={10} color="#BDBDBD" margin={2} />
          </View>
        </View>
        <View style={styles.descriptionSection}>
          <View style={styles.descriptionHeader}>
            <View style={styles.section1}>
              <View style={styles.section11}>
                {item && <Text style={{ fontFamily: 'Inter-Medium', fontSize: 24, fontWeight: '600', color: '#000000' }}>{item.attributes.Title}</Text>}
                <View style={styles.iconBox}>
                  <Image style={{width: 25, height: 25, position: 'relative' }} source={require('../assets/target.png')} />
                  <AntDesign style={{width: 20, height: 20, position: 'absolute' }} name="hearto" size={20} color="white" />
                </View>
              </View>
              <View style={styles.section12}>
                <View style={styles.descriptionBox1}>
                  <View style={styles.desciptionBox2}>
                    <Text style={styles.desciptionText1}>
                      Description
                    </Text>
                    <View style={styles.textBottomBorder}></View>
                  </View>
                </View>
                <View style={styles.descriptionBox1}>
                  <View style={styles.desciptionBoxFacts}>
                    <Text style={styles.desciptionText2}>
                      Nutrition Facts
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.section2}>
            {item && <Text style={{ color: '#828282', fontFamily: 'Inter-Regular' }}>
              {item.attributes.Description}
              </Text>}
            </View>
          </View>
          <View style={styles.buttonSection}>
            <View style={styles.buttonHeader}>
              <AppButton onPress={RandomItem} borderRadius={10} backgroundColor={colors.primary} fontSize={16} color='#fff' title="Nah! Find something else." />
            </View>
          </View>
        </View>
      </SafeAreaView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    top: 0,
    height: '100%',
    width: '100%',
  },
  circlesContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  circlesLine: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionSection: {
    flex: 0.8,
  },
  descriptionHeader: {
    flex: 0.8,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  descriptionBox1: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desciptionBox2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    bottom: 0
  },
  desciptionBoxFacts: {
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  desciptionText1: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  desciptionText2: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  buttonSection: {
    flex: 0.2,
  },
  buttonHeader: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section1: {
    flex: 0.25,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 0.5,
    paddingTop: 24,
    paddingRight: 24,
    paddingLeft: 24,
  },
  section11: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section12: {
    flex: 0.5,
    flexDirection: 'row',
  },
  section2: {
    flex: 0.75,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBottomBorder: {
    position: 'absolute',
    flex: 0.05,
    backgroundColor: colors.primary,
    bottom: 0,
    height: 4,
    width: '100%',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
})
