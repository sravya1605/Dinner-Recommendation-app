import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Heart, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AIDateGenerator from '@/components/AIDateGenerator';

interface DateCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  cost: string;
  location: string;
  rating: number;
  reviews: number;
  tags: string[];
}

const categories: DateCategory[] = [
  { id: '1', name: 'Romantic', icon: '💕', count: 24 },
  { id: '2', name: 'Adventure', icon: '🎯', count: 18 },
  { id: '3', name: 'Cultural', icon: '🎨', count: 15 },
  { id: '4', name: 'Outdoor', icon: '🌳', count: 21 },
  { id: '5', name: 'Food & Drink', icon: '🍷', count: 19 },
  { id: '6', name: 'Creative', icon: '🎭', count: 12 },
];

const dateIdeas: DateIdea[] = [
  {
    id: '1',
    title: 'Rooftop Stargazing Experience',
    description: 'Professional telescope setup with champagne service under the stars.',
    category: 'Romantic',
    duration: '3 hours',
    cost: '$$$',
    location: 'Sky Deck Observatory',
    rating: 4.9,
    reviews: 127,
    tags: ['Evening', 'Intimate', 'Unique']
  },
  {
    id: '2',
    title: 'Couples Pottery Workshop',
    description: 'Create beautiful ceramic pieces together in this hands-on experience.',
    category: 'Creative',
    duration: '2.5 hours',
    cost: '$$',
    location: 'Artisan Studio',
    rating: 4.7,
    reviews: 89,
    tags: ['Indoor', 'Crafts', 'Take Home']
  },
  {
    id: '3',
    title: 'Hot Air Balloon Ride',
    description: 'Soar above the countryside with breathtaking views and photo opportunities.',
    category: 'Adventure',
    duration: '4 hours',
    cost: '$$$$',
    location: 'Valley Balloons',
    rating: 4.8,
    reviews: 156,
    tags: ['Morning', 'Scenic', 'Memorable']
  },
  {
    id: '4',
    title: 'Private Chef Dinner',
    description: 'Enjoy a personalized 5-course meal prepared in your own space.',
    category: 'Food & Drink',
    duration: '3.5 hours',
    cost: '$$$$',
    location: 'Your Location',
    rating: 4.9,
    reviews: 203,
    tags: ['Intimate', 'Luxury', 'Private']
  },
  {
    id: '5',
    title: 'Hiking & Waterfall Picnic',
    description: 'Moderate hike to hidden waterfall with gourmet picnic basket.',
    category: 'Outdoor',
    duration: '5 hours',
    cost: '$$',
    location: 'Forest Trail #3',
    rating: 4.6,
    reviews: 94,
    tags: ['Active', 'Nature', 'Adventure']
  },
  {
    id: '6',
    title: 'Jazz Club & Cocktails',
    description: 'Intimate jazz performance with craft cocktails and small plates.',
    category: 'Cultural',
    duration: '3 hours',
    cost: '$$$',
    location: 'Blue Note Lounge',
    rating: 4.8,
    reviews: 167,
    tags: ['Evening', 'Music', 'Classy']
  }
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredIdeas = dateIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || idea.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDateDetails = (idea: DateIdea) => {
    router.push({
      pathname: '/date-details',
      params: { dateId: idea.id }
    });
  };

  const handleAIDateGenerated = (dateIdea: string) => {
    // You could add the AI-generated date to your list or show it in a modal
    console.log('AI Generated Date:', dateIdea);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>Find your perfect date experience</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* AI Date Generator */}
        {showAIGenerator ? (
          <View>
            <AIDateGenerator onDateGenerated={handleAIDateGenerated} />
            <TouchableOpacity
              style={styles.toggleAIButton}
              onPress={() => setShowAIGenerator(false)}
            >
              <Text style={styles.toggleAIButtonText}>Show Browse Mode</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Search Bar */}
            <View style={styles.searchSection}>
              <View style={styles.searchContainer}>
                <Search size={20} color="#9CA3AF" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search date ideas..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={20} color="#6B46C1" />
              </TouchableOpacity>
            </View>

            {/* AI Generator Toggle */}
            <View style={styles.aiToggleSection}>
              <TouchableOpacity
                style={styles.aiToggleButton}
                onPress={() => setShowAIGenerator(true)}
              >
                <Text style={styles.aiToggleButtonText}>✨ Try AI Date Generator</Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      selectedCategory === category.name && styles.categoryItemActive
                    ]}
                    onPress={() => setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    )}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={[
                      styles.categoryName,
                      selectedCategory === category.name && styles.categoryNameActive
                    ]}>
                      {category.name}
                    </Text>
                    <Text style={[
                      styles.categoryCount,
                      selectedCategory === category.name && styles.categoryCountActive
                    ]}>
                      {category.count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Results */}
            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>
                {selectedCategory ? `${selectedCategory} Ideas` : 'All Ideas'} ({filteredIdeas.length})
              </Text>
              
              {filteredIdeas.map((idea) => (
                <TouchableOpacity
                  key={idea.id}
                  style={styles.ideaCard}
                  onPress={() => handleDateDetails(idea)}
                >
                  <View style={styles.ideaHeader}>
                    <View style={styles.ideaImage}>
                      <Text style={styles.ideaImageText}>📸</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={() => toggleFavorite(idea.id)}
                    >
                      <Heart
                        size={20}
                        color={favorites.includes(idea.id) ? '#EC4899' : '#9CA3AF'}
                        fill={favorites.includes(idea.id) ? '#EC4899' : 'none'}
                      />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.ideaContent}>
                    <View style={styles.ideaTitleRow}>
                      <Text style={styles.ideaTitle}>{idea.title}</Text>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.ratingText}>{idea.rating}</Text>
                        <Text style={styles.reviewsText}>({idea.reviews})</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.ideaDescription}>{idea.description}</Text>
                    
                    <View style={styles.ideaMeta}>
                      <View style={styles.metaItem}>
                        <MapPin size={14} color="#6B7280" />
                        <Text style={styles.metaText}>{idea.location}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#6B7280" />
                        <Text style={styles.metaText}>{idea.duration}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <DollarSign size={14} color="#6B7280" />
                        <Text style={styles.metaText}>{idea.cost}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.tagContainer}>
                      {idea.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
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
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiToggleSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  aiToggleButton: {
    backgroundColor: '#6B46C1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  aiToggleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  toggleAIButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
  },
  toggleAIButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6B7280',
  },
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryItem: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  categoryItemActive: {
    backgroundColor: '#6B46C1',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 2,
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#6B7280',
  },
  categoryCountActive: {
    color: '#E5E7EB',
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  ideaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  ideaHeader: {
    position: 'relative',
  },
  ideaImage: {
    height: 160,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ideaImageText: {
    fontSize: 48,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ideaContent: {
    padding: 16,
  },
  ideaTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ideaTitle: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1F2937',
  },
  reviewsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  ideaDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  ideaMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#6B46C1',
  },
  bottomPadding: {
    height: 32,
  },
});