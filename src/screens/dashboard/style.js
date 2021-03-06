import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  headerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 51,
    color: 'black',
    marginLeft: '10%',
    marginRight: '15%',
  },
  headerTextProduct: {
    fontFamily: 'Poppins-Regular',
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 51,
    color: 'black',
    marginTop: 51,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: '#EFEEEE',
    height: 60,
    width: '80%',
    marginHorizontal: '10%',
    borderRadius: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  inputBox: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 26,
    color: 'black',
    paddingLeft: 10,
  },
  menuBar: {
    marginLeft: '10%',
    marginTop: 10,
    minHeight: 30,
  },
  listMenu: {
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  listMenuActive: {
    padding: 5,
    paddingHorizontal: 10,
    borderBottomColor: '#6A4029',
    borderBottomWidth: 2,
    marginHorizontal: 5,
  },
  menuText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
    color: '#9A9A9D',
  },
  menuTextActive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
    color: '#6A4029',
  },
  textLink: {
    marginTop: 45,
    textAlign: 'right',
    marginRight: '10%',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    color: '#6A4029',
  },
  listItem: {
    marginTop: 20,
    marginLeft: '10%',
    height: 250,
  },
  item: {
    backgroundColor: 'white',
    width: 200,
    height: 220,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: 'rgba(57, 57, 57, 0.1)',
    shadowOffset: 2,
    marginRight: 30,
  },
  itemImg: {
    width: 150,
    height: 150,
    marginTop: -30,
    marginBottom: 10,
    borderRadius: 20,
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: '900',
    lineHeight: 22.2,
    color: 'rgba(0, 0, 0, 0.9)',
    textAlign: 'center',
    marginHorizontal: '15%',
  },
  itemPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    color: '#6A4029',
    textAlign: 'center',
  },
  // product item
  boxProduct: {
    width: '100%',
    height: '50%',
    marginBottom: 50,
  },
  listItemProduct: {
    width: '90%',
    height: 'auto',
    marginTop: 20,
    marginHorizontal: '5%',
  },
  itemProduct: {
    marginBottom: 20,
    marginHorizontal: '5%',
    width: '40%',
    backgroundColor: 'white',
    height: 220,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: 'rgba(57, 57, 57, 0.1)',
    shadowOffset: 2,
  },
  itemImgProduct: {
    width: '80%',
    height: 120,
    marginTop: -30,
    marginBottom: 10,
    borderRadius: 100,
  },
  // sort
  sortBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: '5%',
  },
  btnSort: {
    marginTop: 20,
    width: '70%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
  },
  boxPagination: {
    width: '90%',
    margin: '5%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bullet: {
    width: '15%',
    marginHorizontal: '2%',
    height: 50,
    borderWidth: 1,
    borderColor: '#6A4029',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
    color: '#6A4029',
  },
  // active bullet
  bulletActive: {
    width: '15%',
    marginHorizontal: '2%',
    height: 50,
    borderWidth: 1,
    borderColor: '#6A4029',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A4029',
  },
  bulletTextActive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 26,
    color: 'white',
  },
  // icon edit home
  iconEdit: {
    marginTop: -30,
    marginLeft: 135,
    backgroundColor: '#6A4029',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // icon edit Product
  iconEditProduct: {
    marginTop: -40,
    marginBottom: 20,
    marginLeft: 95,
    backgroundColor: '#6A4029',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // add product
  addBtn: {
    width: 130,
    height: 40,
    backgroundColor: '#FFBA33',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 14,
    color: 'rgba(106, 64, 41, 1)',
  },
});
