import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors?.white,
  },
  containerView: {
    padding: Mixin.moderateSize(20),
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
  icon: {
    width: Mixin.moderateSize(30),
    height: Mixin.moderateSize(30),
    marginRight: Mixin.moderateSize(20),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Mixin.moderateSize(10),
    borderWidth: 1,
    backgroundColor: theme.colors?.secondary,
    borderRadius: Mixin.moderateSize(10),
    marginBottom: Mixin.moderateSize(10),
  },
  activityTitle: {
    fontSize: Mixin.moderateSize(16),
    fontWeight: 'bold',
    marginBottom: Mixin.moderateSize(2),
  },
  activityDescription: {
    fontSize: Mixin.moderateSize(14),
  },
  energyContainer: {
    borderWidth: 1,
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Mixin.moderateSize(5),
    paddingVertical: Mixin.moderateSize(2),
  },
  energyText: {
    fontSize: Mixin.moderateSize(14),
    color: 'red'
  },
  energyIcon: {
    width: Mixin.moderateSize(16),
    height: Mixin.moderateSize(16),
  }
}));
