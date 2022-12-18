// import { FilterActionType, FilterStoreState } from './FilterStoreTypes';

// export const filterReducer = (state: FilterStoreState, action: FilterActionType) => {
//   switch (action.type) {
//     case 'SEARCH':
//       return {
//         ...state,
//         searchField: action.payload,
//       };
//     case 'ADD_BRAND':
//       return {
//         ...state,
//         brand: [...state.brand, action.payload],
//       };
//     case 'REMOVE_BRAND':
//       return {
//         ...state,
//         brand: state.brand.filter((el) => el !== action.payload),
//       };
//     case 'ADD_PRODTYPE':
//       return {
//         ...state,
//         prodType: [...state.prodType, action.payload],
//       };
//     case 'REMOVE_PRODTYPE':
//       return {
//         ...state,
//         prodType: state.prodType.filter((el) => el !== action.payload),
//       };
//     case 'MIN_PRICE':
//       return {
//         ...state,
//         minPrice: action.payload,
//       };
//     case 'MAX_PRICE':
//       return {
//         ...state,
//         maxPrice: action.payload,
//       };
//     case 'MIN_STOCK':
//       return {
//         ...state,
//         minStock: action.payload,
//       };
//     case 'MAX_STOCK':
//       return {
//         ...state,
//         maxStock: action.payload,
//       };
//     case 'SORT_BY':
//       return {
//         ...state,
//         sortBy: action.payload,
//       };
//     case 'SORT_DIRECTION':
//       return {
//         ...state,
//         sortDirection: action.payload,
//       };
//     case 'DISPLAY':
//       return {
//         ...state,
//         display: action.payload,
//       };
//     default:
//       return state;
//   }
// };
