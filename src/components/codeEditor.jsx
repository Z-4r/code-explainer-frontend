import React from 'react'
import Editor from '@monaco-editor/react'
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '../redux/codeSlice';
import ThemeToggle from './ThemeToggle';

const CodeEditor = () => {
  const dispatch = useDispatch();
  const handleEditorChange = (value) => {
    dispatch(setCode(value || ""));
  };
  const code = useSelector((state) => state.code.code);
  const language = useSelector((state) => state.code.language);

  
  return (
    <div style={{ border: '1px solid #ccc', marginTop: '1rem' }}>
    <Editor
      height="400px"
      defaultLanguage={language}
      value={code}
      placeholder="Enter your code"
      onChange={handleChange}
      theme={theme}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
      />
    </div>
  );
};

export default CodeEditor