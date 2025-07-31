import auth from "@react-native-firebase/auth";
import { useAppSelector, useBaseHook } from "../helpers/hookHelper";
import firestore from "@react-native-firebase/firestore";
export const useLogin = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();

  const onLogin = async (gmailString, passwordString) => {
    showLoading();
    try {
      console.log("tét");
      const userCredential = await auth().signInWithEmailAndPassword(
        gmailString,
        passwordString
      );
      hideLoading();
      return {
        userCredential: userCredential,
        isSuccessful: true,
      };
    } catch (error) {
      console.log("tét", error);

      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  const onDailyReward = async () => {
    showLoading();
    try {
      const response = await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .update({
          dailyReward: new Date(),
        });
      hideLoading();
      return {
        isSuccessful: true,
      };
    } catch (error) {
      console.log("tung", error);
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  const onIsRewardClaimed = async () => {
    showLoading();
    try {
      const user = await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .get();

      if (!user.data().dailyReward) {
        hideLoading();
        return {
          isClaimed: false,
          isSuccessful: true,
        };
      }
      const isClaimed =
        user.data().dailyReward.toDate().getDate() === new Date().getDate();

      hideLoading();
      return {
        isClaimed: isClaimed,
        isSuccessful: true,
      };
    } catch (error) {
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  return {
    onLogin,
    onDailyReward,
    onIsRewardClaimed,
  };
};
