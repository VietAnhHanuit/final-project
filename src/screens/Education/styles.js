import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors?.backgroundItem,
    padding: Mixin.moderateSize(20),
  },
  book: {
    width: Mixin.moderateSize(50),
    height: Mixin.moderateSize(50),
    alignSelf: 'center',
  },
  icon: {
    width: Mixin.moderateSize(25),
    height: Mixin.moderateSize(25),
    marginVertical: Mixin.moderateSize(10),
  },
  studyEnable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Mixin.moderateSize(10),
    borderWidth: Mixin.moderateSize(1),
    paddingHorizontal: Mixin.moderateSize(15),
    paddingVertical: Mixin.moderateSize(10),
    backgroundColor: theme.colors?.secondary,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  line: {
    backgroundColor: 'rgb(210, 210, 210)',
    height: Mixin.moderateSize(1),
    marginVertical: Mixin.moderateSize(20),
  },
  schoolContainer: {
    backgroundColor: theme.colors?.secondary,
    borderWidth: Mixin.moderateSize(1),
    borderRadius: Mixin.moderateSize(10),
    padding: Mixin.moderateSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
  },
  dropOutBtn: {
    backgroundColor: theme.colors?.grey0,
    borderWidth: Mixin.moderateSize(1),
    borderRadius: Mixin.moderateSize(10),
    paddingHorizontal: Mixin.moderateSize(10),
    paddingVertical: Mixin.moderateSize(2),
    marginTop: Mixin.moderateSize(10),
  },
  dropOutText: {
    color: theme.colors?.white,
  },
  enrollBtn: {
    backgroundColor: '#1db41e',
    borderWidth: Mixin.moderateSize(1),
    borderRadius: Mixin.moderateSize(10),
    paddingHorizontal: Mixin.moderateSize(10),
    paddingVertical: Mixin.moderateSize(2),
    marginTop: Mixin.moderateSize(10),
  },
  completed: {
    borderWidth: Mixin.moderateSize(0),
    paddingHorizontal: Mixin.moderateSize(10),
    paddingVertical: Mixin.moderateSize(2),
    marginTop: Mixin.moderateSize(10),
  },
  completedText: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: 'bold',
  },
  specialityContainer: {
    backgroundColor: theme.colors?.secondary,
    borderWidth: Mixin.moderateSize(1),
    borderRadius: Mixin.moderateSize(10),
    padding: Mixin.moderateSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    paddingVertical: Mixin.moderateSize(40),
  },
  title: {
    fontSize: Mixin.moderateSize(16),
    textAlign: 'center',
    marginBottom: Mixin.moderateSize(20),
  },
}));
