import React from 'react';
import { StatusBar, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalculoProteinaScreen from './screens/CalculoProteinaScreen';
import MetaScreen from './screens/MetaScreen';
import Consulta from './screens/Consulta';
import TreinoPeito from './screens/TreinoPeito';
import TreinoCostas from './screens/TreinoCostas';
import TreinoOmbros from './screens/TreinoOmbro'; // Importa o componente TreinoOmbros
import YoutubePlayer from 'react-native-youtube-iframe';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      label="Limpar AsyncStorage"
      onPress={clearAsyncStorage}
      icon={() => <Icon name="trash" size={24} color="white" />}
    />
  </DrawerContentScrollView>
);

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem('CostasBicepsExercicios');
    alert('AsyncStorage limpo com sucesso!');
  } catch (error) {
    alert('Erro ao limpar AsyncStorage: ' + error.message);
  }
};

const AudioButton1 = () => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <>
      <Button
        title={playing ? "Pause Light Weight" : "Play Light Weight"}
        onPress={() => { setPlaying(prev => !prev); }}
      />
      <YoutubePlayer
        height={0} // Set to 0 so the video player is hidden
        play={playing}
        videoId={'8puNABA4rxw'}
        onChangeState={event => console.log(event)}
      />
    </>
  );
};

const AudioButton2 = () => {
  const [playing, setPlaying] = React.useState(false);

  return (
    <>
      <Button
        title={playing ? "Pause Yeah Buddy" : "Play Yeah Buddy"}
        onPress={() => { setPlaying(prev => !prev); }}
      />
      <YoutubePlayer
        height={0} // Set to 0 so the video player is hidden
        play={playing}
        videoId={'Cbwowt-joDU'}
        onChangeState={event => console.log(event)}
      />
    </>
  );
};

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
          name="Treino de Peito"
          component={TreinoPeito}
          options={{
            drawerLabel: 'Treino de Peito',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Treino de Costas"
          component={TreinoCostas}
          options={{
            drawerLabel: 'Treino de Costas',
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="weight-lifter" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Treino de Ombros" // Nomeie a tela como "Treino de Ombros"
          component={TreinoOmbros} // Use o componente TreinoOmbros
          options={{
            drawerLabel: 'Treino de Ombros', // Etiqueta do Drawer
            drawerIcon: ({ color }) => <MaterialCommunityIcons name="weight" size={24} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Calcular Proteína"
          component={CalculoProteinaScreen}
          options={{
            drawerLabel: 'Calcular Proteína',
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
        <View style={styles.buttonSpacing}>
          <AudioButton1 />
        </View>
        <View style={styles.buttonSpacing}>
          <AudioButton2 />
        </View>
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
  buttonSpacing: {
    marginTop: 25, // Espaçamento de 10 unidades
  },
});

export default App;
