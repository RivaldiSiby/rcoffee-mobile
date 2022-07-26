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
import {sendLocalNotification} from '../../../helper/notifications';
import {deleteProduct} from '../../../modules/products/deleteProduct';

const AddProduct = ({navigation, route}) => {
  const login = useSelector(state => state.login.auth);
  const user = useSelector(state => state.user.user);
  const Load = useSelector(state => state.loading.status);
  const dispatch = useDispatch();
  const [Name, setName] = useState(null);
  const [Price, setPrice] = useState(null);
  const [Description, setDescription] = useState(null);
  const [Stock, setStock] = useState(null);
  const [size, setSize] = useState(null);
  const [Small, setSmall] = useState(false);
  const [Reguler, setReguler] = useState(false);
  const [Large, setLarge] = useState(false);

  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [view, setView] = useState(false);
  const [category1, setCategory1] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);
  const [Category, setCategory] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Msg, setMsg] = useState(false);

  const openCam = async () => {
    try {
      const camera = await launchCamera({
        saveToPhotos: true,
        maxWidth: 720,
        maxHeight: 720,
      });
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

  // create product
  const createHandler = async () => {
    try {
      dispatch(isLoading());
      // set data
      let formProduct = new FormData();
      let imgData;
      if (file !== null) {
        imgData = {
          uri: file.assets[0].uri,
          size: file.assets[0].fileSize,
          name: file.assets[0].fileName,
          type: file.assets[0].type,
        };
      }
      file !== null ? formProduct.append('photo', imgData) : setFile(null);
      Name !== null ? formProduct.append('name', Name) : setName(null);
      Category !== null
        ? formProduct.append('category', Category)
        : setCategory(null);
      Description !== null
        ? formProduct.append('description', Description)
        : setDescription(null);

      // cek token
      const token = await GenerateToken(login);
      let newToken = login;
      newToken['tokenkey'] = token;
      dispatch(successLogin(newToken));
      // add product
      const product = await addProduct(token, formProduct);
      if (product.data.data !== undefined) {
        // add stock
        let FormStock = {
          product_id: product.data.data.id,
          size: size,
          quantity: Stock,
          price: Price,
        };
        await addStock(token, FormStock);
        dispatch(doneLoading());
        navigation.replace('Home', {
          screen: 'Home',
          params: {notif: 'Product added successfully'},
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(doneLoading());
      setIsError(true);
      setMsg(error.response.data.message);
      if (error.request.status !== 400) {
        if (error.request.status === 401) {
          dispatch(failLogin());
          navigation.replace('Login', {notif: 'authentication has expired'});
        }
        //   const screen = ErrorsHandler(error.request.status);
        //   console.log(screen);
        //   navigation.navigate(screen);
      }
    }
  };

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
                  placeholder="Input the product name min. 30 characters"
                  style={styles.inputForm}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Price</Text>
                <TextInput
                  value={Price}
                  onChangeText={text => setPrice(text)}
                  placeholderTextColor={'rgba(159, 159, 159, 1)'}
                  placeholder="Input the product price"
                  style={styles.inputForm}
                />
              </View>
              <View style={styles.boxForm}>
                <Text style={styles.textTitle}>Input stock </Text>
                <TextInput
                  value={Stock}
                  onChangeText={text => setStock(text)}
                  keyboardType={'numeric'}
                  placeholderTextColor={'rgba(159, 159, 159, 1)'}
                  placeholder="Input stock"
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
                <Text style={styles.textTitle}>Input Category Product </Text>
                <View>
                  {category1 === true ? (
                    <TouchableOpacity style={styles.boxbulletActive}>
                      <Text style={styles.textBoxBulletActive}>Coffee</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.boxbullet}
                      onPress={() => {
                        setCategory1(true);
                        setCategory2(false);
                        setCategory3(false);
                        setCategory('coffee');
                      }}>
                      <Text style={styles.textBoxBullet}>Coffee</Text>
                    </TouchableOpacity>
                  )}
                  {category2 === true ? (
                    <TouchableOpacity style={styles.boxbulletActive}>
                      <Text style={styles.textBoxBulletActive}>Foods</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setCategory1(false);
                        setCategory2(true);
                        setCategory3(false);
                        setCategory('food');
                      }}
                      style={styles.boxbullet}>
                      <Text style={styles.textBoxBullet}>Foods</Text>
                    </TouchableOpacity>
                  )}
                  {category3 === true ? (
                    <TouchableOpacity style={styles.boxbulletActive}>
                      <Text style={styles.textBoxBulletActive}>Non Coffee</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setCategory1(false);
                        setCategory2(false);
                        setCategory3(true);
                        setCategory('noncoffee');
                      }}
                      style={styles.boxbullet}>
                      <Text style={styles.textBoxBullet}>Non Coffee</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnRegis}
              onPress={() => createHandler()}>
              <Text style={styles.textBtnRegis}>Save product</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default AddProduct;
