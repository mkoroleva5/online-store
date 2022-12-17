export interface Action {
  type:
    | 'IN_STOCK'
    | 'BRAND'
    | 'CATEGORY'
    | 'MIN_PRICE'
    | 'MAX_PRICE'
    | 'MIN_STOCK'
    | 'MAX_STOCK'
    | 'SORT'
    | 'ASC';
  payload: string | boolean | number;
}

interface FilterStoreState {
  brand: string;
  category: string;
  price: {
    minPrice: number;
    maxPrice: number;
  };
  stock: {
    minStock: number;
    maxStock: number;
  };
  sort: string;
  asc: boolean;
}

const filterReducer = (state: FilterStoreState, action: Action) => {
  switch (action.type) {
    case 'BRAND':
      return {
        ...state,
        brand: action.payload,
      };
    case 'CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
    case 'MIN_PRICE':
      return {
        ...state,
        price: {
          ...state.price,
          minPrice: action.payload,
        },
      };
    case 'MAX_PRICE':
      return {
        ...state,
        price: {
          ...state.price,
          maxPrice: action.payload,
        },
      };
    case 'MIN_STOCK':
      return {
        ...state,
        stock: {
          ...state.stock,
          minStock: action.payload,
        },
      };
    case 'MAX_STOCK':
      return {
        ...state,
        stock: {
          ...state.stock,
          maxStock: action.payload,
        },
      };
    case 'SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'ASC':
      return {
        ...state,
        asc: action.payload,
      };
    default:
      return state;
  }
};
