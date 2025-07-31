import _ from 'lodash';

function priceFixed(value, precision = 2) {
  return parseFloat(Math.round(+(value?.toFixed(precision + 1) + 'e' + precision)) +
    'e-' +
    precision);
}

export const formatPrice = (
  value,
  showCurrency = false,
) => {
  const price =
    value !== undefined
      ? `${showCurrency === true ? '$' : ''}${priceFixed(value, 2).toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, '')
      : '$0.00';
  return price;
};

export const formatVndPrice = (value) => {
  const price =
    value !== undefined
      ? `${priceFixed(value, 0).toFixed(0)}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : '0 VND';
  return price;

}

export const parserPrice = (value) => value.replace(/\$\s?|(,*)/g, '');
export const formatBalance = (value, showCurrency = true) =>
  `${showCurrency === true ? '$' : ''}${priceFixed(value, 2) || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const isNumeric = value => {
  return /^-?\d+$/.test(value);
};

export function formatAmount(x) {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });
  if (_.last(x) === '.' || _.isEmpty(x)) {
    return x;
  }
  return formatter.format(Number(x));
  // return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function formatString(x) {
  return x.replace(/[`W•√π÷×¶∆£¢€¥°©®™✓~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
}
