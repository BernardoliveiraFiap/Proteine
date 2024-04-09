import React, { useState } from 'react';
import { StatusBar, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Button, Image } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalculoProteinaScreen from './screens/CalculoProteinaScreen';
import MetaScreen from './screens/MetaScreen';
import Consulta from './screens/Consulta';
import TreinoPeito from './screens/TreinoPeito';
import TreinoCostas from './screens/TreinoCostas';
import TreinoOmbro from './screens/TreinoOmbro';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} style={{ backgroundColor: '#007bff' }}>
    <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold', color: 'white' }} />
    <DrawerItem
      label="Meu Perfil"
      onPress={() => Linking.openURL('https://www.linkedin.com/in/oliveiraenzobackend/')}
      icon={() => <Icon name="linkedin" size={30} color="white" />}
    />
    <DrawerItem
      label="Mudar Tema"
      onPress={props.toggleLightMode}
      icon={() => <Icon name="lightbulb-o" size={24} color="white" />}
    />
  </DrawerContentScrollView>
);



const App = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  const MyTheme = {
    ...DefaultTheme,
    dark: isLightMode ? false : true,
    colors: {
      ...DefaultTheme.colors,
      primary: isLightMode ? 'black' : 'white',
      background: isLightMode ? 'white' : '#007bff',
      card: '#007bff',
      text: isLightMode ? 'black' : 'white',
      border: 'white',
    },
  };

  const toggleLightMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar barStyle={isLightMode ? "dark-content" : "light-content"} backgroundColor={isLightMode ? "white" : "black"} />
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} toggleLightMode={toggleLightMode} />}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
          }}>
          {props => <HomeScreen {...props} isLightMode={isLightMode} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Treino de Peito"
          options={{
            drawerLabel: 'Treino de Peito',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={24} color={color} />,
          }}>
          {props => <TreinoPeito {...props} isLightMode={isLightMode} toggleLightMode={toggleLightMode} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Treino de Costas"
          options={{
            drawerLabel: 'Treino de Costas',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="weight-lifter" size={24} color={color} />,
          }}>
          {props => <TreinoCostas {...props} isLightMode={isLightMode} toggleLightMode={toggleLightMode} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Treino de Ombros"
          options={{
            drawerLabel: 'Treino de Ombros',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="weight" size={24} color={color} />,
          }}>
          {props => <TreinoOmbro {...props} isLightMode={isLightMode} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Calcular Proteína"
          options={{
            drawerLabel: 'Calcular Proteína',
            drawerIcon: ({ color }) => <Icon name="cutlery" size={24} color={color} />,
          }}>
          {props => <CalculoProteinaScreen {...props} isLightMode={isLightMode} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Meta"
          children={props => <MetaScreen {...props} isLightMode={isLightMode} />}
          options={{
            drawerLabel: 'Meta',
            drawerIcon: ({ color }) => <Icon name="calendar" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Consulta"
          children={props => <Consulta {...props} isLightMode={isLightMode} />}
          options={{
            drawerLabel:'Consultar Info',
            drawerIcon: ({ color }) => <Icon name="info" size={25} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ isLightMode }) => {
  const date = new Date();
  const currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return (
    <SafeAreaView style={[styles.container, isLightMode && styles.containerLight]}>
      <View style={styles.content}>
        {/* Adicionando espaço ao cabeçalho */}
        <TouchableOpacity style={[styles.iconContainer, { marginTop: 30 }]} >
          {/* Utilizando um componente de imagem para evitar o erro */}
          <Image source={require('./assets/icon.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={[styles.welcomeText, isLightMode && { color: 'black' }]}>Seja bem-vindo, senhor!</Text>
        <Text style={[styles.dateText, isLightMode && { color: 'black' }]}>{currentDate}</Text>
        
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
  containerLight: {
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10, 
    color: 'white',
  },
  dateText: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 90, 
    color: 'white',
  },
  iconContainer: {
    marginBottom: 10, 
  },
  buttonSpacing: {
    marginTop: 10, 
  },
  
  icon: {
    width: 300,
    height: 300,
    marginBottom: 80, 
    borderRadius: 8,
  },
});

export default App;

