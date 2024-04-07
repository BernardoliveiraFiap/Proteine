import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

export default function MetaScreen({ navigation, isLightMode, toggleLightMode, meta, alterarMeta }) {
  const [registros, setRegistros] = useState([]);

  const loadRegistros = async () => {
    try {
      const registrosSalvos = await AsyncStorage.getItem('registros');
      if (registrosSalvos !== null) {
        setRegistros(JSON.parse(registrosSalvos));
      }
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
    }
  };

  const excluirRegistro = async (id) => {
    try {
      const novosRegistros = registros.filter(item => item.id !== id);
      await AsyncStorage.setItem('registros', JSON.stringify(novosRegistros));
      setRegistros(novosRegistros);
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadRegistros();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={[styles.container, isLightMode && styles.containerLight]}>
      {registros.slice().reverse().map((registro, index) => (
        <View key={index} style={styles.registroContainer}>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Dia: {registro.dia}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Mês: {registro.mes}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Filé de Frango (g): {registro.frangoGramas}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Contrafilé (g): {registro.contrafileGramas}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Ovo (quantidade): {registro.ovoQuantidade} {registro.ovoComGema ? 'com Gema' : 'sem Gema'}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Ovo Sem Gema (quantidade): {registro.ovoSemGema}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Shake de Whey (quantidade): {registro.shakeQuantidade}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Meta Diária de Proteína (g): {meta}</Text>
          <Text style={[styles.label, isLightMode && styles.labelLight]}>Proteínas Ingeridas (g): {registro.totalProteinas}</Text>
          <TouchableOpacity style={styles.excluirButton} onPress={() => excluirRegistro(registro.id)}>
            <Text style={styles.excluirButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  registroContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  labelLight: {
    color: '#000',
  },
  excluirButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  excluirButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
