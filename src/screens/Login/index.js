import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";

import AppInput from "../../components/atoms/AppInput";
import AppButton from "../../components/atoms/Button";
import { ErrorModal } from "../../components/atoms/ErrorModal";
import AppHeader from "../../components/atoms/Header";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import { AuthenticationActions, UserActions } from "../../stores/actions";
import useStyles from "./styles";
import AppText from "../../components/atoms/AppText";
import { useLogin } from "../../api/login";
import { useUser } from "../../api/user";

export const LoginScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const authenticationReducer = useAppSelector((state) => state.AuthenticationReducer);
  const [gmailString, setgmailString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const { onLogin } = useLogin();
  const { onGetUser } = useUser();
  const onNext = async () => {
    const response = await onLogin(gmailString, passwordString);
    if (response.isSuccessful) {
      const userData = await onGetUser(response.userCredential?.user.uid);

      dispatch(AuthenticationActions.setAuthenticationData.request({
        accessToken: response?.userCredential?.user.uid,
        userInfo: userData.userData,
        status: 0,
        code: "",
        message: "",
      }));
      dispatch(UserActions.setEnergy.request(userData?.userData?.energy));
      dispatch(UserActions.setMoney.request(userData?.userData?.money));
      dispatch(UserActions.setAge.request(userData?.userData?.age));
      dispatch(UserActions.setElementary.request(userData?.userData?.elementary));
      dispatch(UserActions.setHighSchool.request(userData?.userData?.highSchool));
      dispatch(UserActions.setUniversity.request(userData?.userData?.university));
      dispatch(UserActions.setDegree.request(userData?.userData?.degree));
      dispatch(UserActions.setJob.request(userData?.userData?.job));
      dispatch(UserActions.updateStatus.request({
        health: userData?.userData?.health,
        happiness: userData?.userData?.happiness,
        intelligence: userData?.userData?.intelligence,
        appearance: userData?.userData?.appearance,
      }));
    } else {
      setTimeout(() => {
        setShowError(true);
        setError({
          title: "Error",
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
      <AppHeader title={"Login"} hideBack />
      <View style={styles.container}>
        <AppInput
          label={"Email"}
          value={gmailString}
          onChangeText={(text) => setgmailString(text)}
          containerStyles={styles.inputStyle} />
        <AppInput
          label={"Password"}
          value={passwordString}
          maxLength={100}
          isPassword
          keyboardType="default"
          onChangeText={(text) => setPasswordString(text)}
          containerStyles={styles.inputStyle} />
      </View>

      <AppButton title={"Login"} onPress={() => onNext()} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <AppText style={styles.forgotText}>{"Register"}</AppText>
      </TouchableOpacity>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description} />
    </SafeAreaView>
  );
};
