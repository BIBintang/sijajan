import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { menuData } from "@/data/menu"; // Import the menu data
import { Ionicons } from "@expo/vector-icons"; // Import icon library

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string; // Add image property
}

export default function MenuScreen() {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [searchText, setSearchText] = useState<string>(""); // State to store search text
  const router = useRouter();

  // Filter menu items based on search text
  const filteredMenu = menuData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBuy = (item: MenuItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);

    router.push({
      pathname: "/checkout",
      params: { cart: JSON.stringify(updatedCart) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 SIJAJAN</Text>

      {/* Modern Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Makanan"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Menu Items */}
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.foodPrice}>Rp {item.price}</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuy(item)}
            >
              <Text style={styles.buyButtonText}>Beli</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 45,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 10,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
