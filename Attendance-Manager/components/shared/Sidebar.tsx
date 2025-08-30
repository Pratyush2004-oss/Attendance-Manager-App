import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");
export default function Sidebar({
  onClose,
  visible,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);
  return (
    <>
      {/* overlay*/}
      {visible && (
        <TouchableOpacity
          className="absolute top-0 bottom-0 left-0 right-0 z-20 w-full h-full bg-black opacity-50"
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      {/* sidebar */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className={`absolute top-0 left-0 w-3/4 bg-white pt-5 px-4 h-full z-40 shadow-lg`}
        style={{ transform: [{ translateX: slideAnim }] }}
      ></Animated.ScrollView>
    </>
  );
}
