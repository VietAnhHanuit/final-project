import React from 'react';

import { Text, View } from 'react-native';

const ProgressBar = ({
  percentage,
  height,
  backgroundColor,
  completedColor,
  width
}) => {

  const getProgressBar = () => {
    if (percentage) {
      if (percentage > 0 && percentage <= 100) {
        return percentage;
      } else if (percentage < 0) {
        return 0;
      } else if (percentage > 100) {
        return 100;
      }
    } else {
      return 0;
    }
  }
  

  return (
    <View>
      <View style={{justifyContent: 'center', width: width}}>
        <View
          style={{
            width: '100%',
            height: height,
            borderColor: backgroundColor,
            borderWidth: 1,
          }}>
          <View
            style={{
              width: getProgressBar() ? `${getProgressBar()}%` : 0,
              height: height,
              backgroundColor: completedColor,
              justifyContent: 'center',
            }} />
          <Text
            style={{
              textAlign: 'right',
              fontSize: 8,
              bottom: 13,
              color: 'black',
              right: 5,
            }}>
            {percentage}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default ProgressBar;
