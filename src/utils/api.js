
const BASE_URL = "/api";

const handleResponse = async (response) => {
    if(!response.ok){
        const errorData = response;
        throw new Error(response.status ||'Network response was not ok.')
    }
    
    return response;
};



const apiFetch = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('Authorization')
        },
        ...options,
    };

    try{
        const response = await fetch(url,defaultOptions);
        console.log(response);
        return await handleResponse(response);
    }catch (error){
        console.error('API call failed:', error.message);
        throw error;
    }
};

export default apiFetch;