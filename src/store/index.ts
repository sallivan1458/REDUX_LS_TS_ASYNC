import { configureStore,combineReducers } from '@reduxjs/toolkit';
import todoReducer from './TodoSlice'
import {
    persistStore,
    persistReducer ,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
}

const rootReducer = combineReducers({
    todos: todoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store
export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch