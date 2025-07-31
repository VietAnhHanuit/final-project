import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Mixin} from '../../helpers';
import {useBaseHook} from '../../helpers/hookHelper';

const styles = StyleSheet.create({
  dropdownContainer: {
    // zIndex: 1000,
    // flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Mixin.moderateSize(16),
  },
  dropdownStyle: {
    backgroundColor: 'white',
    // borderWidth: 0,
    borderColor: '#E8E8E8',
    borderRadius: Mixin.moderateSize(10),

    // height: Mixin.moderateSize(38),
    // maxWidth: device_width * 0.64,
    // width: '100%',
  },
  inputText: {
    fontSize: Mixin.moderateSize(16),
    fontWeight: '400',
  },
  dropdomn: {
    zIndex: 1000,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
  },
});
export const AppDropdown = (props) => {
  const {theme} = useBaseHook();
  const [isSelected, setSelection] = useState(true);
  return (
    <View style={[styles.dropdownContainer, props.containerStyle]}>
      <DropDownPicker
        open={props.open}
        setOpen={props.setOpen}
        value={props.value}
        items={props.items}
        setValue={props.setValue}
        onSelectItem={props.onSelectItem}
        placeholder={props.placeholder}
        dropDownContainerStyle={styles.dropdomn}
        containerStyle={styles.dropdownStyle}
        listMode="SCROLLVIEW"
        style={styles.dropdownStyle}
        textStyle={styles.inputText}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }} />
    </View>
  );
};
