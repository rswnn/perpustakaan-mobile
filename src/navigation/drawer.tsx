import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {DashboardScreen, BookScreen} from '@screen';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.flex}>
      <View style={[styles.header, styles.border]}>
        <Text>SMK CISEENG</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={[styles.flex, styles.border]} />
      <DrawerItem label="Keluar" onPress={() => console.log('custom')} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen name="Book" component={BookScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
  },
  border: {
    borderBottomColor: '#DADADA',
    borderBottomWidth: 2,
  },
  logoutWrapper: {
    borderBottomColor: '#DADADA',
    borderBottomWidth: 2,
  },
  flex: {
    flex: 1,
  },
});

export default DrawerNavigation;
