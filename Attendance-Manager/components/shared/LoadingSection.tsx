import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from "react-native-reanimated";

const LoadingSection = () => {
  const shimmerAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(0.7);
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    // Fade in animation
    fadeAnim.value = withTiming(1, { duration: 800 });

    // Shimmer effect
    shimmerAnim.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.linear }),
      -1,
      false
    );

    // Pulse animation
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.out(Easing.quad) }),
        withTiming(0.7, { duration: 1000, easing: Easing.in(Easing.quad) })
      ),
      -1,
      true
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerAnim.value, [0, 1], [-200, 200]);
    return {
      transform: [{ translateX }],
    };
  });

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseAnim.value,
  }));

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const SkeletonBox = ({
    width,
    height,
    className = "",
  }: {
    width: number | `${number}%`;
    height: number;
    className?: string;
  }) => (
    <View
      className={`bg-gray-300 rounded-lg overflow-hidden ${className}`}
      style={{
        width:
          typeof width === "string" && width.endsWith("%")
            ? width
            : Number(width),
        height: height,
      }}
    >
      <Animated.View
        style={shimmerStyle}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </View>
  );

  const SkeletonCard = () => (
    <Animated.View
      style={pulseStyle}
      className="p-4 mb-4 bg-white shadow-sm rounded-xl"
    >
      <View className="flex-row items-center mb-3">
        <SkeletonBox width={50} height={50} className="mr-3 rounded-full" />
        <View className="flex-1">
          <SkeletonBox width="80%" height={16} className="mb-2" />
          <SkeletonBox width="60%" height={12} />
        </View>
      </View>
      <SkeletonBox width="100%" height={8} className="mb-2" />
      <SkeletonBox width="70%" height={8} />
    </Animated.View>
  );

  const SkeletonListItem = ({ delay = 0 }: { delay?: number }) => {
    const itemAnim = useSharedValue(0);

    useEffect(() => {
      itemAnim.value = withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.quad),
      });
    }, []);

    const itemStyle = useAnimatedStyle(() => ({
      opacity: itemAnim.value,
      transform: [
        {
          translateY: interpolate(itemAnim.value, [0, 1], [20, 0]),
        },
      ],
    }));

    return (
      <Animated.View
        style={[itemStyle, pulseStyle]}
        className="flex-row items-center p-3 mb-3 bg-white rounded-lg shadow-sm"
      >
        <SkeletonBox width={40} height={40} className="mr-3 rounded-full" />
        <View className="flex-1">
          <SkeletonBox width="70%" height={14} className="mb-2" />
          <SkeletonBox width="50%" height={10} />
        </View>
        <SkeletonBox width={60} height={24} className="rounded-full" />
      </Animated.View>
    );
  };

  return (
    <Animated.View style={fadeStyle} className="flex-1 p-4 bg-gray-50">
      {/* Header Skeleton */}
      <View className="mb-6">
        <Animated.View
          style={pulseStyle}
          className="flex-row items-center justify-between mb-4"
        >
          <View>
            <SkeletonBox width={200} height={24} className="mb-2" />
            <SkeletonBox width={150} height={16} />
          </View>
          <SkeletonBox width={40} height={40} className="rounded-full" />
        </Animated.View>
      </View>

      {/* Stats Cards Skeleton */}
      <View className="flex-row mb-6 space-x-3">
        {[1, 2, 3].map((item, index) => (
          <Animated.View
            key={item}
            style={[
              pulseStyle,
              {
                transform: [
                  {
                    scale: interpolate(pulseAnim.value, [0.7, 1], [0.95, 1]),
                  },
                ],
              },
            ]}
            className="flex-1 p-4 bg-white shadow-sm rounded-xl"
          >
            <SkeletonBox width={30} height={30} className="mb-2 rounded-lg" />
            <SkeletonBox width="80%" height={20} className="mb-1" />
            <SkeletonBox width="60%" height={14} />
          </Animated.View>
        ))}
      </View>

      {/* Main Content Cards */}
      <View className="mb-6">
        <Animated.View style={pulseStyle} className="mb-4">
          <SkeletonBox width={120} height={20} className="mb-3" />
        </Animated.View>
        <SkeletonCard />
        <SkeletonCard />
      </View>

      {/* List Items */}
      <View>
        <Animated.View style={pulseStyle} className="mb-4">
          <SkeletonBox width={100} height={18} className="mb-2" />
        </Animated.View>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <SkeletonListItem key={item} delay={index * 100} />
        ))}
      </View>

      {/* Loading Text */}
      <Animated.View
        style={[
          pulseStyle,
          {
            transform: [
              {
                scale: interpolate(pulseAnim.value, [0.7, 1], [0.98, 1]),
              },
            ],
          },
        ]}
        className="items-center mt-8"
      >
        <Text className="text-sm font-medium text-gray-500">
          Loading content...
        </Text>

        {/* Loading Dots */}
        <View className="flex-row mt-3 space-x-1">
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={useAnimatedStyle(() => ({
                opacity: withRepeat(
                  withSequence(
                    withTiming(0.3, { duration: 500 }),
                    withTiming(1, { duration: 500 })
                  ),
                  -1,
                  true
                ),
              }))}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default LoadingSection;
