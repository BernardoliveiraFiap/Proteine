import React from 'react';
import { StatusBar, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalculoProteinaScreen from './screens/CalculoProteinaScreen';
import MetaScreen from './screens/MetaScreen';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.linkedin.com/in/oliveiraenzobackend/')}>
          <Icon name="linkedin" size={30} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Seja bem-vindo, senhor!</Text>
        <TouchableOpacity style={[styles.button, styles.firstButton]} onPress={() => navigation.navigate('CalculoProteina')}>
          <Text style={styles.buttonText}>Calcular Proteína</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondButton]} onPress={() => navigation.navigate('Meta')}>
          <Text style={styles.buttonText}>Meta Diária</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Proteine',
            headerStyle: { backgroundColor: 'blue' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CalculoProteina"
          component={CalculoProteinaScreen}
          options={{ title: 'Cálculo de Proteína', headerStyle: { backgroundColor: 'blue' },headerTintColor: '#fff' }}
        />
        <Stack.Screen
          name="Meta"
          component={MetaScreen}
          options={{ title: 'Meta Diária de Proteína', headerStyle: { backgroundColor: 'blue' },headerTintColor: '#fff' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20, // Espaçamento ajustado
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconContainer: {
    marginBottom: 20, // Espaçamento ajustado
  },
  firstButton: {
    marginBottom: 20, // Espaçamento específico para o primeiro botão
  },
  secondButton: {
    marginBottom: 40, // Espaçamento específico para o segundo botão
  },
});
