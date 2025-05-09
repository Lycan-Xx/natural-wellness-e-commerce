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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import {
  ShoppingBag,
  ShoppingCart,
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
  UserRoundPen,
  PlaneIcon
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
import HeaderBar from '@/components/HeaderBar';

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

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showOrderStatusModal, setShowOrderStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const ordersByDate = [
    {
      date: 'March 12, 2023',
      orders: [
        {
          id: '434324MX',
          status: 'On Progress',
          shipment: 'Kencana Express',
          estimate: '20 Feb, 2023',
          address: 'Plum Street, San Francisco, California 93244',
          time: '13:20PM',
        },
        {
          id: '123456AB',
          status: 'Delivered',
          shipment: 'FedEx',
          estimate: '15 Feb, 2023',
          address: 'Maple Avenue, Los Angeles, California 90001',
          time: '10:00AM',
        },
        {
          id: '789012CD',
          status: 'Shipped',
          shipment: 'DHL',
          estimate: '18 Feb, 2023',
          address: 'Oak Street, New York, New York 10001',
          time: '14:45PM',
        },
        {
          id: '345678EF',
          status: 'In Transit',
          shipment: 'UPS',
          estimate: '22 Feb, 2023',
          address: 'Pine Road, Chicago, Illinois 60601',
          time: '16:30PM',
        },
        {
          id: '901234GH',
          status: 'Pending',
          shipment: 'USPS',
          estimate: '25 Feb, 2023',
          address: 'Cedar Lane, Houston, Texas 77001',
          time: '09:15AM',
        },
      ],
    },
  ];

  React.useEffect(() => {
    if (params.tracking) {
      setShowTrackingModal(true);
      // Optionally, you can select a specific order here using params.tracking
    }
  }, [params.tracking]);

  const handleEditProfile = () => {
    router.push('/profile/edit');
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

  const handleCloseTrackingModal = () => {
    setShowTrackingModal(false);
    // Remove the tracking param from the URL after closing
    router.setParams({ tracking: undefined });
  };

  return (
    <SafeAreaView style={styles.container}>
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
              onPress: () => router.push('/profile/orders'),
            },
            {
              icon: <PlaneIcon size={20} color={Colors.text.secondary} />,
              title: "Tracking",
              onPress: () => setShowTrackingModal(true),
            },
            {
              icon: <ShoppingCart size={20} color={Colors.text.secondary} />,
              title: "Cart",
              onPress: () => router.push('/cart'),
            },
          ]}
        />

        <SettingsSection
          title="Account Settings"
          items={[
            {
              icon: <MapPin size={20} color={Colors.text.secondary} />,
              title: "Address",
              onPress: () => router.push('/profile/address'),
            },
            {
              icon: <CreditCard size={20} color={Colors.text.secondary} />,
              title: "Payment Methods",
              onPress: () => router.push('/profile/payment'),
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
              onPress: () => router.push('/profile/language'),
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
      </ScrollView>

      <Modal
        visible={showTrackingModal}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseTrackingModal}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
          <HeaderBar
            title="My Orders"
            showBackButton
            onBackPress={handleCloseTrackingModal}
          />
          <ScrollView style={{ flex: 1 }}>
            {ordersByDate.map((group, idx) => (
              <View key={idx} style={styles.orderGroup}>
                <Text style={styles.orderGroupDate}>{group.date}</Text>
                {group.orders.map((order, oidx) => (
                  <TouchableOpacity
                    key={order.id}
                    style={styles.orderItem}
                    onPress={() => {
                      setSelectedOrder(order);
                      setShowOrderStatusModal(true);
                    }}
                  >
                    <View style={styles.orderItemLeft}>
                      <ShoppingBag size={24} color={Colors.primary} />
                      <View style={{ marginLeft: 12 }}>
                        <Text style={styles.orderId}>#{order.id}</Text>
                        <Text style={styles.orderStatus}>{order.status}</Text>
                      </View>
                    </View>
                    <ChevronRight size={20} color={Colors.text.secondary} />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={showOrderStatusModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowOrderStatusModal(false)}
      >
        <View style={styles.statusModalOverlay}>
          <View style={styles.statusModalContent}>
            <HeaderBar
              title="Tracking"
              showBackButton
              onBackPress={() => setShowOrderStatusModal(false)}
            />
            {selectedOrder && (
              <View style={styles.statusOrderBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <ShoppingBag size={24} color={Colors.primary} />
                  <Text style={[styles.orderId, { marginLeft: 8 }]}>{`#${selectedOrder.id}`}</Text>
                  <Text style={styles.statusProgress}>{selectedOrder.status}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                  <View>
                    <Text style={styles.statusLabel}>Estimate delivery</Text>
                    <Text style={styles.statusValue}>{selectedOrder.estimate}</Text>
                  </View>
                  <View>
                    <Text style={styles.statusLabel}>Shipment</Text>
                    <Text style={styles.statusValue}>{selectedOrder.shipment}</Text>
                  </View>
                </View>
              </View>
            )}
            <View style={styles.statusSteps}>
              <View style={styles.statusStepRow}>
                <View style={styles.statusStepIconBox}>
                  <ShoppingBag size={20} color={Colors.primary} />
                </View>
                <View style={styles.statusStepLine} />
                <View style={styles.statusStepIconBox}>
                  <PlaneIcon size={20} color={Colors.primary} />
                </View>
                <View style={styles.statusStepLine} />
                <View style={styles.statusStepIconBox}>
                  <ShoppingCart size={20} color={Colors.primary} />
                </View>
                <View style={styles.statusStepLine} />
                <View style={[styles.statusStepIconBox, { borderColor: Colors.border }]}>
                  <ShoppingBag size={20} color={Colors.border} />
                </View>
              </View>
              <View style={styles.statusStepLabels}>
                <Text style={styles.statusStepLabel}>Ordered</Text>
                <Text style={styles.statusStepLabel}>Shipped</Text>
                <Text style={styles.statusStepLabel}>In Transit</Text>
                <Text style={styles.statusStepLabel}>Delivered</Text>
              </View>
            </View>
            <View style={{ marginTop: 24 }}>
              <Text style={styles.timelineTitle}>Packet In Delivery</Text>
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <View key={idx} style={styles.timelineRow}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineStatus}>Order In Transit. March 12</Text>
                    <Text style={styles.timelineAddress}>{selectedOrder?.address}</Text>
                  </View>
                  <Text style={styles.timelineTime}>{selectedOrder?.time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
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
  phoneNumber: {
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
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'space-between',
  },
  trackingTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  orderGroup: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  orderGroupDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  orderItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderId: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: Colors.text.primary,
  },
  orderStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  statusModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  statusModalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 370,
    padding: 0,
    overflow: 'hidden',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  statusTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text.primary,
  },
  statusOrderBox: {
    padding: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statusProgress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.primary,
    marginLeft: 8,
    backgroundColor: Colors.primary + '11',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
  },
  statusValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.text.primary,
    marginTop: 2,
  },
  statusSteps: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  statusStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusStepIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  statusStepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.primary,
    marginHorizontal: 2,
  },
  statusStepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statusStepLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: Colors.text.secondary,
    width: 60,
    textAlign: 'center',
  },
  timelineTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.text.primary,
    marginBottom: 12,
    marginLeft: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.text.primary,
  },
  timelineAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  timelineTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 8,
    marginTop: 2,
  },
});