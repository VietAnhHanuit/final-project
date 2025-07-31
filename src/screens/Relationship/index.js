import React, {useEffect, useState} from 'react';
import {SectionList, View} from 'react-native';

import * as Progress from 'react-native-progress';
import AppText from '../../components/atoms/AppText';
import {ErrorModal} from '../../components/atoms/ErrorModal';
import {RelationItem} from '../../components/modules/RelationItem';
import {HookHelper} from '../../helpers';
import {useAppSelector, useGetNavigation} from '../../helpers/hookHelper';
import useStyles from './styles';
import {useUser} from '../../api/user';
import firestore from '@react-native-firebase/firestore';

// const parents = [getFatherNpc(), getMotherNpc()];

// const friends = [getFemaleFriendNpc(), getMaleFriendNpc()];

const relationshipData = [
  {
    title: 'Parents',
    data: [],
  },
  {
    title: 'Friends',
    data: [],
  },
];

export const RelationshipScreen = () => {
  const {theme, dispatch} = HookHelper.useBaseHook();
  const {navigation} = useGetNavigation();
  const styles = useStyles(theme);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();
  const userReducer = useAppSelector(state => state.UserReducer);
  const {onGetRelations} = useUser();
  const [relations, setRelations] = useState(relationshipData);
  const authenticationReducer = useAppSelector(state => state.AuthenticationReducer);
  const tryAgain = () => {
    setShowError(false);
    setError(undefined);
  };

  const setDataForParents = (relationData) => {
    const updatedRelations = [...relations];
    const parentsIndex = updatedRelations.findIndex(item => item.title === 'Parents');
    if (parentsIndex !== -1) {
      updatedRelations[parentsIndex].data = relationData;
      setRelations(updatedRelations);
    }
  };

  const setDataForFriends = (relationData) => {
    const updatedRelations = [...relations];
    const parentsIndex = updatedRelations.findIndex(item => item.title === 'Friends');
    if (parentsIndex !== -1) {
      updatedRelations[parentsIndex].data = relationData;
      setRelations(updatedRelations);
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(authenticationReducer.accessToken)
      .collection('Relationships')
      .onSnapshot(snapshot => {
        const relations = snapshot.docs.map(doc => doc.data());
        setDataForParents(relations);
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(snapshot => {
        const relations = snapshot.docs.map(doc => doc.data());
        const filteredRelations = relations.filter(item => item.id != authenticationReducer.accessToken);
        setDataForFriends(filteredRelations);
      });
    return () => subscriber();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.energyContainer}>
        <View style={styles.energyText}>
          <AppText subtitle2 white>
            Energy
          </AppText>
          <AppText subtitle2 white>
            {userReducer.energy}/100
          </AppText>
        </View>

        <Progress.Bar
          width={230}
          height={12}
          progress={userReducer.energy / 100}
          color="orange"
          unfilledColor={theme.colors?.secondary} />
      </View>

      <SectionList
        renderSectionHeader={({section: {title}}) => (
          <View>
            <View style={styles.line} />
            <AppText style={styles.title}>{title}</AppText>
          </View>
        )}
        sections={relationshipData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RelationItem {...item} />}
        ItemSeparatorComponent={() => <View style={{height: 20}} />} />
      {/*<View>
        <View style={styles.line} />
        <AppText style={styles.title}>Relationships</AppText>
      </View>
      <FlatList
        data={relations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RelationItem {...item} />}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
      />*/}

      <ErrorModal
        confirmTitle={'Try again'}
        onConfirm={() => tryAgain()}
        isVisible={showError}
        title={error?.title || ''}
        description={error?.description} />
    </View>
  );
};
