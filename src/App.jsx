import React, { use, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from './components/codeEditor';
import OutputPanel from './components/outputPanel';
import LanguageSelector from './components/languageSelector';
import axios from 'axios';
import HistoryPanel from './components/HistoryPanel';
import ThemeToggle from './components/ThemeToggle';
import { analyzeCode } from './analyze.js';

import { setCode, setLanguage, setOutput, setLoading, resetOutput, addToHistory } from './redux/codeSlice.js';

const App= () => {
  const dispatch = useDispatch();
  const { code, language, output, loading, addToHistory } = useSelector((state) => state.code);
  const theme = useSelector((state) => state.code.theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  
  const handleSubmit = async () => {
    if(!code.trim()) {
      return toast.error("Code cannot be empty!");
    }

  dispatch(setLoading(true));
  dispatch(resetOutput());
  try{
    const res = await analyzeCode({ code, language });
    dispatch(setOutput(res.data));
    dispatch(addToHistory({ code, language }));
  }catch(err){
    toast.error("Error analyzing code!");
  }finally{
    dispatch(setLoading(false));
  }
};

return(
  <div className="container">
    <h1>Code Explainer & Debugger</h1>
    <ThemeToggle />
    <LanguageSelector language={language} setLanguage={setLanguage} />
    <CodeEditor code={code} setCode={setCode} language={language} />
    <button onClick={handleSubmit} disabled={loading}>{loading ? "Anazlyzing..." : "Analyze Code"}</button>
    {loading && <p>Loading analysis...</p>}
    {output && <OutputPanel output={output} />}
    <ToastContainer />
    <HistoryPanel />
  </div>
);
};


export default App;