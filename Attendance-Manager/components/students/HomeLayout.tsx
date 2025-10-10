// ...existing code...
import { NavigationOptions } from "@/assets/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(400, width * 0.72);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const OptionCard = ({ item, index }: any) => {
  const router = useRouter();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  // entrance animation with stagger
  opacity.value = withDelay(index * 80, withTiming(1, { duration: 400 }));

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedPressable
      entering={FadeInUp.duration(450).delay(index * 80)}
      style={aStyle as any}
      className="items-center w-[11.5rem] p-4 mr-3 shadow-lg bg-gradient-to-br from-blue-500/80 to-indigo-600/85 rounded-xl"
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 12, stiffness: 120 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 12, stiffness: 120 });
      }}
      onPress={() => {
        router.push(item.href as any);
      }}
    >
      <View className="p-3.5 border border-white/20 rounded-full bg-white/10">
        <Ionicons
          name={item.icon as keyof typeof Ionicons.glyphMap}
          size={item.icon.includes("people") || item.icon.includes("bar") ? 40 : 45}
          color="white"
        />
      </View>
      <Text className="mt-3 font-medium text-center text-white text-wrap">
        {item.title}
      </Text>
    </AnimatedPressable>
  );
};

const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View className="flex-row items-center justify-between mb-3">
      <Text className="text-3xl font-black text-white">{title}</Text>
      <View className="flex-row items-center">
        <Pressable className="p-2 mr-3 rounded-lg bg-white/10">
          <Ionicons name="notifications-outline" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const SearchBar = () => {
  const focusAnim = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: focusAnim.value,
    borderColor: focusAnim.value ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.15)",
  }));

  return (
    <Animated.View
      style={[
        animatedStyle as any,
        { borderWidth: 1, borderRadius: 12, overflow: "hidden" },
      ]}
      className="flex-row items-center px-3 py-2 mb-4 bg-white/6"
    >
      <Ionicons name="search" size={18} color="white" />
      <TextInput
        placeholder="Search options, students, batches..."
        placeholderTextColor="rgba(255,255,255,0.7)"
        className="flex-1 ml-3 text-white"
        onFocus={() => (focusAnim.value = withTiming(1, { duration: 200 }))}
        onBlur={() => (focusAnim.value = withTiming(0, { duration: 200 }))}
      />
    </Animated.View>
  );
};

const HomeLayout = () => {
  const router = useRouter();
  const headerAnim = useSharedValue(0);
  headerAnim.value = withDelay(120, withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerAnim.value,
    transform: [{ translateY: withTiming(headerAnim.value ? 0 : 12) as any }],
  }));

  return (
    <View className="flex-1 bg-blue-500/12">
      {/* Top hero */}
      <Animated.View style={headerStyle as any} className="px-4 pt-8 pb-4">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-2xl font-extrabold text-white">Good Morning</Text>
            <Text className="text-sm text-white/80">Welcome back to Attendance Manager</Text>
          </View>
          <Pressable
            onPress={() => router.push("/profile" as any)}
            className="items-center justify-center w-12 h-12 rounded-full bg-white/10"
          >
            <Text className="font-bold text-white">A</Text>
          </Pressable>
        </View>

        <SearchBar />
      </Animated.View>

      {/* Main list */}
      <FlatList
        data={NavigationOptions}
        className="px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyExtractor={(item) => item.category}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInUp.duration(450).delay(index * 120)}
            className="mb-6"
          >
            <View className="px-4 py-3 border border-white/10 rounded-2xl bg-white/4">
              <SectionHeader title={item.category} />

              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.options}
                contentContainerStyle={{ paddingVertical: 4 }}
                keyExtractor={(opt) => opt.title}
                renderItem={({ item: opt, index: optIndex }) => (
                  <OptionCard item={opt} index={optIndex} />
                )}
                ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                snapToInterval={CARD_WIDTH + 12}
                decelerationRate="fast"
                pagingEnabled={false}
              />
            </View>
          </Animated.View>
        )}
      />
    </View>
  );
};

export default HomeLayout;