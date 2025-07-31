import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {useDispatch} from 'react-redux';
import {useUser} from '../api/user';
import {useAppSelector} from '../helpers/hookHelper';
import {PeopleScreen} from '../screens/People';
import {AuthenticationActions, UserActions} from '../stores/actions';
import {TabRoute} from './TabRoute';
import { getRandomBoolean } from '../helpers/npcHelper';
import firestore from '@react-native-firebase/firestore';
import {AppDialog} from '../components/atoms/AppDialog';
import { EventList, deadEvent } from '../model/IEvent';
import {images} from '../../assets';
import {useRegister} from '../api/register';
import { usePeople } from '../api/people';

const Stack = createNativeStackNavigator();

export const HomeRoute = () => {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const userReducer = useAppSelector(state => state.UserReducer);
  const authenticationReducer = useAppSelector(state => state.AuthenticationReducer);
  const {onUpgradeAge, onUpgradeEnergy, onUpgrageEducation, onUpdateStatus} =
    useUser();
  const {resetUser} = useRegister();
  const {upgradePeopleAge} = usePeople();
  const [showDialog, setShowDialog] = useState(false);
  const [showDeadDialog, setShowDeadDialog] = useState(false);

  const [eventList, setEventList] = useState(EventList);
  const [event, setEvent] = useState();

  const prevAgeRef = useRef(null);

  useEffect(() => {
    if (userReducer.isRunning) {
      const intervalId = setInterval(() => {
        dispatch(UserActions.updateTimer.request());
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [userReducer.progress, userReducer.isRunning]);

  const upgradeAge = async (age) => {
    const res = await onUpgradeAge(age);
  };

  const upgradeEnergy = async (energy) => {
    const res = await onUpgradeEnergy(energy);
    if (res.isSuccessful) {
      dispatch(UserActions.setEnergy.request(energy));
    }
  };

  const upgrageEducation = async () => {
    if (userReducer.age >= 7 && userReducer.age < 15) {
      const elementary = userReducer.elementary;
      const res = await onUpgrageEducation(elementary + 1, 0, 0);
      if (res.isSuccessful) {
        dispatch(UserActions.setElementary.request(elementary + 1));
      }
    }
    if (userReducer.age >= 15 && userReducer.age < 19) {
      const highSchool = userReducer.highSchool;
      const res = await onUpgrageEducation(8, highSchool + 1, 0);
      if (res.isSuccessful) {
        dispatch(UserActions.setHighSchool.request(highSchool + 1));
      }
    }
    if (
      userReducer.age >= 19 &&
      userReducer.degree != '' &&
      userReducer.university < 4
    ) {
      const university = userReducer.university;
      const res = await onUpgrageEducation(8, 4, university + 1);
      if (res.isSuccessful) {
        dispatch(UserActions.setUniversity.request(university + 1));
      }
    }
  };

  const updateStatus = async (
    health,
    happiness,
    intelligence,
    appearance,
  ) => {
    const res = await onUpdateStatus(health, happiness, intelligence, appearance);
    if (res.isSuccessful) {
      dispatch(UserActions.updateStatus.request({
        health: userReducer.health + health,
        happiness: userReducer.happiness + happiness,
        intelligence: userReducer.intelligence + intelligence,
        appearance: userReducer.appearance + appearance,
      }));
    }
  };

  useEffect(() => {
    if (prevAgeRef.current != null && userReducer.age != prevAgeRef.current) {
      upgradeAge(userReducer.age);
      upgradeEnergy(100);
      upgrageEducation();
      upgradePeopleAge();
      if (getRandomBoolean()) {
        if (
          userReducer.health < 90 &&
          userReducer.happiness < 90 &&
          userReducer.intelligence < 90 &&
          userReducer.appearance < 90
        ) {
          updateStatus(10, 10, 10, 10);
        }
      } else {
        if (
          userReducer.health > 20 &&
          userReducer.happiness > 20 &&
          userReducer.intelligence > 20 &&
          userReducer.appearance > 20
        ) {
          updateStatus(-10, -10, -10, -10);
        }
      }

      if (userReducer.job) {
        const totalMoney = userReducer.money + userReducer.job.paidPerYear;
        firestore()
          .collection('Users')
          .doc(authenticationReducer.userInfo?.id)
          .update({
            money: totalMoney,
          });
        dispatch(UserActions.setMoney.request(totalMoney));
      }
      if (userReducer.age < 70 && userReducer.age > 2) {
        getRandomEvent();
      } else if (userReducer.age >= 70) {
        if (getRandomBoolean()) {
          setEvent(deadEvent);
        }
      }
    }

    prevAgeRef.current = userReducer.age;
  }, [userReducer.age]);

  useEffect(() => {

    if (
      event != undefined &&
      event != null &&
      event != 0 &&
      userReducer.age < 70
    ) {
      setShowDialog(true);
      if (event.cost) {
        updateStatus(
          event.cost.health,
          event.cost.happiness,
          event.cost.intelligence,
          event.cost.appearance
        );
      }
    }
    if (userReducer.age >= 70) {
      setShowDeadDialog(true);
      resetUser();
      setEventList(EventList);
    }
  }, [event]);

  const getRandomEvent = () => {
    if (!eventList) {
      return;
    }
    if (eventList.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * eventList.length); // Generate random index
    const randomItem = eventList[randomIndex]; // Get random item from list
    const updatedList = eventList.filter((_, index) => index !== randomIndex); // Remove item from list

    setEventList(updatedList);
    setEvent(randomItem);
  };
  return <>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName="MyQr"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TabRoute" component={TabRoute} />
        <Stack.Screen name="People" component={PeopleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <AppDialog
      isVisible={showDialog}
      onClose={() => {
        setShowDialog(false);
      }}
      title={event?.title ?? ''}
      icon={images.event}
      content={event?.description ?? ''}
      description={event?.description2 ?? ''}
      okeBtn={'Okay'}
      cancelBtn={'Cancel'}
      positiveAction={() => {
        setShowDialog(false);
      }} />
    <AppDialog
      isVisible={showDeadDialog}
      onClose={() => {
        setShowDialog(false);
        dispatch(AuthenticationActions.logout.request());
      }}
      title={event?.title ?? ''}
      icon={images.event}
      content={event?.description ?? ''}
      description={event?.description2 ?? ''}
      okeBtn={'Okay'}
      cancelBtn={'Cancel'}
      positiveAction={() => {
        setShowDialog(false);
        dispatch(AuthenticationActions.logout.request());
      }} />
  </>;
};
