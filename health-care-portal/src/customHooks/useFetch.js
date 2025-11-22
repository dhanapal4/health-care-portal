import React, { useEffect } from 'react';

const useFetch = (url) => {

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [data, setData] = React.useState(null);

    useEffect(()=>{
        (async ()=>{
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null);
            } catch (err) {
                setError(err);
                setData(null);
            } finally {
                setLoading(false);
            }
        })();
    },[url])

    return { loading, error, data };

}