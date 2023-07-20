import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useCallback} from 'react';
import {Container} from '@components';
import styles from './styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {lightTheme} from '@constants';
import {aspectRatio} from '@utils';
import {Card} from 'react-native-paper';
import {NavigationProps} from '@interfaces';

const listMenu = [
  {
    key: 'anggota',
    title: 'Anggota',
    empty: false,
    iconName: 'users',
    route: 'Member',
  },
  {
    key: 'book',
    title: 'Data Buku',
    empty: false,
    iconName: 'book',
    route: 'Book',
  },
  {
    key: 'borrow',
    title: 'Peminjaman Buku',
    empty: false,
    iconName: 'sign-out',
    route: 'Borrow',
  },
  {
    key: 'return',
    title: 'Pengembalian Buku',
    empty: false,
    iconName: 'exchange',
    route: 'Return',
  },
  // {
  //   key: 'report',
  //   title: 'Laporan',
  //   empty: false,
  //   iconName: 'file',
  //   route: 'Report',
  // },
];

const formatData = (data = listMenu, numColumns = 2) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      key: `blank-${numberOfElementsLastRow}`,
      empty: true,
      title: '',
      iconName: '',
      route: 'dashboard',
    });
    numberOfElementsLastRow++;
  }

  return data;
};

type DashboardProps = NavigationProps<any> & {};

const Dashboard = ({navigation}: DashboardProps) => {
  const handlePressCard = useCallback(
    (route: any) => {
      navigation.navigate(route);
    },
    [navigation],
  );
  const renderItem = useCallback(
    ({item}: any) => {
      if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
      }
      return (
        <Card style={styles.item} onPress={() => handlePressCard(item.route)}>
          <Card.Content style={styles.cardContent}>
            <AwesomeIcon
              name={item.iconName}
              color={lightTheme.primary}
              size={aspectRatio(40)}
            />
            <Text style={styles.itemText}>{item.title}</Text>
          </Card.Content>
        </Card>
      );
    },
    [handlePressCard],
  );

  return (
    <Container>
      <View style={styles.topBody} />
      <View style={styles.bottomBody}>
        <FlatList
          data={formatData()}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default Dashboard;
