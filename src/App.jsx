import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

import CodeEditor from './components/codeEditor';
import OutputPanel from './components/outputPanel';
import LanguageSelector from './components/languageSelector';
import HistoryPanel from './components/HistoryPanel';
import ThemeToggle from './components/ThemeToggle';

import { analyzeCode } from './api/analyze.js'; // ✅ adjust path if needed

import {
  setOutput,
  setLoading,
  resetOutput,
  addToHistory
} from './redux/codeSlice.js';

const App = () => {
  const dispatch = useDispatch();
  const { code, language, output, loading, theme } = useSelector((state) => state.code);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSubmit = async () => {
    console.log("Code submitted:", code);

    if (!code || !code.trim()) {
      return toast.error("Code cannot be empty!");
    }

    dispatch(setLoading(true));
    dispatch(resetOutput());

    try {
      const result = await analyzeCode({ code, language });
      dispatch(setOutput(result));
      dispatch(addToHistory({ code, language }));
      toast.success("Analysis completed!");
    } catch (error) {
      console.error(error);
      toast.error("Error analyzing code.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container">
      <h1>Code Explainer & Debugger</h1>

      <ThemeToggle />
      <LanguageSelector />
      <CodeEditor />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>

      {loading && <p>Loading analysis...</p>}
      {output && <OutputPanel output={output} />}
      
      <HistoryPanel />
      <ToastContainer />
    </div>
  );
};

export default App;
