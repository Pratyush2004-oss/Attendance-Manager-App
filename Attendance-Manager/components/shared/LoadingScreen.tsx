import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const LoadingScreen = () => {
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);
  const rotateAnim = useSharedValue(0);
  const letterAnimations = Array.from({ length: 18 }, () => useSharedValue(0)); // "Attendance Manager" = 18 chars

  useEffect(() => {
    // Main container fade in
    fadeAnim.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.quad),
    });

    // Scale animation
    scaleAnim.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
    });

    // Letter by letter animation
    letterAnimations.forEach((anim, index) => {
      anim.value = withDelay(
        index * 100,
        withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) })
      );
    });

    // Rotating loading indicator
    rotateAnim.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  const loadingIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateAnim.value}deg` }],
  }));

  const createLetterStyle = (index: number) => {
    return useAnimatedStyle(() => ({
      opacity: letterAnimations[index].value,
      transform: [
        {
          translateY: interpolate(
            letterAnimations[index].value,
            [0, 1],
            [20, 0]
          ),
        },
      ],
    }));
  };

  const renderAnimatedText = (text: string, startIndex: number) => {
    return text.split("").map((letter, index) => (
      <Animated.Text
        key={startIndex + index}
        style={createLetterStyle(startIndex + index)}
        className="text-4xl font-bold text-white"
      >
        {letter === " " ? "\u00A0" : letter}
      </Animated.Text>
    ));
  };

  return (
    <LinearGradient
      colors={["#2563eb", "#7c3aed"]} // blue-600 to purple-600
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="items-center justify-center flex-1"
    >
      {/* Background Pattern */}
      <View className="absolute inset-0 opacity-10">
        <View className="flex-row flex-wrap flex-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <View
              key={i}
              className="w-20 h-20 border rounded-lg border-white/20"
              style={{ margin: 10 }}
            />
          ))}
        </View>
      </View>

      <Animated.View style={containerStyle} className="items-center">
        {/* App Icon/Logo Placeholder */}
        <View className="mb-8">
          <Animated.View
            style={loadingIndicatorStyle}
            className="w-20 h-20 border-4 rounded-full border-white/30 border-t-white"
          />
          <View className="absolute inset-0 items-center justify-center">
            <View className="items-center justify-center w-12 h-12 rounded-full bg-white/20">
              <Text className="text-lg font-bold text-white">📋</Text>
            </View>
          </View>
        </View>

        {/* Animated App Title */}
        <View className="items-center mb-4">
          <View className="flex-row mb-2">
            {renderAnimatedText("Attendance", 0)}
          </View>
          <View className="flex-row">{renderAnimatedText("Manager", 10)}</View>
        </View>

        {/* Subtitle */}
        <Animated.Text
          style={useAnimatedStyle(() => ({
            opacity: withDelay(1800, withTiming(1, { duration: 800 })),
          }))}
          className="px-8 text-lg font-medium text-center text-white/80"
        >
          Managing attendance made simple
        </Animated.Text>

        {/* Loading Dots */}
        <View className="flex-row mt-8 space-x-2">
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={useAnimatedStyle(() => ({
                opacity: withDelay(
                  2000 + index * 200,
                  withRepeat(
                    withSequence(
                      withTiming(0.3, { duration: 500 }),
                      withTiming(1, { duration: 500 })
                    ),
                    -1,
                    true
                  )
                ),
              }))}
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </View>
      </Animated.View>

      {/* Bottom Brand */}
      <Animated.View
        style={useAnimatedStyle(() => ({
          opacity: withDelay(2500, withTiming(1, { duration: 800 })),
        }))}
        className="absolute items-center bottom-12"
      >
        <Text className="text-sm font-medium text-white/60">
          Powered by Your Team
        </Text>
        <View className="w-16 h-0.5 mt-2 rounded-full bg-white/30" />
      </Animated.View>
    </LinearGradient>
  );
};

export default LoadingScreen;
