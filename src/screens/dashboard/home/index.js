import {View, Text, TextInput, ScrollView, Image} from 'react-native';
import React from 'react';
import styles from './style';
import {Link} from '@react-navigation/native';

const Home = () => {
  return (
    <ScrollView style={styles.containerMain}>
      <Text style={styles.headerText}>A good coffee is a good day</Text>
      <View style={styles.searchInput}>
        <TextInput
          style={styles.inputBox}
          placeholder="Search"
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}></TextInput>
      </View>
      <View>
        <ScrollView horizontal vertical={false} style={styles.menuBar}>
          <View style={styles.listMenuActive}>
            <Text style={styles.menuTextActive}>Favorite</Text>
          </View>
          <View style={styles.listMenu}>
            <Text style={styles.menuText}>Promo</Text>
          </View>
          <View style={styles.listMenu}>
            <Text style={styles.menuText}>Coffee</Text>
          </View>
          <View style={styles.listMenu}>
            <Text style={styles.menuText}>Non Coffee</Text>
          </View>
          <View style={styles.listMenu}>
            <Text style={styles.menuText}>Food</Text>
          </View>
        </ScrollView>
      </View>
      <Link to={'/'} style={styles.textLink}>
        See more
      </Link>
      <View>
        <ScrollView horizontal vertical={false} style={styles.listItem}>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require('../../../assets/img/dashboard/product.png')}
            />
            <Text style={styles.itemText}>Hazelnut Latte</Text>
            <Text style={styles.itemPrice}>IDR 25.000</Text>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require('../../../assets/img/dashboard/product.png')}
            />
            <Text style={styles.itemText}>Hazelnut Latte</Text>
            <Text style={styles.itemPrice}>IDR 25.000</Text>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.itemImg}
              source={require('../../../assets/img/dashboard/product.png')}
            />
            <Text style={styles.itemText}>Hazelnut Latte</Text>
            <Text style={styles.itemPrice}>IDR 25.000</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home;
