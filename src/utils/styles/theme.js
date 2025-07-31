import {Mixin} from '../../helpers';

export const borderRadius = 8;

export const borderWidth = 1;

export const selectionColor = '#FF774D';

export const textColorDark2 = '#3D5E7B';

export const textColorDark3 = '#8AA3B9';

export const textColorWhite = '#FFFFFF';

export const textColorBlack = '#000000';

export const textColorGrey = '#979797';

export const bgGreyTransparent = 'rgba(173, 173, 173, 0.5)';
export const theme = {
  Button: {
    titleStyle: {
      fontWeight: '600',
      fontSize: Mixin.moderateSize(14),
      lineHeight: 24,
      fontFamily: 'Inter',
    },
  },
  Text: {
    style: {
      fontFamily: 'Inter',
    },
  },
  Icon: {
    type: 'material-community',
  },
  Input: {
    selectionColor: selectionColor,
    placeholderTextColor: textColorDark3,
  },
  CheckBox: {
    iconType: 'material-community',
  },
  colors: {
    primary: '#007bff',
    secondary: '#ffc107',
    grey5: '#BDBDBD',
    grey1: '#6D7989',
    grey2: '#ffb881',
    error: '#D70015',
    success: '#248A3D',
    inputAlternative: '#F0EDE9',
    backgroundItem: '#F4F4F4',
    disabledButton: 'rgba(255, 115, 0, 0.5)',
    white: '#FFFFFF',
    textColor: '#05253D'
  },
};
