import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, MapPin, Heart, MessageCircle, Star, Settings } from 'lucide-react-native';

export default function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      type: 'like',
      title: 'New Like',
      message: 'Sarah liked your photo from Bali',
      time: '2 minutes ago',
      unread: true,
      icon: Heart,
      color: '#EF4444',
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment',
      message: 'John commented on your Tokyo review',
      time: '1 hour ago',
      unread: true,
      icon: MessageCircle,
      color: '#3B82F6',
    },
    {
      id: 3,
      type: 'location',
      title: 'Location Update',
      message: 'New places added near your location',
      time: '3 hours ago',
      unread: false,
      icon: MapPin,
      color: '#10B981',
    },
    {
      id: 4,
      type: 'review',
      title: 'Review Request',
      message: 'Rate your recent visit to Cafe Luna',
      time: '1 day ago',
      unread: false,
      icon: Star,
      color: '#F59E0B',
    },
    {
      id: 5,
      type: 'like',
      title: 'New Follower',
      message: 'Emma started following you',
      time: '2 days ago',
      unread: false,
      icon: Heart,
      color: '#EF4444',
    },
    {
      id: 6,
      type: 'location',
      title: 'Trending Destination',
      message: 'Santorini is trending in your area',
      time: '3 days ago',
      unread: false,
      icon: MapPin,
      color: '#10B981',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#6B7280" size={24} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterTab, styles.activeTab]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Unread</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Mentions</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          return (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                notification.unread && styles.unreadNotification,
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${notification.color}15` }]}>
                <IconComponent color={notification.color} size={20} strokeWidth={2} />
              </View>
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>
              
              {notification.unread && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Mark All as Read Button */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark All as Read</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#667eea',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  notificationsList: {
    flex: 1,
    paddingTop: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#F8FAFF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  markAllButton: {
    backgroundColor: '#667eea',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  markAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
});