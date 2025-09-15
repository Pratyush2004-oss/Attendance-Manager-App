import AuthHeader from "@/components/auth/AuthHeader";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import { useUserStore } from "@/store/userStore";
import { resetPasswordInputType } from "@/types";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";

const ForgotPassword = () => {
  const [showmodal, setShowModal] = useState(false);
  const { forgotPassword } = useUserStore();

  const [input, setinput] = useState<resetPasswordInputType>({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleForgotPassword = async () => {
    const res = await forgotPassword(input.email);
    if (res) {
      Alert.alert("Success", "Password reset link sent to your email.", [
        {
          text: "OK",
          onPress: () => setShowModal(true),
        },
      ]);
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
              <Pressable
                className="w-full px-3 py-2 rounded-md bg-blue-900/70"
                onPress={handleForgotPassword}
              >
                <Text className="text-2xl text-center text-white">
                  Reset Password
                </Text>
              </Pressable>

              <ForgotPasswordModal
                input={input}
                setShowModal={setShowModal}
                showmodal={showmodal}
                setinput={setinput}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
