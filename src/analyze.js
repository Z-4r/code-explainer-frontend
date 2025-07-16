import axios from 'axios'

const API_BASE_URL = "https://code-explainer-backend-km0y.onrender.com"

export const analyzeCode = async ({ code, language }) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/apii/analyze-code/`,{
            code,
            language,
        });
        return response.data;
    } catch (error) {
        console.error("Error analyzing code:", error.response?.data || error.message)
        throw error;
    }
}