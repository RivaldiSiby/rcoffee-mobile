import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../component/loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ModalImg from '../../component/modals/ModalImg';
import ReactNativeModal from 'react-native-modal';
import Password from '../../component/profile/Password';
import DatePicker from 'react-native-date-picker';
import {doneLoading, isLoading} from '../../../redux/actionCreator/loading';
import {updateProfile} from '../../../modules/user/updateProfile';
import {getUser} from '../../../modules/user/getUser';
import {GenerateToken} from '../../../modules/auth/checkAuth';
import {addUser} from '../../../redux/actionCreator/user';
import {successLogin} from '../../../redux/actionCreator/login';
import {updatePass} from '../../../modules/user/updatePass';
import ModalFail from '../../component/modals/ModalFail';
import {addProduct} from '../../../modules/products/addProduct';
import {addStock} from '../../../modules/products/addStock';
import SelectDropdown from 'react-native-select-dropdown';
import {sendLocalNotification} from '../../../helper/notifications';
import {getProductsName} from '../../../modules/products/getProductName';
import {addPromo} from '../../../modules/promos/addPromo';
import {updatePromo} from '../../../modules/promos/updatePromo';
import {promoDetail} from '../../../modules/promos/promoDetail';

const AddPromo = ({navigation, route}) => {
  const {id} = route.params;
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const dispatch = useDispatch();
  const [Name, setName] = useState(null);
  const [Product, setProduct] = useState(null);
  const [ProductView, setProductView] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Discount, setDiscount] = useState(null);
  const [size, setSize] = useState(null);
  const [Small, setSmall] = useState(false);
  const [ColorSelect, setColorSelect] = useState('rgba(159, 159, 159, 1)');
  const [Reguler, setReguler] = useState(false);
  const [Large, setLarge] = useState(false);
  const [dateend, setDateend] = useState(null);
  const [datestart, setDatestart] = useState(null);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [view, setView] = useState(false);
  const [Coupon, setCoupon] = useState(null);
  const [visible, setVisible] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Msg, setMsg] = useState(false);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        dispatch(isLoading());
        // cek token
        const token = await GenerateToken(login);
        let newToken = login;
        newToken['tokenkey'] = token;
        dispatch(successLogin(newToken));
        //  get product by name
        const result = await getProductsName(token);

        setProducts(result.data.data);
        if (id !== null) {
          const data = await promoDetail(token, id);
          // set color dropdown product
          setColorSelect('black');
          // setdata
          setImg(data.data.data.img);
          setCoupon(data.data.data.coupon);
          setProductView(
            result.data.data.find(item => item.id === data.data.data.product_id)
              .name,
          );
          setProduct(data.data.data.product_id);
          setName(data.data.data.name);
          setDiscount((parseFloat(data.data.data.discount) * 100).toString());
          setDescription(data.data.data.description);
          setDatestart(data.data.data.period_start);
          setDateend(data.data.data.expire);
          setSize(data.data.data.size);
          //  cek size
          if (data.data.data.size === 'reguler') {
            setReguler(true);
          }
          if (data.data.data.size === 'small') {
            setSmall(true);
          }
          if (data.data.data.size === 'large') {
            setLarge(true);
          }
        }
        dispatch(doneLoading());
      } catch (error) {
        console.log(error);
        dispatch(doneLoading());
        setIsError(true);
        setMsg(error.response.data.message);
        if (error.request.status !== 400) {
          if (error.request.status === 401) {
            dispatch(failLogin());
            navigation.navigate('Login');
          }
          //   const screen = ErrorsHandler(error.request.status);
          //   console.log(screen);
          //   navigation.navigate(screen);
        }
      }
    };
    getProduct();
  }, []);
  const openCam = async () => {
    try {
      const camera = await launchCamera({saveToPhotos: true});
      setView({
        view: camera.assets[0].uri,
        path: camera,
      });
    } catch (error) {}
  };
  const openStorage = async () => {
    try {
      const storage = await launchImageLibrary();
      setView({
        view: storage.assets[0].uri,
        path: storage,
      });
    } catch (error) {}
  };

  // create Promo
  const createHandler = async () => {
    try {
      dispatch(isLoading());
      // set data
      let FormPromo = new FormData();
      let imgData;
      if (file !== null) {
        imgData = {
          uri: file.assets[0].uri,
          size: file.assets[0].fileSize,
          name: file.assets[0].fileName,
          type: file.assets[0].type,
        };
      }
      file !== null ? FormPromo.append('photo', imgData) : setFile(null);
      Name !== null ? FormPromo.append('name', Name) : setName(null);
      Product !== null
        ? FormPromo.append('product_id', Product)
        : setProduct(null);
      size !== null ? FormPromo.append('size', size) : setSize(null);
      dateend !== null
        ? FormPromo.append('expire', dateend.toISOString())
        : setDateend(null);
      datestart !== null
        ? FormPromo.append('period_start', datestart.toISOString())
        : setDatestart(null);
      Discount !== null
        ? FormPromo.append('discount', Discount.toString())
        : setDiscount(null);
      Coupon !== null ? FormPromo.append('coupon', Coupon) : setCoupon(null);
      Description !== null
        ? FormPromo.append('description', Description)
        : setDescription(null);

      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // add product
      await addPromo(token, FormPromo);
      navigation.replace('Home', {
        screen: 'Home',
        params: {notif: 'Promo added successfully'},
      });
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      setIsError(true);
      setMsg(error.response.data.message);
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.navigate('Login');
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };
  // update Promo
  const updateHandler = async () => {
    try {
      dispatch(isLoading());
      // set data
      let FormPromo = new FormData();
      let imgData;
      if (file !== null) {
        imgData = {
          uri: file.assets[0].uri,
          size: file.assets[0].fileSize,
          name: file.assets[0].fileName,
          type: file.assets[0].type,
        };
      }
      file !== null ? FormPromo.append('photo', imgData) : setFile(null);
      Name !== null ? FormPromo.append('name', Name) : setName(null);
      Product !== null
        ? FormPromo.append('product_id', Product)
        : setProduct(null);
      size !== null ? FormPromo.append('size', size) : setSize(null);
      dateend !== null
        ? FormPromo.append(
            'expire',
            typeof dateend === 'string' ? dateend : dateend.toISOString(),
          )
        : setDateend(null);
      datestart !== null
        ? FormPromo.append(
            'period_start',
            typeof datestart === 'string' ? datestart : datestart.toISOString(),
          )
        : setDatestart(null);
      Discount !== null
        ? FormPromo.append(
            'discount',
            typeof Discount === 'string'
              ? (parseInt(Discount) / 100).toString()
              : Discount.toString(),
          )
        : setDiscount(null);
      Coupon !== null ? FormPromo.append('coupon', Coupon) : setCoupon(null);
      Description !== null
        ? FormPromo.append('description', Description)
        : setDescription(null);

      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // add product
      await updatePromo(token, FormPromo, id);
      navigation.replace('Home', {
        screen: 'Home',
        params: {notif: 'Promo updated successfully'},
      });
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      setIsError(true);
      setMsg(error.response.data.message);
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.navigate('Login');
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };
  {
    Discount;
  }
  return (
    <>
      {Load === true ? (
        <Loading />
      ) : (
        <>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={visible}>
            <ModalImg
              icon={'camera-outline'}
              msg={''}
              cb={setVisible}
              opencam={openCam}
              openstorage={openStorage}
              img={view}
              save={setImg}
              file={setFile}
            />
          </ReactNativeModal>
          <ReactNativeModal
            animationIn={'zoomIn'}
            animationOut={'zoomOut'}
            isVisible={isError}>
            <ModalFail msg={Msg} cb={setIsError} />
          </ReactNativeModal>
          <ScrollView style={styles.containerMain}>
            <View style={styles.boxHeader}>
              {img === null ? (
                <>
                  <View style={styles.imgBox}>
                    <Ionicons
                      name="camera-outline"
                      color={'#9F9F9F'}
                      size={50}></Ionicons>
                  </View>
                </>
              ) : (
                <Image style={styles.imgUser} source={{uri: img}} />
              )}
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.iconEdit}>
                <Ionicons
                  color={'white'}
                  size={35}
                  name="add-outline"></Ionicons>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Name</Text>
                <TextInput
                  value={Name}
                  onChangeText={text => setName(text)}
                  placeholderTextColor={'rgba(159, 159, 159, 1)'}
                  placeholder="Input the promo name min. 30 characters"
                  style={styles.inputForm}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Product</Text>
                <SelectDropdown
                  buttonStyle={styles.inputForm}
                  buttonTextStyle={{
                    textAlign: 'left',
                    marginLeft: 0,

                    fontFamily: 'Poppins-Reguler',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: 13,
                    lineHeight: 20,
                    color: ColorSelect,
                  }}
                  rowStyle={{
                    borderColor: '#6A4029',
                    borderWidth: 1,
                    flex: 1,
                  }}
                  defaultButtonText={'Select Product'}
                  defaultValue={ProductView}
                  data={Products.map(item => item.name)}
                  selectedRowStyle={{color: 'red'}}
                  onSelect={(selectedItem, index) => {
                    setColorSelect('black');
                    setProduct(
                      Products.find(item => item.name === selectedItem).id,
                    );
                    setProductView(
                      Products.find(item => item.name === selectedItem).name,
                    );
                  }}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Discount</Text>
                <TextInput
                  value={Discount}
                  onChangeText={text => setDiscount(parseInt(text) / 100)}
                  keyboardType={'numeric'}
                  placeholderTextColor={'rgba(159, 159, 159, 1)'}
                  placeholder="Input the discount you’ll use for the promo "
                  style={styles.inputForm}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Description</Text>
                <TextInput
                  value={Description}
                  onChangeText={text => setDescription(text)}
                  placeholderTextColor={'rgba(159, 159, 159, 1)'}
                  placeholder="Describe your product min. 150 characters"
                  style={styles.inputForm}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Size</Text>
                <View style={{flexDirection: 'row'}}>
                  {Small === true ? (
                    <TouchableOpacity style={styles.bulletActive}>
                      <Text style={styles.textBulletActive}>S</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.bullet}
                      onPress={() => {
                        setSmall(true);
                        setReguler(false);
                        setLarge(false);
                        setSize('small');
                      }}>
                      <Text style={styles.textBullet}>S</Text>
                    </TouchableOpacity>
                  )}
                  {Reguler === true ? (
                    <TouchableOpacity style={styles.bulletActive}>
                      <Text style={styles.textBulletActive}>R</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setSmall(false);
                        setReguler(true);
                        setLarge(false);
                        setSize('reguler');
                      }}
                      style={styles.bullet}>
                      <Text style={styles.textBullet}>R</Text>
                    </TouchableOpacity>
                  )}
                  {Large === true ? (
                    <TouchableOpacity style={styles.bulletActive}>
                      <Text style={styles.textBulletActive}>L</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setSmall(false);
                        setReguler(false);
                        setLarge(true);
                        setSize('large');
                      }}
                      style={styles.bullet}>
                      <Text style={styles.textBullet}>L</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Expire date</Text>
                <TouchableOpacity
                  onPress={() => setOpen1(true)}
                  style={styles.inputDate}>
                  <Text
                    style={
                      datestart === null
                        ? styles.inputPlaceDate
                        : styles.inputFormDate
                    }>
                    {datestart === null
                      ? 'Type the start date for the promo'
                      : typeof datestart === 'string'
                      ? datestart.split('T')[0]
                      : datestart.toISOString().split('T')[0]}
                  </Text>
                  <TouchableOpacity onPress={() => setOpen1(true)}>
                    <Ionicons
                      name="calendar-outline"
                      size={24}
                      color={'#9F9F9F'}></Ionicons>
                  </TouchableOpacity>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open1}
                  date={datestart === null ? new Date() : new Date(datestart)}
                  placeholder="select date"
                  mode="datetime"
                  onConfirm={date => {
                    setDatestart(date);
                    setOpen1(false);
                  }}
                  onCancel={() => {
                    setOpen1(false);
                  }}
                />
                <TouchableOpacity
                  onPress={() => setOpen2(true)}
                  style={styles.inputDate}>
                  <Text
                    style={
                      dateend === null
                        ? styles.inputPlaceDate
                        : styles.inputFormDate
                    }>
                    {dateend === null
                      ? 'Type the expire date for the promo'
                      : typeof dateend === 'string'
                      ? dateend.split('T')[0]
                      : dateend.toISOString().split('T')[0]}
                  </Text>
                  <TouchableOpacity onPress={() => setOpen2(true)}>
                    <Ionicons
                      name="calendar-outline"
                      size={24}
                      color={'#9F9F9F'}></Ionicons>
                  </TouchableOpacity>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open2}
                  date={dateend === null ? new Date() : new Date(dateend)}
                  placeholder="select date"
                  mode="datetime"
                  onConfirm={date => {
                    setDateend(date);
                    setOpen2(false);
                  }}
                  onCancel={() => {
                    setOpen2(false);
                  }}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Coupon Code</Text>
                <TextInput
                  value={Coupon}
                  onChangeText={text => setCoupon(text)}
                  placeholderTextColor={'rgba(159, 159, 159, 1)'}
                  placeholder="coupon code"
                  style={styles.inputForm}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnRegis}
              onPress={() => (id === null ? createHandler() : updateHandler())}>
              <Text style={styles.textBtnRegis}>Save Promo</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default AddPromo;
