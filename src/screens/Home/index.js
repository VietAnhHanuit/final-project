import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";

import { ErrorModal } from "../../components/atoms/ErrorModal";
import { HookHelper } from "../../helpers";
import { useAppSelector, useGetNavigation } from "../../helpers/hookHelper";
import useStyles from "./styles";
import { images } from "../../../assets";
import AppText from "../../components/atoms/AppText";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProgressBar from "../../components/modules/ProgressBar";
import * as Progress from "react-native-progress";
import { AuthenticationActions } from "../../stores/actions";
import { DailyReward } from "../../components/modules/DailyReward";
import { useLogin } from "../../api/login";
import { useUser } from "../../api/user";
export const HomeScreen = () => {
  const { theme, dispatch } = HookHelper.useBaseHook();
  const { navigation } = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const userReducer = useAppSelector((state) => state.UserReducer);
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const [showDailyReward, setShowDailyReward] = useState(false);
  const { onDailyReward, onIsRewardClaimed } = useLogin();
  const { onUpgradeMoney } = useUser();

  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const upgradeMoney = async (money) => {
    const response = await onUpgradeMoney(money);
    if (response.isSuccessful) {
      dispatch(UserActions.setMoney.request(money));
    } else {
      setShowError(true);
      setError({
        title: "Error",
        description: response.error.message,
      });
    }
  };
  const claimReward = async () => {
    const response = await onDailyReward();
    if (response.isSuccessful) {
      setShowDailyReward(true);
    } else {
      setShowError(true);
      setError(response.error);
    }
  };

  const isClaimed = async () => {
    const response = await onIsRewardClaimed();
    if (response.isSuccessful) {
      if (response.isClaimed) {
        setShowDailyReward(false);
      } else {
        claimReward();
        upgradeMoney(userReducer.money + 1000);
      }
    } else {
      setShowError(true);
      setError(response.error);
    }
  };

  useEffect(() => {
    isClaimed();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View>
            <Image source={images.man} style={styles.avatar} />
            <View style={styles.ageContainer}>
              <Icon
                name={
                  authenticationReducer.userInfo?.gender == 1
                    ? "male"
                    : "female"
                }
                color={theme?.colors?.primary}
                size={15}
              />
              <AppText body3>{userReducer.age}</AppText>
            </View>
          </View>
          <View style={styles.centerInfo}>
            <AppText>{authenticationReducer.userInfo?.name}</AppText>
            <AppText>{userReducer.degree}</AppText>
            <AppText style={styles.moneyText}>${userReducer.money}</AppText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progress}>
              <Image source={images.health} style={styles.icon} />
              <ProgressBar
                width={100}
                height={12}
                backgroundColor={theme?.colors.primary}
                completedColor={theme?.colors.primary}
                percentage={userReducer.health}
              />
            </View>
            <View style={styles.progress}>
              <Image source={images.happy} style={styles.icon} />
              <ProgressBar
                width={100}
                height={12}
                backgroundColor={theme?.colors.primary}
                completedColor={theme?.colors.primary}
                percentage={userReducer.happiness}
              />
            </View>
            <View style={styles.progress}>
              <Image source={images.mind} style={styles.icon} />
              <ProgressBar
                width={100}
                height={12}
                backgroundColor={theme?.colors.primary}
                completedColor={theme?.colors.primary}
                percentage={userReducer.intelligence}
              />
            </View>
            <View style={styles.progress}>
              <Image source={images.vision} style={styles.icon} />
              <ProgressBar
                width={100}
                height={12}
                backgroundColor={theme?.colors.primary}
                completedColor={theme?.colors.primary}
                percentage={userReducer.appearance}
              />
            </View>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <Image source={images.dev} style={{ width: 400, height: 420 }} />
        </View>
        <View style={styles.centerContainer}>
          <Progress.Bar
            width={380}
            height={20}
            progress={userReducer.progress}
            indeterminate={!userReducer.isRunning}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(AuthenticationActions.logout.request());
        }}
      >
        <Image source={images.logout} style={styles.logout} />
      </TouchableOpacity>
      <ErrorModal
        confirmTitle={"Try again"}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ""}
        description={error?.description}
      />

      <DailyReward
        isVisible={showDailyReward}
        setIsVisible={setShowDailyReward}
      />
    </SafeAreaView>
  );
};
