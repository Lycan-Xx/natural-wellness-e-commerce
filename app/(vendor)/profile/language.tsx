import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import HeaderBar from '@/components/HeaderBar';

const languages = [
  { id: 'en-us', name: 'English(US)', flag: 'https://flagcdn.com/w40/us.png' },
  { id: 'en-uk', name: 'English(UK)', flag: 'https://flagcdn.com/w40/gb.png' },
  { id: 'ar', name: 'Arabic', flag: 'https://flagcdn.com/w40/sa.png' },
  { id: 'zh', name: 'Chinese', flag: 'https://flagcdn.com/w40/cn.png' },
];

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-us');

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Language" />
      
      <View style={styles.content}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={styles.languageItem}
            onPress={() => setSelectedLanguage(language.id)}
          >
            <View style={styles.languageInfo}>
              <Image
                source={{ uri: language.flag }}
                style={styles.flag}
              />
              <Text style={styles.languageName}>{language.name}</Text>
            </View>
            
            {selectedLanguage === language.id && (
              <Check size={24} color={Colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 12,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  languageName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.primary,
  },
});