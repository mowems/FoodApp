import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { vw, vh } from 'react-native-expo-viewport-units';

import colors from '../config/colors';

export default function WavyHeader(prop) {
  return (
    <View>
      <View>
        <Svg
          height={vh(90)}
          width='2500'
          style={{ position: 'absolute', top:0 }}
        >
          <Circle cx="120" cy={prop.cy} r="20%" fill={prop.fill} />
        </Svg>
      </View>
    </View>
  );
}