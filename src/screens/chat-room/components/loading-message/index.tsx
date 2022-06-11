import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

export const LoadingView = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="small" color="grey" />
  </View>
)