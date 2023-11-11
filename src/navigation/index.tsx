import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '@screen';

import DrawerNavigation from './drawer';
import {useTypedSelector} from '@hooks';
import {AuthResponseType} from '@interfaces';
import {
  ClassroomScreen,
  StudentScreen,
  TaskScreen,
  StudentDetailScreen,
  DetailTask,
  AudioScreen,
  ResultTaskScreen,
} from '@screen';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const {isLoggedIn} = useTypedSelector<AuthResponseType>('auth');

  const renderProtectedRoute = React.useMemo(() => {
    if (isLoggedIn) {
      return (
        <>
          <Stack.Screen
            name="Main"
            component={DrawerNavigation}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="surahScreen"
            component={TaskScreen}
            options={{
              title: 'List Hafalan',
            }}
          />
          <Stack.Screen
            name="studentScreen"
            component={StudentScreen}
            options={{
              title: 'List Siswa',
            }}
          />
          <Stack.Screen name="classroomScreen" component={ClassroomScreen} />
          <Stack.Screen
            name="studentDetailScreen"
            component={StudentDetailScreen}
            options={{
              title: 'Detail Siswa',
            }}
          />
          <Stack.Screen
            name="DetailTask"
            component={DetailTask}
            options={{
              title: 'Detail Hafalan',
            }}
          />
          <Stack.Screen
            name="AudioScreen"
            component={AudioScreen}
            options={{
              title: 'Hafalan',
            }}
          />
          <Stack.Screen
            name="ResultTaskScreen"
            component={ResultTaskScreen}
            options={{
              title: 'Hafalan',
            }}
          />
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
          headerShown: true,
        }}>
        {renderProtectedRoute}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
