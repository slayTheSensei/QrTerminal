import * as React from 'react';
import { StyleSheet, Image, ImageProps } from 'react-native';

interface IconProps {
  type: 'Back' | 'Dot' | 'DarkLogo';
  style?: ImageProps | any;
}

const Icon = (props: IconProps) => {
  const { type } = props;
  const style = props.style || {};
  let uri;

  // Icons
  const backIcon = require('./png/back.png');
  const dotIcon = require('./png/dot.png');
  const darkLogo = require('./png/logo.png');

  switch (type) {
    case 'Back':
      uri = backIcon;
      break;

    case 'Dot':
      uri = dotIcon;
      break;

    case 'DarkLogo':
      uri = darkLogo;
      break;
  }

  return <Image style={[styles.icon, style]} source={uri} />;
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    height: 18,
    width: 18,
  },
});
