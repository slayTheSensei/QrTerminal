/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { isTablet } from 'react-native-device-info';
import Icon from '../Assets/Icon';
import Button from '../Core/Button';
import { COLORS } from '../Core/Colors';
import { FONTS } from '../Core/Fonts';
import { dimentions } from '../Core/Metrics';
import { Money, toDinero } from '../Modules/Dinero';

const BUTTON_WIDTH = isTablet() ? 80 : 60;
const TEXT_SIZE = isTablet() ? 36 : 24;
const BUTTON_MARGIN = isTablet() ? 30 : 15;

interface DigitsProps {
  onPress: (value: Money) => void;
}

const Digits = (props: DigitsProps) => {
  const { onPress } = props;
  const [value, setValue] = useState('0');

  const disableButton = !parseInt(value, 10);

  const addValue = (val: string) => {
    if (val === '.' && value === '0') {
      return setValue('0' + val);
    }

    if (value.includes('.') && value.split('.')[1].length === 2) {
      return;
    }

    if (value === '0') {
      return setValue(val);
    }
    const newValue = value + val;

    setValue(newValue);
  };

  const removeValue = () => {
    let newValue;
    if (value[value.length - 1] === '.') {
      if (value.length === 2) {
        return setValue('0');
      } else {
        newValue = value.slice(0, -2);
      }
    } else {
      newValue = value.substring(0, value.length - 1);
    }

    if (value.length === 1) {
      return setValue('0');
    }

    return setValue(newValue);
  };

  return (
    <>
      {/* TODO: Add Header */}
      <View style={styles.container}>
        <Text style={styles.titleText}>Enter Payment Amount</Text>
        <Text style={styles.balanceText}>
          {toDinero(parseFloat(value)).toFormat('$0.00')}
        </Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',

            justifyContent: 'space-between',
            padding: 48,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{ justifyContent: 'center', flex: 1, marginBottom: 48 }}>
              <View style={[styles.numPadRow]}>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('1')}>
                  <Text style={styles.text}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('2')}>
                  <Text style={styles.text}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('3')}>
                  <Text style={styles.text}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.numPadRow]}>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('4')}>
                  <Text style={styles.text}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('5')}>
                  <Text style={styles.text}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('6')}>
                  <Text style={styles.text}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.numPadRow]}>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('7')}>
                  <Text style={styles.text}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('8')}>
                  <Text style={styles.text}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('9')}>
                  <Text style={styles.text}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.numPadRow]}>
                <TouchableOpacity
                  disabled={value.includes('.')}
                  onPress={() => addValue('.')}
                  style={[
                    styles.digitContainer,
                    { backgroundColor: 'transparent' },
                  ]}>
                  <Icon type="Dot" style={{ height: 6, width: 6 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.digitContainer}
                  onPress={() => addValue('0')}>
                  <Text style={styles.text}>{0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.digitContainer,
                    { backgroundColor: 'transparent' },
                  ]}
                  disabled={!value}
                  onPress={removeValue}>
                  <Icon type="Back" style={{ height: 28, width: 15 }} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Button
            style={{ maxWidth: 500 }}
            disabled={disableButton}
            onPress={() => {
              onPress(toDinero(parseFloat(value)));
              setTimeout(() => setValue('0'), 1000);
            }}
            type="Black"
            label="Generate Pay Code"
          />
        </View>
      </View>
    </>
  );
};

export default Digits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 64,
  },
  numPadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: dimentions.fullWidth - 100,
    paddingTop: 30,
  },
  text: { color: COLORS.skyGrey, fontSize: TEXT_SIZE },
  balanceText: {
    color: COLORS.vinylBlack,
    fontSize: 42,
    fontFamily: 'Avenir-Black',
    marginTop: 6,
    alignSelf: 'center',
  },
  digitContainer: {
    minHeight: BUTTON_WIDTH,
    minWidth: BUTTON_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: BUTTON_MARGIN,
    backgroundColor: COLORS.vinylBlack,
  },
  titleText: {
    color: COLORS.vinylGrey,
    fontSize: 18,
    fontFamily: FONTS.avenirLight,
    alignSelf: 'center',
  },
});
