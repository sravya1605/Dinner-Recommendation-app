import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Clock, DollarSign, Star, Heart, Share2, Calendar, Users, Thermometer, Cloud } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const { width } = Dimensions.get('window');

interface DateDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  cost: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  tags: string[];
  highlights: string[];
  whatToExpect: string[];
  bestTime: string;
  difficulty: string;
  weatherDependent: boolean;
  bookingRequired: boolean;
  estimatedCost: string;
}

const mockDateDetails: { [key: string]: DateDetail } = {
  '1': {
    id: '1',
    title: 'Rooftop Stargazing Experience',
    description: 'Escape the city lights and discover the wonders of the night sky together. Our professional astronomy guide will help you navigate constellations while you enjoy champagne and artisanal chocolates under the stars.',
    category: 'Romantic',
    duration: '3 hours',
    cost: '$$$',
    location: 'Sky Deck Observatory',
    address: '1845 Observatory Dr, Hills View, CA 94102',
    rating: 4.9,
    reviews: 127,
    tags: ['Evening', 'Intimate', 'Unique', 'Educational'],
    highlights: [
      'Professional telescope and guidance',
      'Complimentary champagne service',
      'Gourmet chocolate pairing',
      'Take-home star maps',
      'Perfect for proposals'
    ],
    whatToExpect: [
      'Brief introduction to astronomy basics',
      'Guided observation of planets and constellations',
      'Photography assistance for memorable captures',
      'Cozy blankets and seating provided',
      'Weather backup plan available'
    ],
    bestTime: 'Clear evening skies, new moon phases preferred',
    difficulty: 'Easy - suitable for all ages',
    weatherDependent: true,
    bookingRequired: true,
    estimatedCost: '$120-150 per couple'
  }
};

export default function DateDetailsScreen() {
  const router = useRouter();
  const { dateId } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const dateDetail = mockDateDetails[dateId as string] || mockDateDetails['1'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        color="#F59E0B"
        fill={index < rating ? "#F59E0B" : "none"}
      />
    ));
  };

  const handleBooking = () => {
    // Implement booking logic
    console.log('Booking:', dateDetail.title);
  };

  const handleAddToCalendar = () => {
    // Implement calendar integration
    console.log('Add to calendar:', dateDetail.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Date Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              size={24}
              color={isFavorite ? '#EC4899' : '#6B7280'}
              fill={isFavorite ? '#EC4899' : 'none'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Share2 size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroSection}>
          <LinearGradient
            colors={['#6B46C1', '#8B5CF6', '#EC4899']}
            style={styles.heroGradient}
          >
            <Text style={styles.heroEmoji}>🌟</Text>
          </LinearGradient>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{dateDetail.category}</Text>
          </View>
        </View>

        {/* Title & Rating */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{dateDetail.title}</Text>
          <View style={styles.ratingRow}>
            <View style={styles.starsContainer}>
              {renderStars(dateDetail.rating)}
            </View>
            <Text style={styles.ratingText}>{dateDetail.rating}</Text>
            <Text style={styles.reviewsText}>({dateDetail.reviews} reviews)</Text>
          </View>
        </View>

        {/* Key Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <MapPin size={18} color="#6B46C1" />
              <Text style={styles.infoText}>{dateDetail.location}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={18} color="#6B46C1" />
              <Text style={styles.infoText}>{dateDetail.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <DollarSign size={18} color="#6B46C1" />
              <Text style={styles.infoText}>{dateDetail.estimatedCost}</Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={18} color="#6B46C1" />
              <Text style={styles.infoText}>{dateDetail.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Experience</Text>
          <Text style={styles.description}>{dateDetail.description}</Text>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <View style={styles.tagContainer}>
            {dateDetail.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {dateDetail.highlights.map((highlight, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listBullet}>✓</Text>
              <Text style={styles.listText}>{highlight}</Text>
            </View>
          ))}
        </View>

        {/* What to Expect */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What to Expect</Text>
          {dateDetail.whatToExpected.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listNumber}>{index + 1}</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Important Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Good to Know</Text>
          <View style={styles.importantInfo}>
            <View style={styles.infoRow}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Best Time:</Text>
              <Text style={styles.infoValue}>{dateDetail.bestTime}</Text>
            </View>
            {dateDetail.weatherDependent && (
              <View style={styles.infoRow}>
                <Cloud size={16} color="#6B7280" />
                <Text style={styles.infoLabel}>Weather:</Text>
                <Text style={styles.infoValue}>Dependent on conditions</Text>
              </View>
            )}
            {dateDetail.bookingRequired && (
              <View style={styles.infoRow}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.infoLabel}>Booking:</Text>
                <Text style={styles.infoValue}>Advance reservation required</Text>
              </View>
            )}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.locationCard}>
            <MapPin size={20} color="#6B46C1" />
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{dateDetail.location}</Text>
              <Text style={styles.locationAddress}>{dateDetail.address}</Text>
            </View>
            <TouchableOpacity style={styles.directionsButton}>
              <Text style={styles.directionsText}>Directions</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.calendarButton} onPress={handleAddToCalendar}>
          <Calendar size={20} color="#6B46C1" />
          <Text style={styles.calendarButtonText}>Add to Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book This Date</Text>
        </TouchableOpacity>
      </View>
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  favoriteButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 240,
    backgroundColor: '#F3F4F6',
  },
  heroGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 64,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6B46C1',
  },
  titleSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Playfair-Bold',
    fontSize: 28,
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 36,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  reviewsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: (width - 60) / 2,
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B46C1',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  listBullet: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#10B981',
    width: 16,
  },
  listNumber: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B46C1',
    backgroundColor: '#EEF2FF',
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    borderRadius: 12,
  },
  listText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  importantInfo: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    minWidth: 80,
  },
  infoValue: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1F2937',
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  locationAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  directionsButton: {
    backgroundColor: '#6B46C1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  directionsText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  calendarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  calendarButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B46C1',
  },
  bookButton: {
    flex: 2,
    backgroundColor: '#6B46C1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});