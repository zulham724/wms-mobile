import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import SimpleBottomSheet from '../../components/BottomSheet/BottomSheetComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ComplexParentComponent = () => {
  // State untuk mengontrol visibilitas bottom sheet
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  // State untuk data yang akan ditampilkan di bottom sheet
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Data contoh
  const items = [
    { id: 1, title: "Produk 1", price: "Rp 150.000", image: "https://placeholder.com/150" },
    { id: 2, title: "Produk 2", price: "Rp 200.000", image: "https://placeholder.com/150" },
    { id: 3, title: "Produk 3", price: "Rp 175.000", image: "https://placeholder.com/150" },
  ];

  // Handler untuk membuka bottom sheet dengan item tertentu
  const handleOpenBottomSheet = (item) => {
    setSelectedItem(item);
    setShowBottomSheet(true);
  };

  // Handler untuk menutup bottom sheet
  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    // Opsional: Bersihkan data setelah bottom sheet tertutup
    // setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toko Online</Text>
        <TouchableOpacity>
          <MaterialIcons name="shopping-cart" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Produk Rekomendasi</Text>
        
        <View style={styles.productGrid}>
          {items.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.productCard}
              onPress={() => handleOpenBottomSheet(item)}
            >
              <View style={styles.productImageContainer}>
                <View style={styles.productImagePlaceholder} />
              </View>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Kategori</Text>
        <View style={styles.categoryContainer}>
          {['Elektronik', 'Fashion', 'Makanan', 'Kesehatan'].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryItem}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Tambahkan konten lain sesuai kebutuhan */}
        <View style={{height: 200}} /> {/* Spacing di bawah untuk scrolling */}
      </ScrollView>

      {/* Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#333" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#333" />
          <Text style={styles.navText}>Cari</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#333" />
          <Text style={styles.navText}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>

      {/* SimpleBottomSheet */}
      <SimpleBottomSheet 
        vision={showBottomSheet} 
        onClose={handleCloseBottomSheet}
      >
        {selectedItem && (
          <View style={styles.bottomSheetContent}>
            <View style={styles.productDetailHeader}>
              <View style={styles.productImageLarge} />
              <View style={styles.productHeaderInfo}>
                <Text style={styles.detailTitle}>{selectedItem.title}</Text>
                <Text style={styles.detailPrice}>{selectedItem.price}</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name={star <= 4 ? "star" : "star-outline"} 
                      size={16} 
                      color="#FFD700" 
                    />
                  ))}
                  <Text style={styles.ratingText}>(120)</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.descriptionTitle}>Deskripsi Produk</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
              nisi vel consectetur interdum, nisl nisi aliquam eros, eget tincidunt nisl 
              nisi vel nisl. Nullam euismod, nisi vel consectetur interdum.
            </Text>
            
            <View style={styles.variantContainer}>
              <Text style={styles.variantTitle}>Pilih Varian</Text>
              <View style={styles.variantOptions}>
                <TouchableOpacity style={[styles.variantButton, styles.variantActive]}>
                  <Text style={styles.variantText}>Hitam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.variantButton}>
                  <Text style={styles.variantText}>Putih</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.variantButton}>
                  <Text style={styles.variantText}>Merah</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Tambah ke Keranjang</Text>
            </TouchableOpacity>
          </View>
        )}
      </SimpleBottomSheet>
    </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  productImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 12,
    color: '#e91e63',
    marginTop: 4,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    elevation: 1,
  },
  categoryText: {
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
  bottomSheetContent: {
    width: '100%',
  },
  productDetailHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImageLarge: {
    width: 120,
    height: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 16,
  },
  productHeaderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailPrice: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  variantContainer: {
    marginBottom: 20,
  },
  variantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  variantOptions: {
    flexDirection: 'row',
  },
  variantButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  variantActive: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
  },
  variantText: {
    fontSize: 12,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#e91e63',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ComplexParentComponent;