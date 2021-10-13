/* eslint-disable react-native/no-inline-styles */
import { append } from 'ramda';
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from '../Assets/Icon';
import Button from '../Core/Button';
import { COLORS } from '../Core/Colors';
import { FONTS } from '../Core/Fonts';
import { dimentions } from '../Core/Metrics';
import { Dinero, Money } from '../Modules/Dinero';

interface DigitsProps {
  onPress: (value: Money) => void;
  disableButton: boolean;
}

const Digits = (props: DigitsProps) => {
  const { onPress, disableButton } = props;
  const [value, setValue] = useState(Dinero({ amount: 0 }));

  const addValue = (amount: number) => {
    const currentValue = value.isZero() ? [] : [value.toUnit()];
    const newValue = Number(append(amount, currentValue).join('')) * 100;

    setValue(Dinero({ amount: newValue }));
  };

  const removeValue = () => {
    if (value.isZero()) {
      return;
    }

    const currentValue = value.toUnit().toString();
    const newValue = Number(currentValue.slice(0, -1)) * 100;
    setValue(Dinero({ amount: newValue }));
  };

  return (
    <>
      {/* TODO: Add Header */}
      <View style={styles.container}>
        <Text style={styles.titleText}>Enter Payment Amount</Text>
        <Text style={styles.balanceText}>{value.toFormat('$0,0')}</Text>
        <View>
          <View style={{ alignSelf: 'center', paddingTop: 30 }}>
            <View style={[styles.numPadRow]}>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(1)}>
                <Text style={styles.text}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(2)}>
                <Text style={styles.text}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(3)}>
                <Text style={styles.text}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.numPadRow]}>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(4)}>
                <Text style={styles.text}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(5)}>
                <Text style={styles.text}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(6)}>
                <Text style={styles.text}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.numPadRow]}>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(7)}>
                <Text style={styles.text}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(8)}>
                <Text style={styles.text}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(9)}>
                <Text style={styles.text}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.numPadRow]}>
              <TouchableOpacity
                style={[
                  styles.digitContainer,
                  { backgroundColor: 'transparent' },
                ]}>
                <Icon type="Dot" style={{ height: 6, width: 6 }} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.digitContainer}
                onPress={() => addValue(0)}>
                <Text style={styles.text}>{0}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.digitContainer,
                  { backgroundColor: 'transparent' },
                ]}
                disabled={value.isZero()}
                onPress={removeValue}>
                <Icon type="Back" style={{ height: 28, width: 15 }} />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            style={{ marginTop: 64 }}
            disabled={disableButton}
            onPress={() => {
              onPress(value);
              setTimeout(() => setValue(Dinero({ amount: 0 })), 1000);
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
  container: { justifyContent: 'center', marginTop: 64 },
  numPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: dimentions.fullWidth - 100,
    paddingTop: 30,
  },
  text: { color: COLORS.skyGrey, fontSize: 24 },
  balanceText: {
    color: COLORS.vinylBlack,
    fontSize: 42,
    fontFamily: 'Avenir-Black',
    marginTop: 6,
    alignSelf: 'center',
  },
  digitContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    backgroundColor: COLORS.vinylBlack,
  },
  titleText: {
    color: COLORS.vinylGrey,
    fontSize: 18,
    fontFamily: FONTS.avenirLight,
    alignSelf: 'center',
  },
});
