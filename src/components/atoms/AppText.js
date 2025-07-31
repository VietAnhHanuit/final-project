import React from 'react';
import { StyleSheet } from 'react-native';
import {Text} from 'react-native-elements';
import { Mixin } from '../../helpers';

const styles = StyleSheet.create({
  container: {
    color: '#05253D',
    fontFamily: 'NATS-Regular',
  },
  white: {
    color: 'white',
  },
  h1: {
    fontWeight: '300',
    fontSize: Mixin.moderateSize(40),
  },
  h2: {
    fontWeight: '300',
    fontSize: Mixin.moderateSize(36),
  },
  h3: {
    fontWeight: '400',
    fontSize: Mixin.moderateSize(32),
  },
  h4: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(26),
  },
  h5: {
    fontWeight: 'bold',
    fontSize: Mixin.moderateSize(16),
  },
  h6: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(16),
  },
  subtitle1: {
    fontWeight: '700',
    fontSize: Mixin.moderateSize(16),
  },
  subtitle2: {
    fontWeight: '700',
    fontSize: Mixin.moderateSize(14),
  },
  subtitle3: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(14),
  },
  body1: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(16),
  },
  body2: {
    fontWeight: 'bold',
    fontSize: Mixin.moderateSize(12),
  },
  body3: {
    fontWeight: '500',
    fontSize: Mixin.moderateSize(11),
  },
  button: {
    fontWeight: '700',
    fontSize: Mixin.moderateSize(14),
    textTransform: 'uppercase',
  },
  caption: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(12),
  },
  overline: {
    fontWeight: '400',
    fontSize: Mixin.moderateSize(10),
    textTransform: 'uppercase',
  },
  italic: {
    fontStyle: 'italic',
  },
});
const AppText = (props) => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    body1,
    body2,
    body3,
    subtitle1,
    subtitle2,
    subtitle3,
    caption,
    button,
    overline,
  } = props;
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        styles.container,
        h1 ? styles.h1 : null,
        h2 ? styles.h2 : null,
        h3 ? styles.h3 : null,
        h4 ? styles.h4 : null,
        h5 ? styles.h5 : null,
        h6 ? styles.h6 : null,
        subtitle1 ? styles.subtitle1 : null,
        subtitle2 ? styles.subtitle2 : null,
        subtitle3 ? styles.subtitle3 : null,
        body1 ? styles.body1 : null,
        body2 ? styles.body2 : null,
        body3 ? styles.body3 : null,
        button ? styles.button : null,
        caption ? styles.caption : null,
        overline ? styles.overline : null,
        props.white ? styles.white : null,
        props.italic ? styles.italic : null,
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
export default AppText;
