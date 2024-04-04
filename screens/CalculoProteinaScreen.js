// CalculoProteinaScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalculoProteinaScreen({ navigation }) {
  const [frangoGramas, setFrangoGramas] = useState('');
  const [contrafileGramas, setContrafileGramas] = useState('');
  const [ovoQuantidade, setOvoQuantidade] = useState('');
  const [ovoComGema, setOvoComGema] = useState(true);
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
    const ovo = parseInt(ovoQuantidade) || 0;
    const shake = parseInt(shakeQuantidade) || 0;
    const ovoProteina = ovoComGema ? 6 : 3;
    const total = frango * 0.23 + contrafile * 0.2191 + ovo * ovoProteina + shake * 30;
    return Math.floor(total);
  };

  const salvarRegistro = async () => {
    try {
      const totalProteinas = calcularTotalProteinas();
      const registro = {
        id: Date.now(),
        frangoGramas,
        contrafileGramas,
        ovoQuantidade,
        ovoComGema,
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
      navigation.navigate('Meta');
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
      Alert.alert('Erro', 'Houve um erro ao salvar o registro. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.label}>Filé de Frango (g)</Text>
        <TextInput
          style={styles.input}
          value={frangoGramas}
          onChangeText={text => setFrangoGramas(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Contrafilé (g)</Text>
        <TextInput
          style={styles.input}
          value={contrafileGramas}
          onChangeText={text => setContrafileGramas(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Ovo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={ovoComGema}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setOvoComGema(itemValue)}
          >
            <Picker.Item label="Com Gema" value={true} />
            <Picker.Item label="Sem Gema" value={false} />
          </Picker>
        </View>
        <Text style={styles.label}>Quantidade de Ovos</Text>
        <TextInput
          style={styles.input}
          value={ovoQuantidade}
          onChangeText={text => setOvoQuantidade(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Shake de Whey (quantidade)</Text>
        <TextInput
          style={styles.input}
          value={shakeQuantidade}
          onChangeText={text => setShakeQuantidade(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Meta Diária de Proteína (g)</Text>
        <TextInput
          style={styles.input}
          value={metaDiaria}
          onChangeText={text => setMetaDiaria(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Dia</Text>
        <TextInput
          style={styles.input}
          value={dia}
          onChangeText={text => setDia(text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Mês</Text>
        <TextInput
          style={styles.input}
          value={mes}
          onChangeText={text => setMes(text)}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={salvarRegistro}>
          <Text style={styles.saveButtonText}>Salvar</Text>
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
  scrollViewContent: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
