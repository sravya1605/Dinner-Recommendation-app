import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Calendar, Heart, Star, MapPin, Clock, Camera, Share2 } from 'lucide-react-native';

interface DateEntry {
  id: string;
  title: string;
  date: string;
  location: string;
  rating: number;
  photos: number;
  notes: string;
  category: string;
  cost: string;
  duration: string;
  favorite: boolean;
}

const completedDates: DateEntry[] = [
  {
    id: '1',
    title: 'Wine Tasting at Sunset Vineyard',
    date: '2024-12-20',
    location: 'Napa Valley',
    rating: 5,
    photos: 12,
    notes: 'Amazing experience! The sunset view was breathtaking and we loved the Pinot Noir.',
    category: 'Food & Drink',
    cost: '$$$',
    duration: '4 hours',
    favorite: true
  },
  {
    id: '2',
    title: 'Couples Cooking Class',
    date: '2024-12-15',
    location: 'Culinary Institute',
    rating: 4,
    photos: 8,
    notes: 'Fun but challenging! We made pasta from scratch. Definitely want to try again.',
    category: 'Creative',
    cost: '$$',
    duration: '3 hours',
    favorite: false
  },
  {
    id: '3',
    title: 'Beach Picnic & Stargazing',
    date: '2024-12-10',
    location: 'Moonlight Beach',
    rating: 5,
    photos: 15,
    notes: 'Perfect weather, saw shooting stars! Brought our own telescope.',
    category: 'Outdoor',
    cost: '$',
    duration: '5 hours',
    favorite: true
  },
  {
    id: '4',
    title: 'Art Gallery & Jazz Club',
    date: '2024-12-05',
    location: 'Downtown Arts District',
    rating: 4,
    photos: 6,
    notes: 'Interesting modern art exhibit. Jazz club was intimate and romantic.',
    category: 'Cultural',
    cost: '$$$',
    duration: '6 hours',
    favorite: false
  },
  {
    id: '5',
    title: 'Hot Air Balloon Adventure',
    date: '2024-12-01',
    location: 'Valley Vista',
    rating: 5,
    photos: 24,
    notes: 'Once in a lifetime experience! Absolutely magical floating above the clouds.',
    category: 'Adventure',
    cost: '$$$$',
    duration: '4 hours',
    favorite: true
  }
];

const upcomingDates = [
  {
    id: '6',
    title: 'Private Movie Theater',
    date: '2024-12-28',
    location: 'Luxury Cinemas',
    category: 'Entertainment'
  },
  {
    id: '7',
    title: 'Pottery Workshop',
    date: '2025-01-03',
    location: 'Clay Studio',
    category: 'Creative'
  }
];

export default function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<'completed' | 'upcoming'>('completed');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

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

  const getStats = () => {
    const totalDates = completedDates.length;
    const averageRating = completedDates.reduce((sum, date) => sum + date.rating, 0) / totalDates;
    const totalPhotos = completedDates.reduce((sum, date) => sum + date.photos, 0);
    const favoriteCount = completedDates.filter(date => date.favorite).length;

    return { totalDates, averageRating, totalPhotos, favoriteCount };
  };

  const stats = getStats();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Date History</Text>
        <Text style={styles.headerSubtitle}>Your journey together</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalDates}</Text>
              <Text style={styles.statLabel}>Dates</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.averageRating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalPhotos}</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.favoriteCount}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabSection}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
                Completed ({completedDates.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
                Upcoming ({upcomingDates.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'completed' ? (
          <View style={styles.datesSection}>
            {completedDates.map((date) => (
              <View key={date.id} style={styles.dateCard}>
                {/* Header */}
                <View style={styles.dateHeader}>
                  <View style={styles.dateInfo}>
                    <Text style={styles.dateTitle}>{date.title}</Text>
                    <View style={styles.dateMetaRow}>
                      <Calendar size={14} color="#6B7280" />
                      <Text style={styles.dateMetaText}>{formatDate(date.date)}</Text>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={styles.dateMetaText}>{date.location}</Text>
                    </View>
                  </View>
                  {date.favorite && (
                    <Heart size={20} color="#EC4899" fill="#EC4899" />
                  )}
                </View>

                {/* Rating */}
                <View style={styles.ratingRow}>
                  <View style={styles.starsContainer}>
                    {renderStars(date.rating)}
                  </View>
                  <Text style={styles.ratingText}>({date.rating}/5)</Text>
                </View>

                {/* Notes */}
                <Text style={styles.dateNotes}>{date.notes}</Text>

                {/* Footer */}
                <View style={styles.dateFooter}>
                  <View style={styles.dateStats}>
                    <View style={styles.dateStat}>
                      <Camera size={14} color="#6B7280" />
                      <Text style={styles.dateStatText}>{date.photos} photos</Text>
                    </View>
                    <View style={styles.dateStat}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.dateStatText}>{date.duration}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.shareButton}>
                    <Share2 size={16} color="#6B46C1" />
                    <Text style={styles.shareText}>Share</Text>
                  </TouchableOpacity>
                </View>

                {/* Category badge */}
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{date.category}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.datesSection}>
            {upcomingDates.map((date) => (
              <View key={date.id} style={styles.upcomingCard}>
                <View style={styles.upcomingHeader}>
                  <View style={styles.upcomingDate}>
                    <Text style={styles.upcomingDay}>
                      {new Date(date.date).getDate()}
                    </Text>
                    <Text style={styles.upcomingMonth}>
                      {new Date(date.date).toLocaleDateString('en-US', { month: 'short' })}
                    </Text>
                  </View>
                  <View style={styles.upcomingInfo}>
                    <Text style={styles.upcomingTitle}>{date.title}</Text>
                    <View style={styles.upcomingMeta}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={styles.upcomingMetaText}>{date.location}</Text>
                    </View>
                    <View style={styles.upcomingCategoryBadge}>
                      <Text style={styles.upcomingCategoryText}>{date.category}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            
            {upcomingDates.length === 0 && (
              <View style={styles.emptyState}>
                <Calendar size={64} color="#D1D5DB" />
                <Text style={styles.emptyTitle}>No upcoming dates</Text>
                <Text style={styles.emptySubtitle}>
                  Plan your next adventure together!
                </Text>
              </View>
            )}
          </View>
        )}

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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#6B46C1',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  tabSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#1F2937',
  },
  datesSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateInfo: {
    flex: 1,
  },
  dateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 6,
  },
  dateMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
  },
  dateNotes: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 16,
  },
  dateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateStats: {
    flexDirection: 'row',
    gap: 16,
  },
  dateStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateStatText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
  },
  shareText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B46C1',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#6B46C1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  upcomingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  upcomingDate: {
    backgroundColor: '#6B46C1',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  upcomingDay: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  upcomingMonth: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#E5E7EB',
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 6,
  },
  upcomingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  upcomingMetaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  upcomingCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  upcomingCategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 32,
  },
});