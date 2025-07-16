import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/codeSlice';

const LanguageSelector = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.code.language);

    return (
        <div>
            <label>Select Language: </label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="python">Python</option>
                <option value="javascript">Javascript</option>
                <option value="cpp">C++</option>
            </select>
        </div>
    );
};

export default LanguageSelector