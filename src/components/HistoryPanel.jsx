import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCode, setLanguage, clearHistory } from '../redux/codeSlice';

const HistoryPanel = () => {
    const dispatch = useDispatch();
    const history = useSelector((state) => state.code.history);

    const handleLoad = (item) => {
        dispatch(setCode(item.code));
        dispatch(setLanguage(item.language));
    };
    return(
        <div style={{
            background: '#f9f9f9',
            border: '1px solid #ccc',
            padding: '10px',
            marginTop: '20px',
        }}>
            <h3>Code History</h3>
            {history.length === 0 ? (
                <p>No code snippets saved.</p>
            ) : (
                <ul>
                    {history.map((itm, idx) => (
                        <li key={idx} style ={{ marginBottom: '10px'}}>
                            <code style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                                {item.code.substring(0, 50)}.....
                            </code>
                            <small>{item.language} | {new Date(item.timestamp).toLocaleString()}</small> <br />
                            <button onClick={() => handleLoad(item)}>Load</button>
                        </li>
                    ))}
                </ul>
            )}
            {history.length > 0 && <button onClick={() => dispatch(clearHistory())}>Clear History</button>}
        </div>
    );
};

export default HistoryPanel;