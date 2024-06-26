import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalculoProteinaScreen({ navigation, isLightMode }) {
  const [frangoGramas, setFrangoGramas] = useState('');
  const [contrafileGramas, setContrafileGramas] = useState('');
  const [ovoComGema, setOvoComGema] = useState('');
  const [ovoSemGema, setOvoSemGema] = useState('');
  const [shakeQuantidade, setShakeQuantidade] = useState('');
  const [metaDiaria, setMetaDiaria] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');

  useEffect(() => {
    loadMetaDiaria();
  }, []);

  const loadMetaDiaria = async () => {
    try {
      const meta = await AsyncStorage.getItem('metaDiaria');
      if (meta !== null) {
        setMetaDiaria(meta);
      }
    } catch (error) {
      console.error('Erro ao carregar a meta diária:', error);
    }
  };

  const calcularTotalProteinas = () => {
    const frango = parseFloat(frangoGramas) || 0;
    const contrafile = parseFloat(contrafileGramas) || 0;
    const ovoComGemaQty = parseInt(ovoComGema) || 0;
    const ovoSemGemaQty = parseInt(ovoSemGema) || 0;
    const shake = parseInt(shakeQuantidade) || 0;
    const totalOvos = ovoComGemaQty * 6 + ovoSemGemaQty * 3;
    const total = frango * 0.23 + contrafile * 0.2191 + totalOvos + shake * 30;
    return Math.floor(total);
  };

  const salvarRegistro = async () => {
    try {
      const totalProteinas = calcularTotalProteinas();
      const registro = {
        id: Date.now(),
        frangoGramas,
        contrafileGramas,
        ovoComGema,
        ovoSemGema,
        shakeQuantidade,
        dia,
        mes,
        metaDiaria,
        totalProteinas,
      };
      let registrosAnteriores = await AsyncStorage.getItem('registros');
      registrosAnteriores = registrosAnteriores ? JSON.parse(registrosAnteriores) : [];
      registrosAnteriores.push(registro);
      await AsyncStorage.setItem('registros', JSON.stringify(registrosAnteriores));
      Alert.alert('Sucesso', 'Registro salvo com sucesso!');
      navigation.navigate('Meta', { metaDiaria: metaDiaria }); // Passando a meta diária como parâmetro na navegação
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
      Alert.alert('Erro', 'Houve um erro ao salvar o registro. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, isLightMode ? styles.containerLight : styles.containerDark]}>
      <StatusBar barStyle={isLightMode ? "dark-content" : "light-content"} backgroundColor={isLightMode ? "white" : "black"} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.label, isLightMode && styles.labelLight]}>Filé de Frango (g)</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={frangoGramas}
          onChangeText={text => setFrangoGramas(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Contrafilé (g)</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={contrafileGramas}
          onChangeText={text => setContrafileGramas(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Ovos com Gema</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={ovoComGema}
          onChangeText={text => setOvoComGema(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Ovos sem Gema</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={ovoSemGema}
          onChangeText={text => setOvoSemGema(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Shake de Whey (quantidade)</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={shakeQuantidade}
          onChangeText={text => setShakeQuantidade(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Meta Diária de Proteína (g)</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={metaDiaria}
          onChangeText={text => setMetaDiaria(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Dia</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={dia}
          onChangeText={text => setDia(text)}
          keyboardType="numeric"
        />

        <Text style={[styles.label, isLightMode && styles.labelLight]}>Mês</Text>
        <TextInput
          style={[styles.input, isLightMode && styles.inputLight]}
          value={mes}
          onChangeText={text => setMes(text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={[styles.saveButton, isLightMode && styles.saveButtonLight]} onPress={salvarRegistro}>
          <Text style={[styles.saveButtonText, isLightMode && styles.saveButtonTextLight]}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  scrollViewContent: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  labelLight: {
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputLight: {
    backgroundColor: '#f2f2f2',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButtonLight: {
    backgroundColor: '#0099ff',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  saveButtonTextLight: {
    color: '#000',
  },
});
