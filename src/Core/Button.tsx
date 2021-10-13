import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from './Colors';
import { FONTS } from './Fonts';
import { dimentions } from './Metrics';

interface ButtonProps {
  label: string;
  onPress: () => void;
  type: 'Primary' | 'Secondary' | 'Black';
  color?: 'Green' | 'Default';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button = (props: ButtonProps) => {
  const { label, onPress, type, color = 'Default', disabled } = props;

  const backgroundColor = color === 'Green' && {
    backgroundColor: COLORS.vinylGreen,
  };
  const disabledColor = disabled && { backgroundColor: '#D3D4D7' };
  const disabledText = disabled && { color: COLORS.skyGrey };

  switch (type) {
    case 'Primary':
      return (
        <TouchableOpacity style={{}} disabled={disabled} onPress={onPress}>
          {!disabled && (
            <LinearGradient
              colors={[COLORS.vinylBlue, COLORS.vinylPurple]}
              style={[
                props.style,
                styles.primary,
                backgroundColor,
                disabledColor,
              ]}>
              <Text style={[styles.text, disabledText]}>{label}</Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      );

    case 'Secondary':
      return (
        <TouchableOpacity
          style={props.style}
          disabled={disabled}
          onPress={onPress}>
          <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
          </View>
        </TouchableOpacity>
      );

    case 'Black':
      return (
        <TouchableOpacity
          style={[props.style, styles.primary, backgroundColor, disabledColor]}
          disabled={disabled}
          onPress={onPress}>
          <Text style={[styles.text, disabledText]}>{label}</Text>
        </TouchableOpacity>
      );

    default:
      return null;
  }
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1F25',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 200,
    borderRadius: 5,
  },
  text: {
    color: COLORS.skyGrey,
    fontSize: 18,
    fontFamily: FONTS.avenirBlack,
  },
  primary: {
    flexDirection: 'row',
    backgroundColor: COLORS.vinylGrey,
    width: dimentions.fullWidth - 48,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 15,
  },
});
