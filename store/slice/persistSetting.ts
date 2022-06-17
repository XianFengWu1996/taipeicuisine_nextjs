import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState: IPersistSetting  = {
    language: 'english',
    theme_mode: 'light'
}   

export const persistSettingSlice = createSlice({
  name: 'persist_setting',
  initialState,
  reducers: {
    setLanguage: (state, {payload}:PayloadAction<string>) => {
      state.language = payload;
    },
    setThemeMode: (state, {payload}:PayloadAction<ThemeMode>) => {
      state.theme_mode = payload;
    },
    
    
  }
})

export default persistSettingSlice.reducer

export const {  
  setLanguage,
  setThemeMode
} = persistSettingSlice.actions

