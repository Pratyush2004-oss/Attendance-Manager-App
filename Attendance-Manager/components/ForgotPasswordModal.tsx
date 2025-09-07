import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import OtpVerification from "./auth/OtpVerification";
import { resetPasswordInputType } from "@/types";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";

const ForgotPasswordModal = ({
  input,
  setShowModal,
  showmodal,
  setinput,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showmodal: boolean;
  input: resetPasswordInputType;
  setinput: React.Dispatch<React.SetStateAction<resetPasswordInputType>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { resetPassword } = useUserStore();
  const handleOtpChange = (otp: string) => {
    setinput({ ...input, otp });
  };

  const handleResetPassword = async () => {
    const res = await resetPassword(input);
    if (res) {
      setShowModal(false);
      router.replace("/(auth)");
    }
  };

  return (
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
            <Text className="ml-3 text-xl font-bold text-white">OTP</Text>
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
              onChangeText={(text) => setinput({ ...input, newPassword: text })}
            />
            <Pressable
              className="absolute -translate-y-1/2 right-3 top-3/4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
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
                name={showPassword ? "eye-outline" : "eye-off-outline"}
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
            <Text className="text-2xl text-center text-white">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ForgotPasswordModal;
