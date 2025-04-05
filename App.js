import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Platform, StatusBar, ActivityIndicator } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./src/store";
import { Navigator } from "./src/navigation/Navigator";
import { useDB } from "./src/hooks/useDB";
import { setUser } from "./src/features/user/userSlice";
import { useFonts } from "expo-font";
import { useCartDB } from "./src/hooks/dbCart";
import { setCarrito } from "./src/features/shop/carritoSlice";
import { useSelector } from "react-redux";



const Startup = () => {
  const { initDB, getAllSessions } = useDB();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { createTable, getItemsByUser } = useCartDB();
  const user = useSelector((state) => state.auth.value);



  const [fontsLoaded] = useFonts({
    "Oswald": require("./assets/fonts/Oswald.ttf"),
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (Platform.OS !== "web") {
          await initDB();
          createTable();
          const sessions = await getAllSessions();
          if (sessions && sessions.length > 0) {
            const session = sessions[0];

            if (session && session.email && session.token && session.localId) {
              dispatch(setUser({
                email: session.email,
                localId: session.localId,
                token: session.token,
                name: session.name || '',
                imageCamera: session.image || null,
              }));
            }
          }
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (!loading && user && user.localId) {
      getItemsByUser(user.localId, (items) => {
        dispatch(setCarrito(items));
      });
    }
  }, [loading, user]);




  if (loading || !fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="white" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Startup />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

