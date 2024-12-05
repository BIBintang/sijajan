import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function CheckoutScreen() {
  const { cart } = useLocalSearchParams();
  const [items, setItems] = useState<MenuItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (cart) {
      setItems(JSON.parse(cart as string)); // Parse and set the cart data
    }
  }, [cart]);

  // Handle individual item removal
  const handleRemoveItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems); // Update state
    Toast.show({
      type: "info",
      position: "top",
      text1: "Item Dihapus",
      text2: "Makanan telah dihapus dari pesanan.",
      visibilityTime: 4000,
      autoHide: true,
    });

    // Update URL cart data
    router.replace({
      pathname: "/checkout",
      query: { cart: JSON.stringify(updatedItems) }, // Update cart in URL
    });
  };

  // Handle order confirmation and clear the cart
  const handleConfirmOrder = () => {
    Toast.show({
      type: "success",
      position: "top",
      text1: "Pesanan Berhasil!",
      text2: "Pesanan Anda telah dikonfirmasi.",
      visibilityTime: 4000,
      autoHide: true,
    });

    router.replace({
      pathname: "/checkout",
      query: { cart: "[]" },
    });

    setItems([]);
  };

  // Handle order cancellation and clear the cart
  const handleCancelOrder = () => {
    setItems([]);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Pesanan Dibatalkan",
      text2: "Pesanan Anda telah dibatalkan.",
      visibilityTime: 4000,
      autoHide: true,
    });

    router.replace({
      pathname: "/checkout",
      query: { cart: "[]" },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.itemContent}>
                <View>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>Rp {item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Text style={styles.buttonText}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Tidak ada pesanan.</Text>
      )}
      {items.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmOrder}
          >
            <Text style={styles.buttonText}>Konfirmasi Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelOrder}
          >
            <Text style={styles.buttonText}>Batalkan Pesanan</Text>
          </TouchableOpacity>
        </View>
      )}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    marginBottom: 18,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  foodPrice: {
    fontSize: 18,
    color: "#FF6347",
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
