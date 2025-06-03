import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { forwardRef, ReactNode, useCallback, type Ref } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./BottomSheet.styles";

export interface IBottomSheet
  extends Omit<BottomSheetModalProps, "backdropComponent" | "children"> {
  children: ReactNode;
  snapPoints?: (string | number)[];
}

export const BottomSheet = forwardRef<BottomSheetModal, IBottomSheet>(
  (
    { children, snapPoints = ["50%", "80%"], index = 0, ...rest }: IBottomSheet,
    ref: Ref<BottomSheetModal>
  ) => {
    const { dark } = useTheme();

    const CustomBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => {
        const closeSheet = () => {
          // @ts-ignore
          ref.current?.dismiss();
        };
        return (
          <TouchableWithoutFeedback onPress={closeSheet}>
            <View style={[StyleSheet.absoluteFill, backdropProps.style]}>
              <BlurView
                style={StyleSheet.absoluteFill}
                tint="dark"
                intensity={0}
              />
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: "rgba(0,0,0,0.4)" },
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      },
      [ref]
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={index}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose
        enableOverDrag={false}
        overDragResistanceFactor={0.5}
        bottomInset={0}
        detached={false}
        style={styles.container}
        backgroundStyle={[
          styles.background,
          { backgroundColor: dark ? "#1e1e1e" : "#fff" },
        ]}
        handleIndicatorStyle={styles.indicator}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        {...rest}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
        >
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

BottomSheet.displayName = "BottomSheet";
