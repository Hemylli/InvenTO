import { StyleSheet } from 'react-native';
import { colors as globalColors } from './ManageItemStyles'; 

export const styles = StyleSheet.create({
  // Container da Lista
  listContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.background,
  },
  
  // Card de Item Individual
  itemCard: {
    flexDirection: 'row',
    backgroundColor: globalColors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center', // Alinha a imagem e o texto verticalmente
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#E0E0E0', // Cor de fundo enquanto a imagem carrega
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemLocal: {
    fontSize: 14,
    color: globalColors.textSecondary,
    marginBottom: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.text,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: globalColors.text,
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: globalColors.textSecondary,
  },

  // Botões Flutuantes (FABs)
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: globalColors.primary, // Amarelo
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 10,
  },

  // Estilos para lista vazia
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: globalColors.text,
  },
  emptySubText: {
    fontSize: 16,
    color: globalColors.textSecondary,
    marginTop: 8,
  },
});

export default styles;