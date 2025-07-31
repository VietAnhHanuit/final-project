import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors?.white,
    padding: Mixin.moderateSize(20),
    paddingBottom: Mixin.moderateSize(65),
  },
  energyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors?.grey1,
    borderWidth: 1,
    borderRadius: Mixin.moderateSize(15),
    padding: Mixin.moderateSize(5),
    paddingHorizontal: Mixin.moderateSize(20),
  },
  energyText: {
    alignItems: 'center',
    marginRight: Mixin.moderateSize(20),
  },
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: Mixin.moderateSize(5),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    width: Mixin.moderateSize(30),
    height: Mixin.moderateSize(30),
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: '#313d4d',
    bottom: 15,
    width: Mixin.moderateSize(50),
    height: Mixin.moderateSize(20),
  },
  skillImage: {
    borderRadius: 50,
    backgroundColor: theme.colors?.secondary,
    borderWidth: 1,
    width: Mixin.moderateSize(50),
    height: Mixin.moderateSize(50),
    alignItems: 'center',
    paddingTop: Mixin.moderateSize(2),
  },
  learningContainer: {
    backgroundColor: '#1eb91f',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Mixin.moderateSize(10),
    paddingVertical: Mixin.moderateSize(2),
  },
  line: {
    backgroundColor: 'rgb(210, 210, 210)',
    height: Mixin.moderateSize(1),
    marginVertical: Mixin.moderateSize(20),
  },
  title: {
    fontSize: Mixin.moderateSize(16),
    textAlign: 'center',
    marginBottom: Mixin.moderateSize(20),
    textTransform: 'uppercase',
  },
}));
