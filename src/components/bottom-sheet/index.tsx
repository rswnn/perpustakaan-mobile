import React, {forwardRef, useCallback} from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {StyleProp, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  children?: React.ReactNode;
  snapPoints: any[];
  handleSheetChanges: (e: any) => void;
  style?: StyleProp<ViewStyle>;
}
export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref, Props>(
  ({children, snapPoints, handleSheetChanges, style}, ref) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      ),
      [],
    );
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <ScrollView showsVerticalScrollIndicator={false} style={style as any}>
            {children}
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default BottomSheet;
