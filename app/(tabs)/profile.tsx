import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { User, Users, Settings, MapPin, DollarSign, Clock, Heart, Bell, Share2, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const coupleData = {
    names: 'Alex & Jordan',
    together: '2 years, 8 months',
    totalDates: 23,
    favoriteCategory: 'Outdoor Adventures',
    location: 'San Francisco, CA'
  };

  const preferences = {
    budget: '$$ - $$$',
    duration: '2-4 hours preferred',
    style: 'Mix of adventure & relaxation',
    location: '15 mile radius'
  };

  const handleEditProfile = () => {
    router.push('/preferences');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Couple Info Card */}
        <View style={styles.coupleCard}>
          <View style={styles.coupleAvatar}>
            <Users size={32} color="#6B46C1" />
          </View>
          <View style={styles.coupleInfo}>
            <Text style={styles.coupleNames}>{coupleData.names}</Text>
            <Text style={styles.coupleTogether}>Together for {coupleData.together}</Text>
            <View style={styles.coupleStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{coupleData.totalDates}</Text>
                <Text style={styles.statLabel}>Dates</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Avg Rating</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Current Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Preferences</Text>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIcon}>
                <DollarSign size={18} color="#6B46C1" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Budget Range</Text>
                <Text style={styles.preferenceValue}>{preferences.budget}</Text>
              </View>
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIcon}>
                <Clock size={18} color="#6B46C1" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Duration</Text>
                <Text style={styles.preferenceValue}>{preferences.duration}</Text>
              </View>
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIcon}>
                <Heart size={18} color="#6B46C1" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Style</Text>
                <Text style={styles.preferenceValue}>{preferences.style}</Text>
              </View>
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIcon}>
                <MapPin size={18} color="#6B46C1" />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Location</Text>
                <Text style={styles.preferenceValue}>{preferences.location}</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>Edit Preferences</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Bell size={20} color="#1F2937" />
                <Text style={styles.settingLabel}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#F3F4F6', true: '#6B46C1' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <MapPin size={20} color="#1F2937" />
                <Text style={styles.settingLabel}>Location Services</Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#F3F4F6', true: '#6B46C1' }}
                thumbColor={locationEnabled ? '#FFFFFF' : '#9CA3AF'}
              />
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <Share2 size={20} color="#1F2937" />
              <Text style={styles.menuLabel}>Share App</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <HelpCircle size={20} color="#1F2937" />
              <Text style={styles.menuLabel}>Help & Support</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <User size={20} color="#1F2937" />
              <Text style={styles.menuLabel}>Account Settings</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
              <LogOut size={20} color="#DC2626" />
              <Text style={[styles.menuLabel, styles.logoutLabel]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>DateNight v1.0.0</Text>
          <Text style={styles.appDescription}>
            Bringing couples closer through shared experiences
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  coupleCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  coupleAvatar: {
    width: 80,
    height: 80,
    backgroundColor: '#EEF2FF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  coupleInfo: {
    alignItems: 'center',
  },
  coupleNames: {
    fontFamily: 'Playfair-Bold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  coupleTogether: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  coupleStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#6B46C1',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E5E7EB',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  preferencesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  preferenceIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#EEF2FF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  preferenceValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  editButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  editButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  menuLabel: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1F2937',
  },
  menuChevron: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#9CA3AF',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  logoutItem: {
    marginTop: 4,
  },
  logoutLabel: {
    color: '#DC2626',
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 32,
  },
  appVersion: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  appDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 32,
  },
});