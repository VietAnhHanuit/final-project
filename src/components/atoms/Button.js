import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import GlobalStyles from '../../utils/styles/GlobalStyles';
import { Mixin } from '../../helpers';
import { theme } from '../../utils/styles/theme';

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: Mixin.moderateSize(50),
    marginTop: Mixin.moderateSize(16),
    color: theme.colors?.primary,
    paddingHorizontal: Mixin.moderateSize(16),
  },
  button: {
    borderRadius: Mixin.moderateSize(100),
    height: '100%',
    maxHeight: Mixin.moderateSize(100),
  },
  disableButton: {
    backgroundColor: theme.colors?.disabledButton,
  },
  cancelButton: {
    backgroundColor: '#ECF0F3',
  },
  title: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(16),
  },
  cancelTitle: {
    color: 'black',
  },
  filledContainer: {
    backgroundColor: 'transparent',
  },
  filledTitle: {
    fontWeight: '600',
    fontSize: Mixin.moderateSize(14),
    color: theme.colors?.primary,
  },
});

const AppButton = (props) => {
  return (
    <View
      style={[
        styles.buttonContainer,
        props.shadow ? GlobalStyles.shadow : null,
        props.buttonStyle ? props.buttonStyle : null,
      ]}>
      <Button
        disabledTitleStyle={{color: 'white'}}
        disabledStyle={styles.disableButton}
        disabled={props.disabled}
        titleStyle={[
          styles.title,
          props.cancel ? styles.cancelTitle : null,
          props.filled ? styles.filledTitle : null,
        ]}
        {...props}
        buttonStyle={[
          styles.button,
          props.cancel ? styles.cancelButton : null,
          props.filled ? styles.filledContainer : null,
          props.customBtnStyle,
        ]} />
    </View>
  );
};
export default AppButton;
