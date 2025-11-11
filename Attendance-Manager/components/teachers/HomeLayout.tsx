import React from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { NavigationOptionsForTeachers } from "@/assets/constants";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(400, width * 0.72);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Option Card
const OptionCard = ({ item, index }: any) => {
  const router = useRouter();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const tilt = useSharedValue(0);

  // entrance animation stagger
  opacity.value = withDelay(index * 80, withTiming(1, { duration: 450 }));
  tilt.value = withDelay(index * 80, withTiming(0, { duration: 450 }));

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${tilt.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      entering={FadeInUp.duration(420).delay(index * 80)}
      style={aStyle as any}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 12, stiffness: 140 });
        tilt.value = withTiming(-1.5, {
          duration: 160,
          easing: Easing.out(Easing.quad),
        });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 12, stiffness: 140 });
        tilt.value = withTiming(0, {
          duration: 200,
          easing: Easing.out(Easing.quad),
        });
      }}
      onPress={() => router.push(item.href as any)}
      className="mr-1.5"
    >
      <LinearGradient
        colors={["#60a5fa", "#f8fafc"]} // light card gradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="items-center w-[11.5rem] p-4 rounded-xl shadow"
        style={{
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "rgba(15,23,42,0.04)",
        }}
      >
        <View className="p-3.5 rounded-full bg-white border border-gray-100 shadow-sm">
          <Ionicons
            name={item.icon as keyof typeof Ionicons.glyphMap}
            size={44}
            color="#60a5fa" // primary blue icon
          />
        </View>
        <Text className="mt-3 font-semibold text-center text-gray-100">
          {item.title}
        </Text>
      </LinearGradient>
    </AnimatedPressable>
  );
};

// section Header
const SectionHeader = ({ title }: { title: string }) => {
  const anim = useSharedValue(0);
  anim.value = withDelay(60, withTiming(1, { duration: 450 }));

  const style = useAnimatedStyle(() => ({
    opacity: anim.value,
    transform: [{ translateY: anim.value ? 0 : 8 }],
  }));

  return (
    <Animated.View
      style={style as any}
      className="flex-row items-center justify-between mb-3"
    >
      <Text className="text-3xl font-extrabold text-gray-900">{title}</Text>
      <View className="flex-row items-center space-x-2">
        <Pressable className="p-2 border border-gray-100 rounded-lg bg-white/80">
          <Ionicons name="notifications-outline" size={18} color="#374151" />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const SearchBar = () => {
  const focus = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    borderColor: focus.value ? "rgba(37,99,235,0.16)" : "rgba(15,23,42,0.06)",
    shadowRadius: focus.value ? 8 : 0,
    shadowOpacity: focus.value ? 0.06 : 0,
  }));

  return (
    <Animated.View
      style={[style as any, { borderWidth: 1, borderRadius: 12 }]}
      className="flex-row items-center px-3 py-2 mb-4 bg-white"
    >
      <Ionicons name="search" size={18} color="#6b7280" />
      <TextInput
        placeholder="Search students, batches..."
        placeholderTextColor="#9ca3af"
        className="flex-1 ml-3 text-gray-800"
        onFocus={() => (focus.value = withTiming(1, { duration: 180 }))}
        onBlur={() => (focus.value = withTiming(0, { duration: 180 }))}
        returnKeyType="search"
        underlineColorAndroid="transparent"
      />
    </Animated.View>
  );
};

const HomeLayout = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#ffffff", "#60a5fa", "#f8fafc"]} // subtle light background
      end={{ x: 0, y: 0 }}
      start={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <FlatList
        data={NavigationOptionsForTeachers}
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingTop: Platform.OS === "android" ? 18 : 36,
        }}
        keyExtractor={(item) => item.category}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.duration(420).delay(index * 80)}
            className="mb-6"
          >
            <View className="px-4 py-3 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <SectionHeader title={item.category} />

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.options}
                contentContainerStyle={{ paddingVertical: 6 }}
                keyExtractor={(opt) => opt.title}
                renderItem={({ item: opt, index: optIndex }) => (
                  <OptionCard item={opt} index={optIndex} />
                )}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                snapToInterval={CARD_WIDTH + 12}
                decelerationRate="fast"
              />
            </View>
          </Animated.View>
        )}
        ListHeaderComponent={
          <View className="px-4 pt-6 pb-3">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-2xl font-extrabold text-gray-900">
                  Welcome back
                </Text>
                <Text className="text-sm text-gray-600">
                  Manage your classes efficiently
                </Text>
              </View>
              <Pressable
                onPress={() => router.push("/profile" as any)}
                className="items-center justify-center w-12 h-12 bg-white border border-gray-100 rounded-full shadow"
              >
                <Text className="font-bold text-gray-800">T</Text>
              </Pressable>
            </View>

            <SearchBar />
          </View>
        }
      />
    </LinearGradient>
  );
};

export default HomeLayout;
