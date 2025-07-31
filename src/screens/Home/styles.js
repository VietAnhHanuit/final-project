import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors?.backgroundItem,
    padding: Mixin.moderateSize(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: Mixin.moderateSize(40),
    height: Mixin.moderateSize(40),
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Mixin.moderateSize(10),
    paddingVertical: Mixin.moderateSize(5),
    width: '100%',
  },
  progressContainer: {
    borderLeftWidth: 1,
    borderColor: 'rgb(210, 210, 210)',
  },
  icon: {
    width: Mixin.moderateSize(15),
    height: Mixin.moderateSize(15),
    marginHorizontal: Mixin.moderateSize(8),
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Mixin.moderateSize(2),
  },
  centerInfo: {
    justifyContent: 'center',
    flex: 1,
    marginStart: Mixin.moderateSize(10),
  },
  moneyText: {
    color: 'green',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Mixin.moderateSize(20),
  },
  logout: {
    width: Mixin.moderateSize(40),
    height: Mixin.moderateSize(40),
    marginBottom: Mixin.moderateSize(10),
    alignSelf: 'center',
  }
}));
