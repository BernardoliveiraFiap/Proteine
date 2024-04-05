import React from 'react';
import { StatusBar, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalculoProteinaScreen from './screens/CalculoProteinaScreen';
import MetaScreen from './screens/MetaScreen';
import Consulta from './screens/Consulta';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} style={{ backgroundColor: '#007bff' }}>
    <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold', color: 'white' }} />
    <DrawerItem
      label="Meu Perfil"
      onPress={() => Linking.openURL('https://www.linkedin.com/in/oliveiraenzobackend/')}
      icon={() => <Icon name="linkedin" size={30} color="white" />}
    />
  </DrawerContentScrollView>
);

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      background: 'white',
      card: '#007bff',
      text: 'white',
      border: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="CalculoProteina"
          component={CalculoProteinaScreen}
          options={{
            drawerLabel: 'Cálculo de Proteína',
            drawerIcon: ({ color }) => <Icon name="cutlery" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Meta"
          component={MetaScreen}
          options={{
            drawerLabel: 'Meta',
            drawerIcon: ({ color }) => <Icon name="calendar" size={24} color={color} />,
          }}
        />

        <Drawer.Screen
          name="Consulta"
          component={Consulta}
          options={{
            drawerLabel:'Consultar Info',
            drawerIcon: ({ color }) => <Icon name="info" size={25} color={color} />,
          }}
        />


        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = () => {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.linkedin.com/in/oliveiraenzobackend/')}>
          <Icon name="linkedin" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Seja bem-vindo, senhor!</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 40, // Ajustado para distribuir uniformemente
  },
  dateText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 20, // Ajustado para centralizar verticalmente
  },
});

export default App;
