import {useAppSelector, useBaseHook} from '../helpers/hookHelper';
import firestore from '@react-native-firebase/firestore';

export const useSkill = () => {
  const authenticationReducer = useAppSelector(state => state.AuthenticationReducer);
  const {showLoading, hideLoading} = useBaseHook();

  const onGetSkill = async () => {
    showLoading();
    try {
      const snapshot = await firestore().collection('Skills').get();
      hideLoading();
      const skills = snapshot.docs.map(doc => ({...doc.data()}));

      return {
        skills: skills,
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

  const onGetUserSkill = async () => {
    showLoading();
    try {
      const snapshot = await firestore()
        .collection('Users')
        .doc(authenticationReducer.accessToken)
        .collection('Skills')
        .get();
      hideLoading();
      const skills = snapshot.docs.map(doc => ({...doc.data()}));

      return {
        skills: skills,
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

  const onUpgradeSkill = async (skill, level) => {
    showLoading();
    try {
      const response = await firestore()
        .collection('Users')
        .doc(authenticationReducer.accessToken)
        .collection('Skills')
        .doc(skill.id.toString())
        .update({
          level: level,
        })
      hideLoading();
      return {
        response: response,
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
    onGetSkill,
    onGetUserSkill,
    onUpgradeSkill
  };
};
