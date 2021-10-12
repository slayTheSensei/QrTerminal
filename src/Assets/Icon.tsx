import * as React from 'react';
import { StyleSheet, Image, ImageProps } from 'react-native';

interface IconProps {
  type: 'Back' | 'Dot' | 'DarkLogo' | 'Close' | 'Completed';
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
  const completedIcon = require('./png/completed.png');
  const closeIcon = require('./png/close.png');

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

    case 'Close':
      uri = closeIcon;
      break;
    case 'Completed':
      uri = completedIcon;
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
