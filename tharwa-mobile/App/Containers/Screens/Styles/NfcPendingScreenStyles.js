import { StyleSheet } from 'react-native'
import { Colors } from '../../../Themes'

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    paddingTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  nfcLogo: {
    height: 50,
    width: 50
  },
  cancelBtn: {
    color: Colors.button,
    fontSize: 16
  },
  detailsText: {
    marginTop: 40,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 40
  },
  pendingTxt: {
    color: Colors.white
  },
  senderDetailsContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold'
  },
  detail: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 1
  },
  detailContainer: {
    marginLeft: 20
  },
  amount: {
    color: Colors.white,
    fontSize: 30,
    marginTop: 20
  },
  cardContainer: {
    height: 300,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: Colors.forground,
    elevation: 3
  },
})
