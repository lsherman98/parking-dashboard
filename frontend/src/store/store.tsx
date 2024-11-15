import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './slices/dashboardSlice'
import transactionsReducer from './slices/transactionsSlice'
import violationsReducer from './slices/violationsSlice'
import reservationReducer from './slices/reservationsSlice'
import locationsReducer from './slices/locationsSlice'
import permitsReducer from './slices/permitsSlice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    transactions: transactionsReducer,
    violations: violationsReducer,
    reservations: reservationReducer,
    locations: locationsReducer,
    permits: permitsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch