import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#F2F2F2',
    height: 'auto',
    paddingTop: 50,
    paddingBottom: 50,
  },
  textCoupon: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    marginHorizontal: '10%',
  },
  promo: {
    width: 280,
    height: 472,
    backgroundColor: '#FFCB65',
    marginTop: 45,
    borderRadius: 20,
    alignItems: 'center',
    marginEnd: 20,
  },
  promoActive: {
    width: 280,
    height: 472,
    backgroundColor: '#FFCB65',
    marginTop: 45,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6A4029',
    alignItems: 'center',
    marginEnd: 20,
  },
  imgBox: {
    marginTop: 53,
    width: 128,
    height: 128,
    borderRadius: 300,
  },
  textBox: {
    marginTop: 15,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '900',
    fontSize: 22,
    lineHeight: 23,
    textAlign: 'center',
  },
  textDesc: {
    marginTop: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'center',
    marginHorizontal: '10%',
    paddingBottom: 25,
  },
  infoPromo: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    height: 100,
    borderStyle: 'dashed',
    width: '100%',
  },
  textHeading: {
    marginTop: 27,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 17,
    textAlign: 'center',
  },
  codeText: {
    marginTop: 27,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 33,
    lineHeight: 34,
    textAlign: 'center',
  },
  btnRegis: {
    marginVertical: 50,
    backgroundColor: '#6A4029',
    borderRadius: 20,
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 100,
    marginHorizontal: '10%',
  },
  textBtnRegis: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 26,
  },
});
