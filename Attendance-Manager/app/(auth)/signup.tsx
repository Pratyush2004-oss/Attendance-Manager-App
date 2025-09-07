import AuthHeader from "@/components/auth/AuthHeader";
import useOrganizationHook from "@/hooks/useOrganizationHook";
import { useUserStore } from "@/store/userStore";
import { OrganizationType, signupInputType } from "@/types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Signup = () => {
  const router = useRouter();
  const [showPassword, setshowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const pathName = usePathname();
  const [OrganizationList, setOrganizationList] = useState<OrganizationType[]>(
    []
  );
  const { getOrganizationList } = useOrganizationHook();
  const [input, setInput] = useState<signupInputType>({
    email: "",
    name: "",
    Organization: [],
    password: "",
    role: "",
    guardianName: "",
    guardianNumber: "",
  });

  const { signup } = useUserStore();
  // fetch Organization List
  const fetchOrganizationList = async () => {
    const organizationList = await getOrganizationList();
    setOrganizationList(organizationList);
  };
  useEffect(() => {
    fetchOrganizationList();
  }, [pathName]);

  // Handle select Organization
  const handleSelectOrganization = (inputValue: string) => {
    if (input.Organization.some((org) => org === inputValue)) {
      return;
    }
    setInput((prevInput) => ({
      ...prevInput,
      Organization: [...prevInput.Organization, inputValue],
    }));
  };

  // Handle remove Organization
  const handleRemoveOrganization = (inputValue: string) => {
    setInput((prevInput) => ({
      ...prevInput,
      Organization: prevInput.Organization.filter(
        (organization) => organization !== inputValue
      ),
    }));
  };

  // Filter Organization to display
  const filteredOrganization = () => {
    return OrganizationList.filter((org) =>
      input.Organization.includes(org._id)
    );
  };

  // Handle form submission
  const handleSignup = async () => {
    try {
      setIsloading(true);
      const response = await signup(input);
      if (response) {
        router.push("/(auth)");
      }
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      className="items-center justify-between flex-1 bg-gray-300"
      behavior="padding"
    >
      {/* Form section */}
      <View className="items-center flex-1 w-full rounded-t-3xl bg-blue-500/70">
        <View className="relative items-center justify-between flex-1 w-full p-5">
          {/* Header */}
          <AuthHeader />
          {/* Signup form */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 w-full pb-5"
          >
            <View className="w-full gap-5 pb-5">
              {/* Name */}
              <View className="w-full gap-2">
                <Text className="ml-3 text-xl font-bold text-white">Name</Text>
                <TextInput
                  placeholder="John Doe"
                  className="w-full px-3 py-2 text-xl bg-white rounded-md"
                  value={input.name}
                  onChangeText={(text) => setInput({ ...input, name: text })}
                />
              </View>
              {/* Email */}
              <View className="w-full gap-2">
                <Text className="ml-3 text-xl font-bold text-white">Email</Text>
                <TextInput
                  placeholder="john.doe@example.com"
                  className="w-full px-3 py-2 text-xl bg-white rounded-md"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={input.email}
                  onChangeText={(text) => setInput({ ...input, email: text })}
                />
              </View>
              {/* Password */}
              <View className="relative w-full gap-2">
                <Text className="ml-3 text-xl font-bold text-white">
                  Password
                </Text>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                  className="w-full px-3 py-2 text-xl bg-white rounded-md"
                  value={input.password}
                  onChangeText={(text) =>
                    setInput({ ...input, password: text })
                  }
                />
                <Pressable
                  className="absolute -translate-y-1/2 right-3 top-3/4"
                  onPress={() => setshowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="black"
                  />
                </Pressable>
              </View>
              {/* Role */}
              <View className="flex-row items-center justify-between w-full gap-2 ">
                <Text className="ml-3 text-xl font-bold text-white">Role</Text>
                {/* group */}
                <View className="flex-row rounded-md">
                  {/* Student */}
                  <TouchableOpacity
                    className="flex-row gap-2 mr-3"
                    onPress={() => {
                      if (input.role === "student")
                        setInput({ ...input, role: "" });
                      else setInput({ ...input, role: "student" });
                    }}
                  >
                    {input.role === "student" ? (
                      <View className="ml-2">
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    ) : (
                      <View className="ml-2">
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    )}
                    <Text className="text-xl font-bold text-white">
                      Student
                    </Text>
                  </TouchableOpacity>
                  {/* teacher */}
                  <TouchableOpacity
                    className="flex-row gap-2 mr-3"
                    onPress={() => {
                      if (input.role === "teacher")
                        setInput({ ...input, role: "" });
                      else setInput({ ...input, role: "teacher" });
                    }}
                  >
                    {input.role === "teacher" ? (
                      <View className="ml-2">
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    ) : (
                      <View className="ml-2">
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    )}
                    <Text className="text-xl font-bold text-white">
                      Teacher
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Organization */}
              <View className="w-full gap-2">
                <Text className="ml-3 text-xl font-bold text-white">
                  Organization:
                </Text>
                <View className="w-full bg-white rounded-lg">
                  <Picker
                    selectedValue={""}
                    onValueChange={(itemValue) =>
                      handleSelectOrganization(itemValue)
                    }
                  >
                    <Picker.Item label="Select Organization" value="" />
                    {OrganizationList.map((organization) => (
                      <Picker.Item
                        key={organization._id}
                        label={organization.name}
                        value={organization._id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
              {/* map name of all the selected organization */}
              <FlatList
                horizontal
                className="w-full py-2 rounded-lg"
                data={filteredOrganization()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View className="relative px-3 py-2 mr-5 bg-gray-200 rounded-full">
                    <Pressable className="absolute bg-red-500 rounded-full -right-2 -top-2">
                      <MaterialIcons
                        name="close"
                        size={15}
                        color="white"
                        className="p-0.5 text-white rounded-full"
                        onPress={() => handleRemoveOrganization(item._id)}
                      />
                    </Pressable>

                    <Text className="font-medium">{item.name}</Text>
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />

              {/* Guardian Info for student only */}
              {input.role === "student" && (
                <View className="w-full gap-2">
                  {/* Guardian Name */}
                  <View className="w-full gap-2">
                    <Text className="ml-3 text-xl font-bold text-white">
                      Guardian Name
                    </Text>
                    <TextInput
                      placeholder="John Doe"
                      className="w-full px-3 py-2 text-xl bg-white rounded-md"
                      value={input.guardianName}
                      onChangeText={(text) =>
                        setInput({
                          ...input,
                          guardianName: text,
                        })
                      }
                    />
                  </View>

                  {/* Guardian Mobile Number */}
                  <View className="w-full gap-2">
                    <Text className="ml-3 text-xl font-bold text-white">
                      Guardian Mobile Number
                    </Text>
                    <TextInput
                      placeholder="+91 1234567890"
                      className="w-full px-3 py-2 text-xl bg-white rounded-md"
                      keyboardType="phone-pad"
                      value={input.guardianNumber}
                      onChangeText={(text) =>
                        setInput({
                          ...input,
                          guardianNumber: text,
                        })
                      }
                    />
                  </View>
                </View>
              )}
              {/* Signup button */}
              <TouchableOpacity
                className="w-full px-3 py-2 rounded-md bg-blue-900/70"
                onPress={handleSignup}
                disabled={isloading}
              >
                <Text className="text-2xl text-center text-white">
                  {isloading ? (
                    <ActivityIndicator className="text-white" size={"small"} />
                  ) : (
                    "Signup"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer for Login button */}
          <View className="w-full">
            <View className="flex-row items-center justify-center w-full gap-2 py-2 pb-5 border-t-2 border-white">
              <Text className="text-xl text-white">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)")}>
                <Text className="text-xl text-blue-700">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
