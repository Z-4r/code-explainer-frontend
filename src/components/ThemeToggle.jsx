import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/codeSlice';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.code.theme);

    return (
        <button onClick={() => dispatch(toggleTheme())} style={{ marginBottom: '10px' }}>
            Switch to {theme === 'light' ? 'dark' : 'light'} Mode
        </button>
    );
};

export default ThemeToggle;