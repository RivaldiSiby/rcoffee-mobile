import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  imgBox: {
    margin: '10%',
    alignItems: 'center',
  },
  imgProduct: {
    width: 250,
    height: 250,
    borderRadius: 1000,
  },
  nameProduct: {
    fontFamily: 'Poppins-Regular-bold',
    fontSize: 38,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 42,
    color: 'black',
    borderColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  priceProduct: {
    fontFamily: 'Poppins-Regular-bold',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    color: '#6A4029',
    borderColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  priceProductText: {
    paddingTop: 10,
    fontFamily: 'Poppins-Regular-bold',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
    color: '#6A4029',
    borderColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  textHeading: {
    fontFamily: 'Poppins-Regular-bold',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 26,
    color: 'black',
  },
  textDesc: {
    fontFamily: 'Poppins-Regular-bold',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 21,
    letterSpacing: 0.2,
    color: 'rgba(0, 0, 0, 0.5)',
    borderColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  boxText: {
    marginHorizontal: '10%',
    marginBottom: 20,
  },
  btnDetail: {
    marginTop: 30,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  textBtnDetail: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 26,
  },
  btnDetail: {
    marginTop: 30,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  bulletBox: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  bulletActive: {
    backgroundColor: '#FFBA33',
    borderRadius: 100,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginHorizontal: '2%',
  },
  textBulletActive: {
    color: '#6A4029',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 26,
  },
  bullet: {
    backgroundColor: '#C4C4C4',
    borderRadius: 100,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginHorizontal: '2%',
  },
  textBullet: {
    color: '#4F5665',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 26,
  },
});
