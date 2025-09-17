import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href={"/teacher/getAttendance"}>
        <Text>Get Attendance Lsit</Text>
      </Link>
    </View>
  );
};

export default Home;
