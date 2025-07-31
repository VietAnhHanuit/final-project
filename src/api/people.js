import { useAppSelector, useBaseHook } from "../helpers/hookHelper";
import firestore from "@react-native-firebase/firestore";

export const usePeople = () => {
  const authenticationReducer = useAppSelector((state) => state.AuthenticationReducer);
  const userReducer = useAppSelector((state) => state.UserReducer);

  const { showLoading, hideLoading } = useBaseHook();

  const onRelationAction = async (
    money,
    happiness,
    health,
    intelligence,
    appearance,
    peopleHappiness,
    energy,
    peopleId
  ) => {
    showLoading();
    try {
      await firestore()
        .collection("Users")
        .doc(authenticationReducer.userInfo?.id)
        .update({
          money: userReducer.money + money,
          happiness: userReducer.happiness + happiness,
          health: userReducer.health + health,
          intelligence: userReducer.intelligence + intelligence,
          appearance: userReducer.appearance + appearance,
          energy: userReducer.energy + energy,
        });

      await firestore()
        .collection("Users")
        .doc(authenticationReducer.userInfo?.id)
        .collection("Relationships")
        .doc(peopleId)
        .update({
          happiness: peopleHappiness,
        });

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

  const onRelationUserAction = async (
    money,
    happiness,
    health,
    intelligence,
    appearance,
    peopleHappiness,
    energy,
    peopleId
  ) => {
    showLoading();
    try {
      await firestore()
        .collection("Users")
        .doc(authenticationReducer.userInfo?.id)
        .update({
          money: userReducer.money + money,
          happiness: userReducer.happiness + happiness,
          health: userReducer.health + health,
          intelligence: userReducer.intelligence + intelligence,
          appearance: userReducer.appearance + appearance,
          energy: userReducer.energy + energy,
        });

      await firestore().collection("Users").doc(peopleId).update({
        happiness: peopleHappiness,
      });

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

  const upgradePeopleAge = async () => {
    showLoading();
    try {
      const people = await firestore()
        .collection("Users")
        .doc(authenticationReducer.userInfo?.id)
        .collection("Relationships")
        .get();

      people.docs.forEach(async (doc) => {
        await firestore()
          .collection("Users")
          .doc(authenticationReducer.userInfo?.id)
          .collection("Relationships")
          .doc(doc.id)
          .update({
            age: doc.data().age + 1,
          });
      });

      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  return {
    onRelationAction,
    onRelationUserAction,
    upgradePeopleAge
  };
};
