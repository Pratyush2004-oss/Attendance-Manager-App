import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";

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
    const toValue = visible ? 0 : -width;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <>
      {/* overlay*/}
      {visible && (
        <TouchableOpacity
          className="absolute top-0 bottom-0 left-0 right-0 z-20 w-full h-full bg-black/50"
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      {/* sidebar */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="absolute top-0 left-0 z-50 w-3/4 h-full px-4 pt-5 bg-white shadow-lg"
        style={{ transform: [{ translateX: slideAnim }] }}
      >
        <Pressable className="absolute top-0 right-0" onPress={onClose}>
          <Ionicons name="close-circle-outline" size={20} color="red" />
        </Pressable>
        <ScrollView className="flex-1">
          {/* Add your sidebar content here */}
        </ScrollView>
      </Animated.ScrollView>
    </>
  );
}
