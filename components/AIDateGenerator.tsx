import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { Sparkles, Send } from 'lucide-react-native';

interface AIDateGeneratorProps {
  onDateGenerated?: (dateIdea: string) => void;
}

export default function AIDateGenerator({ onDateGenerated }: AIDateGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateDateIdea = async () => {
    if (!prompt.trim()) {
      setError('Please enter your preferences');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const response = await fetch('/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate a creative date idea based on these preferences: ${prompt}. Include specific details about the activity, estimated cost, duration, and what makes it special.`,
          maxTokens: 200,
          temperature: 0.8,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate date idea');
      }

      setResponse(data.response);
      onDateGenerated?.(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Romantic indoor date for a rainy evening',
    'Adventure date for active couples',
    'Budget-friendly creative date',
    'Unique date idea we\'ve never tried',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Sparkles size={24} color="#6B46C1" />
        <Text style={styles.title}>AI Date Generator</Text>
      </View>

      <Text style={styles.subtitle}>
        Tell me about your preferences and I'll create the perfect date idea for you!
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., We love outdoor activities, have a $100 budget, and want something adventurous..."
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={3}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity
          style={[styles.generateButton, loading && styles.generateButtonDisabled]}
          onPress={generateDateIdea}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Send size={18} color="#FFFFFF" />
              <Text style={styles.generateButtonText}>Generate</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.quickPromptsContainer}>
        <Text style={styles.quickPromptsTitle}>Quick Ideas:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quickPrompts.map((quickPrompt, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickPromptButton}
              onPress={() => setPrompt(quickPrompt)}
            >
              <Text style={styles.quickPromptText}>{quickPrompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Your Perfect Date Idea:</Text>
          <ScrollView style={styles.responseScroll}>
            <Text style={styles.responseText}>{response}</Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
    textAlignVertical: 'top',
    marginBottom: 12,
    minHeight: 80,
  },
  generateButton: {
    backgroundColor: '#6B46C1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  generateButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  quickPromptsContainer: {
    marginBottom: 20,
  },
  quickPromptsTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  quickPromptButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickPromptText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B46C1',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#DC2626',
  },
  responseContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    maxHeight: 200,
  },
  responseTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#059669',
    marginBottom: 12,
  },
  responseScroll: {
    maxHeight: 120,
  },
  responseText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
  },
});