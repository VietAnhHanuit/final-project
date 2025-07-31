import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {Mixin} from '../../helpers';
import {Image, Overlay} from 'react-native-elements';
import AppText from '../atoms/AppText';
import {images} from '../../../assets';
import {theme} from '../../utils/styles/theme';

export const JobLeavingDialog = ({
  isVisible,
  onClose,
  job,
  accept
}) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={styles.modalContent}>
      <View>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>Leaving Job</AppText>
        </View>
        <View style={styles.container}>
          <Image source={images.leavejob} style={styles.icon} />
          <AppText body1 style={styles.textAlign}>
            Are you sure you want to leave your current job at {job.company}
          </AppText>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.btnContainer} onPress={accept}>
            <AppText>Yes</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={onClose}>
            <AppText>No</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: theme.colors?.primary,
    borderRadius: Mixin.moderateSize(10),
    width: '85%',
  },
  container: {
    backgroundColor: theme.colors?.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Mixin.moderateSize(10),
    paddingHorizontal: Mixin.moderateSize(20),
    paddingBottom: Mixin.moderateSize(10),
  },
  titleContainer: {
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: Mixin.moderateSize(40),
    bottom: Mixin.moderateSize(30),
    alignSelf: 'center',
  },
  title: {
    fontSize: Mixin.moderateSize(20),
    fontWeight: '500',
  },
  icon: {
    width: Mixin.moderateSize(50),
    height: Mixin.moderateSize(50),
    alignSelf: 'center',
    margin: Mixin.moderateSize(20),
  },
  textAlign: {
    textAlign: 'center',
    marginBottom: Mixin.moderateSize(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Mixin.moderateSize(10),
  },
  btnContainer: {
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Mixin.moderateSize(35),
    width: '45%',
  },
});
