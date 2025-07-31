import {useAppSelector, useBaseHook} from '../helpers/hookHelper';
import firestore from '@react-native-firebase/firestore';

export const useEducation = () => {
  const {showLoading, hideLoading} = useBaseHook();
  const authenticationReducer = useAppSelector(state => state.AuthenticationReducer);
  const onGetSpecialize = async () => {
    showLoading();
    try {
      const snapshot = await firestore().collection('Specialize').get();
      hideLoading();
      const specialize = snapshot.docs.map(doc => ({...doc.data()}));

      return {
        specialize: specialize,
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

  const onEnrollUniversity = async (degree) => {
    showLoading();
    try {
      const res = await firestore()
        .collection('Users')
        .doc(authenticationReducer.userInfo?.id)
        .update({
          degree: degree,
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
    onGetSpecialize,
    onEnrollUniversity,
  };
};
