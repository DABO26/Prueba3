import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function List() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://172.16.0.185:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://172.16.0.185:8000/api/products/${productId}`);
      // Eliminar el producto de la lista en el frontend después de eliminarlo en el backend
      setProducts(products.filter((product) => product.id !== productId));
      Alert.alert('Product Deleted', 'The product has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete the product.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Products</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerItem}>Name</Text>
          <Text style={styles.headerItem}>Description</Text>
          <Text style={styles.headerItem}>Price</Text>
          <Text style={styles.headerItem}>Quantity</Text>
          <Text style={styles.headerItem}>Status</Text>
          <Text style={styles.headerItem}>Actions</Text>
        </View>
        {products.map((product) => (
          <View key={product.id} style={styles.tableRow}>
            <Text style={styles.tableItem}>{product.name}</Text>
            <Text style={styles.tableItem}>{product.description}</Text>
            <Text style={styles.tableItem}>{product.price}</Text>
            <Text style={styles.tableItem}>{product.quantity}</Text>
            <Text style={styles.tableItem}>{product.status}</Text>
            <TouchableOpacity onPress={() => handleDelete(product.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Color de fondo blanco
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'green', // Color de texto verde claro
  },
  table: {
    backgroundColor: 'white', // Fondo de la tabla blanco
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  tableItem: {
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});