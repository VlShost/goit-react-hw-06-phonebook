import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { createSlice } from '@reduxjs/toolkit';
import initialContacts from '../../initialData/contacts';

const constactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: initialContacts,
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  constactsSlice.reducer
);

export const { addContact, deleteContact } = constactsSlice.actions;
