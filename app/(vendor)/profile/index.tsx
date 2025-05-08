import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import {
  ShoppingBag,
  MapPin,
  CreditCard,
  Moon,
  LogOut,
  Globe,
  Bell,
  Shield,
  HelpCircle,
  Headphones,
  ChevronRight,
  X,
  UserRoundPen
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import EditProfileScreen from './edit';
import AddressScreen from './address';
import LanguageScreen from './language';
import PaymentMethodsScreen from './payment';

interface SettingsSectionProps {
  title: string;
  items: Array<{
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
    rightElement?: React.ReactNode;
  }>;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, items }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.settingsRow}
        onPress={item.onPress}
      >
        <View style={styles.settingsRowLeft}>
          {item.icon}
          <Text style={styles.settingsRowText}>{item.title}</Text>
        </View>
        {item.rightElement || <ChevronRight size={20} color={Colors.text.secondary} />}
      </TouchableOpacity>
    ))}
  </View>
);

interface VendorProfileScreenProps {
  onClose?: () => void;
}

export default function VendorProfileScreen({ onClose }: VendorProfileScreenProps) {
  const router = useRouter();
  const { signOut, user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    signOut();
    setShowLogoutModal(false);
    router.replace('/(auth)/welcome');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWithClose}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color={Colors.text.secondary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.username}>{user?.fullName}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleEditProfile}>
            <UserRoundPen size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <SettingsSection
          title="General"
          items={[
            {
              icon: <ShoppingBag size={20} color={Colors.text.secondary} />,
              title: "My Orders",
              onPress: () => {},
            },
          ]}
        />

        <SettingsSection
          title="Account Settings"
          items={[
            {
              icon: <MapPin size={20} color={Colors.text.secondary} />,
              title: "Vendor Address",
              onPress: () => setShowAddressModal(true),
            },
            {
              icon: <CreditCard size={20} color={Colors.text.secondary} />,
              title: "Withdrawal options",
              onPress: () => setShowPaymentModal(true),
            },
            {
              icon: <Moon size={20} color={Colors.text.secondary} />,
              title: "Dark Mode",
              onPress: () => {},
              rightElement: (
                <Switch
                  value={isDarkMode}
                  onValueChange={setIsDarkMode}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              ),
            },
            {
              icon: <LogOut size={20} color={Colors.error} />,
              title: "Log Out",
              onPress: handleLogoutPress,
            },
          ]}
        />

        <SettingsSection
          title="App Settings"
          items={[
            {
              icon: <Globe size={20} color={Colors.text.secondary} />,
              title: "Language",
              onPress: () => setShowLanguageModal(true),
            },
            {
              icon: <Bell size={20} color={Colors.text.secondary} />,
              title: "Notifications",
              onPress: () => {},
            },
            {
              icon: <Shield size={20} color={Colors.text.secondary} />,
              title: "Security",
              onPress: () => {},
            },
          ]}
        />

        <SettingsSection
          title="Support"
          items={[
            {
              icon: <HelpCircle size={20} color={Colors.text.secondary} />,
              title: "Help Center",
              onPress: () => {},
            },
            {
              icon: <Headphones size={20} color={Colors.text.secondary} />,
              title: "Contact Us",
              onPress: () => {},
            },
          ]}
        />

        {/* Edit Profile Modal */}
        <Modal
          visible={showEditModal}
          animationType="slide"
          onRequestClose={() => setShowEditModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <EditProfileScreen 
              onClose={() => setShowEditModal(false)} 
              userData={user}
            />
          </SafeAreaView>
        </Modal>

        {/* Address Modal */}
        <Modal
          visible={showAddressModal}
          animationType="slide"
          onRequestClose={() => setShowAddressModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <AddressScreen onClose={() => setShowAddressModal(false)} />
          </SafeAreaView>
        </Modal>

        {/* Language Modal */}
        <Modal
          visible={showLanguageModal}
          animationType="slide"
          onRequestClose={() => setShowLanguageModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <LanguageScreen onClose={() => setShowLanguageModal(false)} />
          </SafeAreaView>
        </Modal>

        {/* Payment Modal */}
        <Modal
          visible={showPaymentModal}
          animationType="slide"
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <PaymentMethodsScreen onClose={() => setShowPaymentModal(false)} />
          </SafeAreaView>
        </Modal>

        <Modal
          visible={showLogoutModal}
          transparent
          animationType="fade"
          onRequestClose={handleCancelLogout}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Log Out</Text>
              <Text style={styles.modalText}>Are you sure you want to log out?</Text>
              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  onPress={handleCancelLogout}
                  variant="outline"
                  style={styles.modalButton}
                />
                <Button
                  title="Log Out"
                  onPress={handleLogout}
                  style={[styles.modalButton, styles.logoutButton]}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.white,
  },
  headerWithClose: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileText: {
    marginLeft: 16,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 12,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsRowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: Colors.error,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});