import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Slider } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, MapPin, DollarSign, Clock, Activity, Thermometer } from 'lucide-react-native';

interface PreferenceState {
  budgetRange: [number, number];
  timePreference: string;
  activityLevel: string;
  environment: string[];
  categories: string[];
  distance: number;
}

const budgetLabels = ['$', '$$', '$$$', '$$$$'];
const timeOptions = ['2 hours', '2-4 hours', '4-6 hours', 'Full day', 'Weekend'];
const activityLevels = ['Relaxed', 'Moderate', 'Active', 'Adventurous'];
const environments = ['Indoor', 'Outdoor', 'Mixed'];
const categories = [
  'Romantic', 'Adventure', 'Cultural', 'Food & Drink', 
  'Creative', 'Entertainment', 'Outdoor', 'Wellness'
];

export default function PreferencesScreen() {
  const router = useRouter();
  const [preferences, setPreferences] = useState<PreferenceState>({
    budgetRange: [1, 3],
    timePreference: '2-4 hours',
    activityLevel: 'Moderate',
    environment: ['Mixed'],
    categories: ['Romantic', 'Adventure'],
    distance: 15
  });

  const handleBudgetChange = (values: number[]) => {
    setPreferences(prev => ({ ...prev, budgetRange: [values[0], values[1]] }));
  };

  const handleTimePreference = (time: string) => {
    setPreferences(prev => ({ ...prev, timePreference: time }));
  };

  const handleActivityLevel = (level: string) => {
    setPreferences(prev => ({ ...prev, activityLevel: level }));
  };

  const handleEnvironmentToggle = (env: string) => {
    setPreferences(prev => ({
      ...prev,
      environment: prev.environment.includes(env)
        ? prev.environment.filter(e => e !== env)
        : [...prev.environment, env]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSave = () => {
    // Save preferences logic
    console.log('Saving preferences:', preferences);
    router.back();
  };

  const getBudgetDisplay = () => {
    const [min, max] = preferences.budgetRange;
    return min === max 
      ? budgetLabels[min]
      : `${budgetLabels[min]} - ${budgetLabels[max]}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Budget Range */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={20} color="#6B46C1" />
            <Text style={styles.sectionTitle}>Budget Range</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            How much are you comfortable spending per date?
          </Text>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetDisplay}>{getBudgetDisplay()}</Text>
            <View style={styles.budgetSlider}>
              {/* Note: React Native doesn't have a built-in range slider, 
                  so we'll simulate with buttons for this demo */}
              <View style={styles.budgetOptions}>
                {budgetLabels.map((label, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.budgetOption,
                      index >= preferences.budgetRange[0] && index <= preferences.budgetRange[1] && styles.budgetOptionActive
                    ]}
                    onPress={() => {
                      if (preferences.budgetRange[0] === index && preferences.budgetRange[1] === index) {
                        // If clicking on a single selected item, expand range
                        setPreferences(prev => ({ ...prev, budgetRange: [0, index] }));
                      } else {
                        setPreferences(prev => ({ ...prev, budgetRange: [index, index] }));
                      }
                    }}
                  >
                    <Text style={[
                      styles.budgetOptionText,
                      index >= preferences.budgetRange[0] && index <= preferences.budgetRange[1] && styles.budgetOptionTextActive
                    ]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Time Preference */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color="#6B46C1" />
            <Text style={styles.sectionTitle}>Time Preference</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            How long do you typically want your dates to last?
          </Text>
          <View style={styles.optionsGrid}>
            {timeOptions.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.optionButton,
                  preferences.timePreference === time && styles.optionButtonActive
                ]}
                onPress={() => handleTimePreference(time)}
              >
                <Text style={[
                  styles.optionButtonText,
                  preferences.timePreference === time && styles.optionButtonTextActive
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Activity Level */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={20} color="#6B46C1" />
            <Text style={styles.sectionTitle}>Activity Level</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            What's your preferred energy level for activities?
          </Text>
          <View style={styles.optionsGrid}>
            {activityLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  preferences.activityLevel === level && styles.optionButtonActive
                ]}
                onPress={() => handleActivityLevel(level)}
              >
                <Text style={[
                  styles.optionButtonText,
                  preferences.activityLevel === level && styles.optionButtonTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Environment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Thermometer size={20} color="#6B46C1" />
            <Text style={styles.sectionTitle}>Environment</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Do you prefer indoor, outdoor, or mixed activities?
          </Text>
          <View style={styles.optionsGrid}>
            {environments.map((env) => (
              <TouchableOpacity
                key={env}
                style={[
                  styles.optionButton,
                  preferences.environment.includes(env) && styles.optionButtonActive
                ]}
                onPress={() => handleEnvironmentToggle(env)}
              >
                <Text style={[
                  styles.optionButtonText,
                  preferences.environment.includes(env) && styles.optionButtonTextActive
                ]}>
                  {env}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎯</Text>
            <Text style={styles.sectionTitle}>Favorite Categories</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Select all the types of activities you enjoy
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  preferences.categories.includes(category) && styles.categoryButtonActive
                ]}
                onPress={() => handleCategoryToggle(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  preferences.categories.includes(category) && styles.categoryButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Distance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#6B46C1" />
            <Text style={styles.sectionTitle}>Distance</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            How far are you willing to travel for a date?
          </Text>
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceValue}>{preferences.distance} miles</Text>
            <View style={styles.distanceSlider}>
              <Text style={styles.distanceLabel}>5 mi</Text>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderThumb, { left: `${(preferences.distance - 5) / 45 * 100}%` }]} />
              </View>
              <Text style={styles.distanceLabel}>50 mi</Text>
            </View>
          </View>
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
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#6B46C1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  budgetContainer: {
    alignItems: 'center',
  },
  budgetDisplay: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#6B46C1',
    marginBottom: 16,
  },
  budgetSlider: {
    width: '100%',
  },
  budgetOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  budgetOption: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  budgetOptionActive: {
    backgroundColor: '#6B46C1',
  },
  budgetOptionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  budgetOptionTextActive: {
    color: '#FFFFFF',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 8,
  },
  optionButtonActive: {
    backgroundColor: '#6B46C1',
  },
  optionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#6B46C1',
  },
  categoryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  distanceContainer: {
    alignItems: 'center',
  },
  distanceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#6B46C1',
    marginBottom: 16,
  },
  distanceSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  distanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    backgroundColor: '#6B46C1',
    borderRadius: 8,
    marginLeft: -8,
  },
  bottomPadding: {
    height: 32,
  },
});