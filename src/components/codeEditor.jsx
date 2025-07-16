import React from 'react'
import Editor from '@monaco-editor/react'
import { useDispatch, useSelector } from 'react-redux';
import { setCode } from '../redux/codeSlice';

const CodeEditor = () => {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.code.code);
  const language = useSelector((state) => state.code.language);

  
  return (
    <Editor
      height="400px"
      defaultLanguage={language}
      value={code}
      onChange={(value) => setCode(value)}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
      />
  );
};

export default CodeEditor