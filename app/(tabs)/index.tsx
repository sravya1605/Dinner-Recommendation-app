import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, MapPin, Clock, DollarSign, Settings, Shuffle, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

const { width } = Dimensions.get('window');

interface DateSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  cost: string;
  location: string;
  image: string;
  rating: number;
}

const mockSuggestions: DateSuggestion[] = [
  {
    id: '1',
    title: 'Sunset Picnic at Riverside Park',
    description: 'Pack a basket with your favorite treats and watch the sunset together by the water.',
    category: 'Outdoor',
    duration: '2-3 hours',
    cost: '$',
    location: 'Riverside Park',
    image: 'https://images.pexels.com/photos/1021103/pexels-photo-1021103.jpeg',
    rating: 4.8
  },
  {
    id: '2',
    title: 'Wine Tasting & Art Gallery',
    description: 'Explore local art while sipping on carefully curated wines at this intimate venue.',
    category: 'Cultural',
    duration: '3-4 hours',
    cost: '$$$',
    location: 'Downtown Arts District',
    image: 'https://images.pexels.com/photos/1375849/pexels-photo-1375849.jpeg',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Cooking Class: Italian Cuisine',
    description: 'Learn to make pasta from scratch together in this hands-on culinary experience.',
    category: 'Creative',
    duration: '2.5 hours',
    cost: '$$',
    location: 'Culinary Institute',
    image: 'https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg',
    rating: 4.7
  }
];

export default function HomeScreen() {
  const router = useRouter();
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const getGreeting = () => {
    const greetings = {
      morning: 'Good morning, lovebirds! ☀️',
      afternoon: 'Good afternoon! 💕',
      evening: 'Good evening! 🌙'
    };
    return greetings[timeOfDay as keyof typeof greetings] || 'Hello there! 💕';
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * mockSuggestions.length);
    setCurrentSuggestion(randomIndex);
  };

  const handleDateDetails = (suggestion: DateSuggestion) => {
    router.push({
      pathname: '/date-details',
      params: { dateId: suggestion.id }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#6B46C1', '#8B5CF6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Heart size={28} color="#FFFFFF" fill="#FFFFFF" />
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoText}>Boring</Text>
              <Text style={styles.logoSubtext}>Date</Text>
            </View>
          </View>
          
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>Ready for your next adventure together?</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/preferences')}
          >
            <Settings size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.quickActionSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton} onPress={handleSurpriseMe}>
              <LinearGradient
                colors={['#F97316', '#FB923C']}
                style={styles.quickActionGradient}
              >
                <Shuffle size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Surprise Me!</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => router.push('/discover')}
            >
              <LinearGradient
                colors={['#EC4899', '#F472B6']}
                style={styles.quickActionGradient}
              >
                <Sparkles size={24} color="#FFFFFF" />
                <Text style={styles.quickActionText}>Browse Ideas</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.suggestionSection}>
          <Text style={styles.sectionTitle}>Perfect for You</Text>
          <View style={styles.suggestionCard}>
            <View style={styles.suggestionImage}>
              <Text style={styles.imageText}>📸</Text>
            </View>
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>
                {mockSuggestions[currentSuggestion].title}
              </Text>
              <Text style={styles.suggestionDescription}>
                {mockSuggestions[currentSuggestion].description}
              </Text>
              <View style={styles.suggestionMeta}>
                <View style={styles.metaItem}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.metaText}>
                    {mockSuggestions[currentSuggestion].location}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.metaText}>
                    {mockSuggestions[currentSuggestion].duration}
                  </Text>
                </View>
                <View style={styles.metaItem}>
                  <DollarSign size={16} color="#6B7280" />
                  <Text style={styles.metaText}>
                    {mockSuggestions[currentSuggestion].cost}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                onPress={() => handleDateDetails(mockSuggestions[currentSuggestion])}
              >
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Suggestions</Text>
          {mockSuggestions.slice(0, 3).map((suggestion, index) => (
            <TouchableOpacity
              key={suggestion.id}
              style={styles.recentItem}
              onPress={() => handleDateDetails(suggestion)}
            >
              <View style={styles.recentImage}>
                <Text style={styles.recentImageText}>🎯</Text>
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle}>{suggestion.title}</Text>
                <Text style={styles.recentCategory}>{suggestion.category}</Text>
                <Text style={styles.recentMeta}>
                  {suggestion.duration} • {suggestion.cost}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoTextContainer: {
    alignItems: 'flex-start',
  },
  logoText: {
    fontFamily: 'Playfair-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  logoSubtext: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#E5E7EB',
    letterSpacing: 2,
    marginTop: -4,
  },
  greeting: {
    fontFamily: 'Playfair-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  quickActionSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  quickActionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  suggestionSection: {
    marginBottom: 32,
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  suggestionImage: {
    height: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  imageText: {
    fontSize: 48,
  },
  suggestionContent: {
    gap: 12,
  },
  suggestionTitle: {
    fontFamily: 'Playfair-Bold',
    fontSize: 22,
    color: '#1F2937',
  },
  suggestionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  suggestionMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  viewDetailsButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  viewDetailsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  recentSection: {
    marginBottom: 32,
  },
  recentItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  recentImage: {
    width: 60,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recentImageText: {
    fontSize: 24,
  },
  recentContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  recentTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  recentCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B46C1',
  },
  recentMeta: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomPadding: {
    height: 32,
  },
});