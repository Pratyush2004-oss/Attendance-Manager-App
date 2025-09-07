import AuthHeader from "@/components/auth/AuthHeader";
import OtpVerification from "@/components/auth/OtpVerification";
import { useUserStore } from "@/store/userStore";
import { resetPasswordInputType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const { forgotPassword, resetPassword } = useUserStore();
  const router = useRouter();

  const [input, setinput] = useState<resetPasswordInputType>({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleOtpChange = (otp: string) => {
    setinput({ ...input, otp });
  };

  const handleForgotPassword = async () => {
    const res = await forgotPassword(input.email);
    if (res) {
      setShowModal(true);
    }
  };

  const handleResetPassword = async () => {
    console.log(input);
    const res = await resetPassword(input);
    if (res) {
      setShowModal(false);
      router.replace("/(auth)");
    }
  };

  return (
    <KeyboardAvoidingView
      className="items-center justify-between flex-1 bg-gray-300"
      behavior="padding"
    >
      <View className="items-center flex-1 w-full justiy-between rounded-t-3xl bg-blue-500/70 max-h-[90%] mt-auto">
        <View className="relative items-center flex-1 w-full gap-2 p-5">
          {/* Header */}
          <AuthHeader />
          <View className="items-center justify-center w-full">
            <View className="w-full gap-5">
              <View className="w-full gap-2">
                <Text className="ml-3 text-xl font-bold text-white">Email</Text>
                <TextInput
                  placeholder="john.doe@example.com"
                  className="w-full px-3 py-2 text-xl bg-white rounded-md"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={input.email}
                  onChangeText={(text) => setinput({ ...input, email: text })}
                />
              </View>
              <TouchableOpacity
                className="w-full px-3 py-2 rounded-md bg-blue-900/70"
                onPress={handleForgotPassword}
              >
                <Text className="text-2xl text-center text-white">
                  Reset Password
                </Text>
              </TouchableOpacity>

              <Modal
                onShow={() => setShowModal(true)}
                visible={showmodal}
                onRequestClose={() => setShowModal(false)}
                animationType="slide"
                presentationStyle="overFullScreen"
              >
                <View className="items-center flex-1 w-full justiy-between rounded-t-3xl bg-blue-500/70 max-h-[90%] mt-auto">
                  <View className="relative items-center flex-1 w-full gap-2 p-5">
                    {/* Close button */}
                    <Pressable>
                      <Ionicons
                        name="close-circle-outline"
                        size={24}
                        color="white"
                        onPress={() => setShowModal(false)}
                      />
                    </Pressable>
                    {/* Email as heading */}
                    <View className="w-full gap-2 my-2">
                      <Text className="ml-3 text-3xl font-bold text-center text-white">
                        {input.email}
                      </Text>
                      <Text className="text-center text-white">
                        Check your email for the OTP to reset your password
                      </Text>
                    </View>

                    {/* Otp input */}
                    <View className="relative w-full gap-2 my-5">
                      <Text className="ml-3 text-xl font-bold text-white">
                        OTP
                      </Text>
                      <OtpVerification onOtpChange={handleOtpChange} />
                    </View>
                    <View className="relative w-full gap-2 mt-2">
                      <Text className="ml-3 text-xl font-semibold text-white">
                        New Password
                      </Text>
                      <TextInput
                        secureTextEntry={!showPassword}
                        placeholder="New Password"
                        className="w-full px-3 py-2 text-xl bg-white rounded-md"
                        value={input.newPassword}
                        onChangeText={(text) =>
                          setinput({ ...input, newPassword: text })
                        }
                      />
                      <Pressable
                        className="absolute -translate-y-1/2 right-3 top-3/4"
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-outline" : "eye-off-outline"
                          }
                          size={24}
                          color="black"
                        />
                      </Pressable>
                    </View>
                    <View className="relative w-full gap-2 mt-2">
                      <Text className="ml-3 text-xl font-semibold text-white">
                        Confirm Password
                      </Text>
                      <TextInput
                        secureTextEntry={!showPassword}
                        placeholder="Confirm your password"
                        className="w-full px-3 py-2 text-xl bg-white rounded-md"
                        value={input.confirmPassword}
                        onChangeText={(text) =>
                          setinput({ ...input, confirmPassword: text })
                        }
                      />
                      <Pressable
                        className="absolute -translate-y-1/2 right-3 top-3/4"
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-outline" : "eye-off-outline"
                          }
                          size={24}
                          color="black"
                        />
                      </Pressable>
                    </View>

                    {/* Confirm Button */}
                    <TouchableOpacity
                      className="w-full px-3 py-2 mt-5 rounded-md bg-blue-900/70"
                      onPress={handleResetPassword}
                    >
                      <Text className="text-2xl text-center text-white">
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
