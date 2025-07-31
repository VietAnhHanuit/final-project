// import remoteConfig from '@react-native-firebase/remote-config';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './hookHelper';

export const useRemoteConfig = () => {
  const [remoteDone, setRemoteDone] = useState(false);
  const app = useAppSelector(state => state.AppReducer.appConfig);
  const dispatch = useDispatch();

  const fetchOnly = async () => {
    // await remoteConfig().setDefaults({
    //   api_test: '123',
    // });
    // await remoteConfig().fetch(0);
    // const activated = await remoteConfig().activate();
    // if (!activated) console.log('Remote Config not activated');
  };

  const remoteFetch = async () => {
    setRemoteDone(false);
    fetchOnly();
    setRemoteDone(true);
  };

  return {remoteDone, remoteFetch, fetchOnly};
};
