import { useAppSelector, useBaseHook } from "../helpers/hookHelper";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useSkill } from "./skill";
import { getFatherNpc, getMotherNpc } from "../helpers/npcHelper";

export const useRegister = () => {
  const authenticationReducer = useAppSelector(
    (state) => state.AuthenticationReducer
  );
  const { showLoading, hideLoading } = useBaseHook();
  const { onGetSkill } = useSkill();

  const onRegister = async (dataRegister) => {
    showLoading();
    const { Email, Password, FullName, Gender } = dataRegister;
    const response = await onGetSkill();
    console.log("tung", response);
    const skillList = response.skills;
    const updatedSkill = skillList.map((item) => ({
      ...item,
      level: 0,
    }));
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        Email,
        Password
      );
      console.log("User account created & signed in!");
      const userInfo = {
        id: userCredential.user.uid,
        name: FullName,
        age: 0,
        gender: Gender,
        health: 50,
        happiness: 50,
        intelligence: 50,
        appearance: 50,
        elementary: 0,
        highSchool: 0,
        university: 0,
        degree: "",
        money: 0,
        energy: 100,
        isDropout: 0,
      };
      await firestore()
        .collection("Users")
        .doc(userCredential.user.uid)
        .set(userInfo);

      for (let i = 0; i < updatedSkill.length; i++) {
        await firestore()
          .collection("Users")
          .doc(userCredential.user.uid)
          .collection("Skills")
          .doc(`${i + 1}`)
          .set(updatedSkill[i]);
      }

      await firestore()
        .collection("Users")
        .doc(userCredential.user.uid)
        .collection("Relationships")
        .doc("Father")
        .set(getFatherNpc());

      await firestore()
        .collection("Users")
        .doc(userCredential.user.uid)
        .collection("Relationships")
        .doc("Mother")
        .set(getMotherNpc());

      hideLoading();
      return {
        userCredential: userCredential,
        isSuccessful: true,
      };
    } catch (error) {
      console.log("error", error);
      hideLoading();
      return {
        error: error,
        isSuccessful: false,
      };
    }
  };

  const resetUser = async () => {
    showLoading();
    const response = await onGetSkill();
    const skillList = response.skills;
    const updatedSkill = skillList.map((item) => ({
      ...item,
      level: 0,
    }));
    try {
      const userInfo = {
        id: authenticationReducer.accessToken ?? "",
        name: authenticationReducer.userInfo?.name ?? "",
        age: 0,
        gender: authenticationReducer.userInfo?.gender ?? 1,
        health: 50,
        happiness: 50,
        intelligence: 50,
        appearance: 50,
        elementary: 0,
        highSchool: 0,
        university: 0,
        degree: "",
        money: 0,
        energy: 100,
        isDropout: 0,
      };
      await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .set(userInfo);

      for (let i = 0; i < updatedSkill.length; i++) {
        await firestore()
          .collection("Users")
          .doc(authenticationReducer.accessToken)
          .collection("Skills")
          .doc(`${i + 1}`)
          .set(updatedSkill[i]);
      }

      await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .collection("Relationships")
        .doc("Father")
        .set(getFatherNpc());

      await firestore()
        .collection("Users")
        .doc(authenticationReducer.accessToken)
        .collection("Relationships")
        .doc("Mother")
        .set(getMotherNpc());

      hideLoading();
      return {
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
    onRegister,
    resetUser,
  };
};
