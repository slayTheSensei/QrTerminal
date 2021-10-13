import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../Assets/Icon';
import { COLORS } from './Colors';

interface HeaderProps {
  onClose?: () => void;
  title: string;
  price?: string;
}

const Header = (props: HeaderProps) => {
  const { title, onClose, price } = props;
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        {onClose && (
          <TouchableOpacity onPress={onClose}>
            <Icon type="Close" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.right}>
        {price && <Text style={styles.titleText}>{price}</Text>}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: COLORS.skyGrey,
    borderBottomColor: COLORS.vinylGrey,
    borderBottomWidth: 0,
  },
  title: {
    flex: 0.33,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
  },
  back: {
    flex: 0.33,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 48,
  },
  backText: {
    color: 'white',
  },
  right: {
    flex: 0.33,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
});
