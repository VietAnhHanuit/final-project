import {useAppSelector, useBaseHook} from '../helpers/hookHelper';
import firestore from '@react-native-firebase/firestore';

export const useUser = () => {
  const authenticationReducer = useAppSelector(state => state.AuthenticationReducer);
  const {showLoading, hideLoading} = useBaseHook();
  const userReducer = useAppSelector(state => state.UserReducer);

  const onGetUser = async (userId) => {
    showLoading();
    try {
      const user = await firestore().collection('Users').doc(userId).get();

      hideLoading();
      return {
        userData: user.data(),
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

  const onUpgradeMoney = async (money) => {
    showLoading();
    try {
      const res = await firestore()
        .collection('Users')
        .doc(authenticationReducer.userInfo?.id)
        .update({
          money: money,
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

  const onUpgradeEnergy = async (energy) => {
    showLoading();
    try {
      const res = await firestore()
        .collection('Users')
        .doc(authenticationReducer.userInfo?.id)
        .update({
          energy: energy,
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
  const onUpgrageEducation = async (
    elementary,
    highSchool,
    university,
  ) => {
    showLoading();
    console.log('tung', elementary, highSchool, university);

    try {
      const res = await firestore()
        .collection('Users')
        .doc(authenticationReducer.userInfo?.id)
        .update({
          elementary: elementary,
          highSchool: highSchool,
          university: university,
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

  const onUpgradeAge = async (age) => {
    showLoading();
    try {
      const res = await firestore()
        .collection('Users')
        .doc(authenticationReducer.userInfo?.id)
        .update({
          age: age,
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

  const onGetRelations = async () => {
    showLoading();
    try {
      const snapshot = await firestore()
        .collection('Users')
        .doc(authenticationReducer.accessToken)
        .collection('Relationships')
        .get();
      hideLoading();

      const relations = snapshot.docs.map(doc => ({...doc.data()}));

      return {
        relations: relations,
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

  const onUpdateStatus = async (
    happiness,
    health,
    intelligence,
    appearance,
  ) => {
    showLoading();
    try {
      await firestore()
        .collection('Users')
        .doc(authenticationReducer.userInfo?.id)
        .update({
          happiness: userReducer.happiness + happiness,
          health: userReducer.health + health,
          intelligence: userReducer.intelligence + intelligence,
          appearance: userReducer.appearance + appearance,
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

  return {
    onGetUser,
    onUpgradeMoney,
    onUpgradeEnergy,
    onUpgrageEducation,
    onUpgradeAge,
    onGetRelations,
    onUpdateStatus
  };
};
