import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screen';

import DrawerNavigation from './drawer';
import {useTypedSelector} from '@hooks';
import {AuthResponseType} from '@interfaces';
import {SurahList} from '@screen';
import {StudentList} from '@screen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const {isLoggedIn} = useTypedSelector<AuthResponseType>('auth');

  const renderProtectedRoute = React.useMemo(() => {
    if (isLoggedIn) {
      return (
        <>
          <Stack.Screen name="Main" component={DrawerNavigation} />
          <Stack.Screen name="surahLists" component={SurahList} />
          <Stack.Screen name="studentLists" component={StudentList} />
        </>
        // <Stack.Screen name="surahLists" component={DrawerNavigation} />
      );
    }
    return <Stack.Screen name="Login" component={LoginScreen} />;
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {renderProtectedRoute}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
