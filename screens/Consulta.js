import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConsultaScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Filé de Frango */}
      <View style={[styles.itemContainer, { marginVertical: 30 }]}>
        <Icon name="cutlery" size={50} color="#007bff" />
        <Text style={[styles.title, styles.whiteText]}>Filé de Frango</Text>
        <Text style={[styles.info, styles.whiteText]}>100g de filé de frango contêm aproximadamente:</Text>
        <Text style={[styles.protein, styles.whiteText]}>31g de proteína</Text>
        <Text style={[styles.info, styles.whiteText]}>250g de filé de frango contêm aproximadamente:</Text>
        <Text style={[styles.protein, styles.whiteText]}>77.5g de proteína</Text>
      </View>

      {/* Ovo */}
      <View style={[styles.itemContainer, { marginVertical: 30 }]}>
        <Icon name="cutlery" size={50} color="#007bff" />
        <Text style={[styles.title, styles.whiteText]}>Ovo</Text>
        <Text style={[styles.info, styles.whiteText]}>Por unidade:</Text>
        <Text style={[styles.protein, styles.whiteText]}>Com gema: 6g de proteína</Text>
        <Text style={[styles.protein, styles.whiteText]}>Sem gema: 3g de proteína</Text>
      </View>

      {/* Contrafilé */}
      <View style={[styles.itemContainer, { marginVertical: 30 }]}>
        <Icon name="cutlery" size={50} color="#007bff" />
        <Text style={[styles.title, styles.whiteText]}>Contrafilé</Text>
        <Text style={[styles.info, styles.whiteText]}>100g de contrafilé contêm aproximadamente:</Text>
        <Text style={[styles.protein, styles.whiteText]}>20g de proteína</Text>
        <Text style={[styles.info, styles.whiteText]}>250g de contrafilé contêm aproximadamente:</Text>
        <Text style={[styles.protein, styles.whiteText]}>50g de proteína</Text>
      </View>

      {/* Shake de Whey */}
      <View style={[styles.itemContainer, { marginVertical: 30 }]}>
        <Icon name="glass" size={50} color="#007bff" />
        <Text style={[styles.title, styles.whiteText]}>Shake de Whey</Text>
        <Text style={[styles.protein, styles.whiteText]}>30g de proteína por unidade</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  protein: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
  },
  whiteText: {
    color: '#fff',
  },
});

export default ConsultaScreen;
