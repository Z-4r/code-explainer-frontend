import React from 'react';

const OutputPanel = ({ output }) => {
  return (
    <div className="output">
      <h2>📝 Explanation</h2>
      <p>{output.explanation || "No explanation provided."}</p>

      <h2>⚠️ Errors</h2>
      <ul>
        {output.errors && output.errors.length > 0 ? (
          output.errors.map((err, idx) => <li key={idx}>{err}</li>)
        ) : (
          <li>No errors detected.</li>
        )}
      </ul>

      <h2>💡 Suggestions</h2>
      <ul>
        {output.suggestions && output.suggestions.length > 0 ? (
          output.suggestions.map((sug, idx) => <li key={idx}>{sug}</li>)
        ) : (
          <li>No suggestions.</li>
        )}
      </ul>
    </div>
  );
};

export default OutputPanel;
