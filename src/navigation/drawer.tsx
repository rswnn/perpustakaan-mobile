import React, {useCallback} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  DashboardScreen,
  BookScreen,
  MemberScreen,
  BorrowScreen,
  // ReportScreen,
  ReturnScreen,
} from '@screen';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppDispatch} from '@hooks';
import {action} from '@store';
import {lightTheme} from '@constants';
import {aspectRatio} from '@utils';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const setLogout = useAppDispatch(action.AuthAction.setLogoutAction);
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.flex}>
      <View style={[styles.header, styles.border]}>
        <Text style={{fontSize: 20, textAlign: 'right', marginHorizontal: 15}}>
          SMK YPUI
        </Text>
      </View>
      <DrawerItemList {...props} />
      <View style={[styles.flex, styles.border]} />
      <DrawerItem label="Keluar" onPress={() => setLogout()} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = () => {
  const renderHeaderTitle = useCallback((route: any) => {
    switch (route.name) {
      case 'Member':
        return 'Data Anggota';
      case 'Book':
        return 'Data Buku';
      case 'Borrow':
        return 'Data Peminjaman';
      case 'Return':
        return 'Data Pengembalian';
      // case 'Report':
      //   return 'Data Laporan';
      default:
        return 'Perpustakaan Digital';
    }
  }, []);

  const renderMenuIcon = useCallback((navigation: any) => {
    return (
      <AwesomeIcon
        style={styles.menuIcon}
        color={lightTheme.white}
        name="bars"
        size={aspectRatio(15)}
        onPress={navigation.toggleDrawer}
      />
    );
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation, route}) => ({
        headerTintColor: lightTheme.white,
        headerStyle: {
          backgroundColor: lightTheme.primary,
          borderColor: 'transparent',
        },
        drawerInactiveTintColor: lightTheme.black,
        headerShadowVisible: false,
        headerTitle: renderHeaderTitle(route),
        headerLeft: () => renderMenuIcon(navigation),
        drawerStyle: {
          backgroundColor: lightTheme.white,
        },
      })}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerLabel: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="Member"
        component={MemberScreen}
        options={{
          drawerLabel: 'Anggota',
        }}
      />
      <Drawer.Screen
        name="Book"
        component={BookScreen}
        options={{
          drawerLabel: 'Buku',
        }}
      />
      <Drawer.Screen
        name="Borrow"
        component={BorrowScreen}
        options={{
          drawerLabel: 'Peminjaman',
        }}
      />
      <Drawer.Screen
        name="Return"
        component={ReturnScreen}
        options={{
          drawerLabel: 'Pengembalian',
        }}
      />
      {/* <Drawer.Screen
        name="Report"
        component={ReportScreen}
        options={{
          drawerLabel: 'Laporan',
        }}
      /> */}
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
  menuIcon: {
    paddingLeft: aspectRatio(10),
  },
});

export default DrawerNavigation;
