import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type NavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Dashboard: undefined;
  Book: undefined;
  Member: undefined;
  Borrow: undefined;
  Return: undefined;
  Report: undefined;
};
