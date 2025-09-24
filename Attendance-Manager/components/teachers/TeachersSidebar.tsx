import { useUserStore } from "@/store/userStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("screen");

export default function TeachersSidebar({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [slideAnim] = useState(new Animated.Value(-width));
  // Mock user store for display purposes, replace with your actual store
  const { user, isAdmin, logout } = useUserStore() || {
    user: { name: "Guest User", email: "guest@example.com" },
    isAdmin: true,
    logout: () => console.log("logout"),
  };
  const router = useRouter
    ? useRouter()
    : { push: (path: string) => console.log(`Routing to ${path}`) };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <>
      {/* Overlay */}
      {visible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
      {/* Sidebar */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
        showsVerticalScrollIndicator={false}
      >
        {/* --- FIX START --- */}
        {/* Added a dedicated close button */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close-circle-outline" size={20} color={"white"} />
        </Pressable>
        {/* --- FIX END --- */}

        {/* Profile Container */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.proficePic}
              source={require("@/assets/images/teacher.jpg")}
              // Using a placeholder image
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              Hi {user?.name.split(" ")[0]}
            </Text>
            <Text style={styles.mobile}>{user?.email}</Text>
          </View>
        </View>

        {/* navigation buttons container */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              router.push("/profile");
              onClose();
            }}
          >
            <Ionicons name="person-circle-outline" size={35} color={"white"} />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              router.push("/");
              onClose();
            }}
          >
            <Ionicons name="bookmarks-outline" size={35} color={"white"} />
            <Text style={styles.menuText}>Bookings</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation button in other section */}
        <View style={styles.PackageContainer}>
          <Text style={styles.PackageTitle}>Book Your Package</Text>
          <TouchableOpacity
            style={styles.PackageItem}
            onPress={() => {
              router.push("/");
              onClose();
            }}
          >
            <Ionicons name="business-outline" size={30} color={"white"} />
            <Text style={styles.menuText}>Packages</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.PackageItem}
            onPress={() => {
              router.push("/");
              onClose();
            }}
          >
            <Ionicons name="compass-outline" size={30} color={"white"} />
            <Text style={styles.menuText}>Create Your own Package</Text>
          </TouchableOpacity>
        </View>

        {/* Admin Button  */}
        {isAdmin && (
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutbtn}
              onPress={() => {
                router.push("/organization");
                onClose();
              }}
            >
              <Ionicons name="map" size={35} color={"white"} />
              <Text style={styles.menuText}>Admin Panel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Reward section */}
        <View style={styles.PackageContainer}>
          <Text style={styles.PackageTitle}>Rewards</Text>
          <TouchableOpacity style={styles.PackageItem} onPress={onClose}>
            <Ionicons name="pricetags-sharp" size={30} color={"white"} />
            <Text style={styles.menuText}>Gift Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.PackageItem} onPress={onClose}>
            <Ionicons name="people-sharp" size={30} color={"white"} />
            <Text style={styles.menuText}>Refer and Earn</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutbtn}
            onPress={() => {
              logout();
              onClose();
            }}
          >
            <Ionicons name="log-out-outline" size={35} color={"white"} />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 100,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    width: width * 0.8,
    height: "88%",
    backgroundColor: "#1DA1F2",
    zIndex: 200,
    paddingTop: 30, // FIX: Increased padding for the close button
    paddingHorizontal: 18,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  // --- FIX START ---
  // Added styles for the close button
  closeButton: {
    position: "absolute",
    top: 0,
    right: 15,
    zIndex: 100,
  },
  // --- FIX END ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22223b",
  },
  menuItem: {
    alignItems: "center",
    paddingVertical: 16,
    width: "30%",
    gap: 10,
    justifyContent: "center",
  },
  menuText: {
    fontSize: 17,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 0,
    paddingVertical: 20,
    borderRadius: 20,
  },
  profileImageContainer: {
    marginRight: 12,
  },
  proficePic: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  mobile: {
    fontSize: 16,
    marginTop: 5,
    color: "#fff",
  },
  cashbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  cashbackImageContainer: {
    marginRight: 12,
  },
  cashbackInfo: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  cashbackTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cashbackAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 15,
  },
  PackageContainer: {
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    marginTop: 20,
    borderRadius: 20,
  },
  PackageItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginVertical: 2,
  },
  PackageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  logoutContainer: {
    marginVertical: 12,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 15,
  },
  logoutbtn: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
});
