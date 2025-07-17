import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: '',
  language: 'python',
  output: null,
  loading: false,
  theme: 'light',
  history: JSON.parse(localStorage.getItem('code_history')) || [],
  theme: localStorage.getItem('theme') || 'light',
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetOutput: (state) => {
      state.output = null;
    },
    addToHistory: (state, action) => {
        const newEntry = {
            code: action.payload.code,
            language: action.payload.language,
            timestamp: new Date().toISOString(),
        };

        const last = state.history[state.history.length - 1];
        if(!last || last.code !== newEntry.code) {
            state.history.push(newEntry);
            localStorage.setItem('code_history', JSON.stringify(state.history));
        }
    },
    loadHistoryFromStorage: (state) => {
        state.history = JSON.parse(localStorage.getItem('code_history')) || [];
    },
    clearHistory: (state) => {
        state.history = [];
        localStorage.removeItem('code_history');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const {
  setCode,
  setLanguage,
  setOutput,
  setLoading,
  resetOutput,
  addToHistory,
  loadHistoryFromStorage,
  clearHistory,
  toggleTheme,
} = codeSlice.actions;

export default codeSlice.reducer;
