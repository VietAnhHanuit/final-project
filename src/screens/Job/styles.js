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
  moreContainer: {
    backgroundColor: '#1eb91f',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Mixin.moderateSize(10),
    paddingVertical: Mixin.moderateSize(2),
  },
  avatar: {
    width: Mixin.moderateSize(40),
    height: Mixin.moderateSize(40),
  },
  itemContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: Mixin.moderateSize(5),
    alignItems: 'center',
    paddingHorizontal: Mixin.moderateSize(10),
    backgroundColor: theme.colors?.secondary,
  },
  jobInfo: {
    flex: 1,
    marginHorizontal: Mixin.moderateSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: Mixin.moderateSize(1),
  },
  jobName: {
    fontSize: Mixin.moderateSize(16),
  },
  paidText: {
    fontSize: Mixin.moderateSize(14),
    color: '#417b3e',
    fontWeight: 'bold',
  },
  moreView: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    margin: Mixin.moderateSize(4),
  },
  infoJobRow: {
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors?.grey1,
    borderWidth: 1,
    borderRadius: Mixin.moderateSize(15),
    padding: Mixin.moderateSize(5),
    paddingHorizontal: Mixin.moderateSize(20),
    justifyContent: 'center'
  },
  header: {
    color: 'white',
    fontSize: Mixin.moderateSize(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  jobOfferContainer: {
    backgroundColor: theme.colors?.secondary,
    borderRadius: 10,
    borderWidth: 1,
    height: '60%',

  },
  jobCurrent: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: Mixin.moderateSize(5),
    alignItems: 'center',
    paddingHorizontal: Mixin.moderateSize(10),
  },
  jobCurrentInfo: {
    flex: 1,
    justifyContent: 'center',
    marginStart: Mixin.moderateSize(20),
  },
  companyInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  companyImage: {
    width: Mixin.moderateSize(80),
    height: Mixin.moderateSize(80),
  },
  companyName: {
    fontSize: Mixin.moderateSize(16),
    fontWeight: 'bold',
    marginVertical: Mixin.moderateSize(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: Mixin.moderateSize(50),
  },
  findJob: {
    backgroundColor: '#2f3b4b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Mixin.moderateSize(40),
    paddingVertical: Mixin.moderateSize(10),
  }
}));
