/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import useCategory from './useCategory';
import {ButtonCustom, TextCustom} from '@components';

const CategoryScreen = () => {
  const {handlePressCategory, categories, renderCategory} = useCategory();
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    try {
      await setRefresh(true);
    } catch (error) {
      console.log(error, 'ON REFRESH ERROR');
    }
  };

  const renderContent = () => {
    if (renderCategory) {
      return (
        <FlatList
          data={categories}
          refreshing={refresh}
          onRefresh={() => onRefresh()}
          renderItem={({item}) => (
            <ButtonCustom
              style={styles.button}
              key={item.id}
              onPress={() => handlePressCategory(categories)}>
              <TextCustom>{item.category_name}</TextCustom>
            </ButtonCustom>
          )}
          keyExtractor={item => item.category_name}
        />
      );
    }
  };
  return (
    <View style={[styles.center, styles.flex, styles.container]}>
      <View style={styles.containerListButton}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    height: 100,
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  containerListButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '80%',
  },
  containerButton: {
    width: '100%',
    marginTop: 10,
    // marginBottom: 10,
  },
  button: {
    flex: 1,
    marginVertical: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});

export default CategoryScreen;
