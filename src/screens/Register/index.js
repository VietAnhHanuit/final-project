import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useRegister } from '../../api/register';
import { AppDropdown } from '../../components/atoms/AppDropdown';
import AppInput from '../../components/atoms/AppInput';
import AppText from '../../components/atoms/AppText';
import AppButton from '../../components/atoms/Button';
import { ErrorModal } from '../../components/atoms/ErrorModal';
import AppHeader from '../../components/atoms/Header';
import { HookHelper } from '../../helpers';
import { useGetNavigation } from '../../helpers/hookHelper';
import useStyles from './styles';

const genderList = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '0'},
];

export const RegisterScreen = () => {
  const {theme, dispatch} = HookHelper.useBaseHook();
  const {navigation} = useGetNavigation();
  const styles = useStyles(theme);

  const [emailString, setEmailString] = useState('');
  const [fullnameString, setFullnameString] = useState('');
  const [passwordString, setPasswordString] = useState('');
  const [confirmPasswordString, setConfirmPasswordString] = useState('');
  const [openGender, setOpenGender] = useState(false);
  const [gender, setGender] = useState(genderList[0].value);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const {onRegister} = useRegister();
  const registerAccount = async () => {
    const dataRegister = {
      FullName: fullnameString,
      Email: emailString,
      Gender: parseInt(gender),
      Password: passwordString,
    };
    const response = await onRegister(dataRegister);
    if (response.isSuccessful) {
      navigation.navigate('Login');
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: 'Error',
          description: (response.error).message,
        });
      }, 200);
    }
  };

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <AppHeader
        title={'Register'}
        leftIcon={'close'}
        renderRight={() => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginRight}>
              <AppText style={styles.loginRightText}>{'Login'}</AppText>
            </TouchableOpacity>
          );
        }} />
      <View style={styles.container}>
        <AppInput
          label={'Email'}
          value={emailString}
          maxLength={100}
          keyboardType="default"
          onChangeText={text => setEmailString(text)}
          containerStyles={styles.inputStyle} />

        <AppInput
          label={'Fullname'}
          value={fullnameString}
          maxLength={100}
          keyboardType="default"
          onChangeText={text => setFullnameString(text)}
          containerStyles={styles.inputStyle} />
        <AppDropdown
          open={openGender}
          setOpen={setOpenGender}
          value={gender}
          items={genderList}
          setValue={setGender}
          placeholder={'Gender'}
          containerStyle={{zIndex: 4}} />
        <AppInput
          label={'Password'}
          value={passwordString}
          maxLength={100}
          isPassword
          keyboardType="default"
          onChangeText={text => setPasswordString(text)}
          containerStyles={styles.inputStyle} />
        <AppInput
          label={'Confirm Password'}
          value={confirmPasswordString}
          maxLength={100}
          isPassword
          keyboardType="default"
          onChangeText={text => setConfirmPasswordString(text)}
          containerStyles={styles.inputStyle} />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title={'Register'} onPress={registerAccount} />
      </View>
      <ErrorModal
        confirmTitle={'Try again'}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ''}
        description={error?.description} />
    </SafeAreaView>
  );
};
