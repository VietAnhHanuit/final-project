import _ from 'lodash';
import moment from 'moment';

export const numberToCountdown = (time) => {
  return moment.unix(time).format('ss');
};
export const formatPhoneNumber = (phoneNumberString = '') => {
  if (_.isEmpty(phoneNumberString)) {
    return '';
  }
  if (phoneNumberString.length < 11) {
    phoneNumberString = `509${phoneNumberString}`;
  }
  const match = phoneNumberString
    .replace(/\D+/g, '')
    .replace(/^1/, '')
    .match(/([^\d]*\d[^\d]*){1,11}$/)[0];
  const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
  const part2 = match.length > 3 ? ` ${match.substring(3, 7)}` : '';
  const part3 = match.length > 6 ? `-${match.substring(7, 11)}` : '';
  return `${part1}${part2}${part3}`;
};
export const validatePhoneNumber = (phoneNumber) => {
  let regexp = new RegExp('^[+]?(509||)[0-9]{8}$');
  return regexp.test(phoneNumber);
};

export const validateSpecialCharacter = (text) => {
  let char = /[-!@#$%^&*()+=\[\]{};':"\\|<>\/?_]+/;
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(char, '');
};
export function formatString(x) {
  return x.replace(/[^A-Za-z0-9]+/g, '');
}

export const validateEmail = (text) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text);
}

