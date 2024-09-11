import { Redirect } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return <Redirect href="/(auth)/welcome" />
};

const styles = StyleSheet.create({})

export default Home;
