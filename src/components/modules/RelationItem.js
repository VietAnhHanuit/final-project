import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {HookHelper, Mixin} from '../../helpers';
import {useGetNavigation} from '../../helpers/hookHelper';
import { images } from '../../../assets';
import AppText from '../atoms/AppText';
import * as Progress from 'react-native-progress';
import { theme } from '../../utils/styles/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const RelationItem = (peopleInfo) => {
  const {theme, dispatch} = HookHelper.useBaseHook();
  const {navigation} = useGetNavigation();
  
  const {name, position, happiness, age, degree, job, gender} = peopleInfo;
  const getJob = () => {
    if (typeof job === 'string') {
      return job;
    } else {
      if (job) {
        return job.title;
      } else {
        return "";
      }
    }
  }
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        {backgroundColor: gender == 1 ? '#8adbf9' : '#fabbd9'},
      ]}
      onPress={() => navigation.navigate('People', {peopleInfo: peopleInfo})}>
      <View>
        <Image source={gender == 1 ? images.man : images.woman} style={styles.avatar} />
        <View style={styles.ageContainer}>
          <Icon
            name={gender == 1 ? 'male' : 'female'}
            color={gender == 1 ? '#8adbf9' : '#fabbd9'}
            size={15} />
          <AppText body3>{age}</AppText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.positionContainer}>
          <AppText white>{position ?? "Friend"}</AppText>
        </View>
        <AppText style={styles.nameText}>{name}</AppText>
        <AppText italic>{getJob()}</AppText>
        <AppText italic>{degree}</AppText>

        <Progress.Bar
          style={{marginTop: 10}}
          width={230}
          height={12}
          progress={happiness / 100}
          color="#f54536"
          unfilledColor={'#DCDCDC'} />
      </View>
      <Icon name="chevron-right" size={30} color={'black'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: Mixin.moderateSize(5),
      },
      positionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#2d3b4b',
        borderRadius: 10,
        width: Mixin.moderateSize(60),
        paddingVertical: Mixin.moderateSize(2),
      },
      nameText: {
        fontWeight: 'bold',
        fontSize: Mixin.moderateSize(16),
      },
      infoContainer: {
        marginStart: Mixin.moderateSize(10),
      },
      avatar: {
        width: Mixin.moderateSize(60),
        height: Mixin.moderateSize(60),
      },
      ageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: theme.colors?.secondary,
        bottom: 2,
      },
});
