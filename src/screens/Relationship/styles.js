import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors?.white,
    padding: Mixin.moderateSize(20),
    paddingBottom:  Mixin.moderateSize(65),
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energyText: {
    alignItems: 'center',
    marginRight: Mixin.moderateSize(20),
  },
 
  
}));
