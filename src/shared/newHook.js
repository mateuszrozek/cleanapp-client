import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetchNew = (apiRoot) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    const fetchData = async (apiPath) => {
        setIsError(false);
        setIsLoading(true);
        try {
          const response = await axios.get(apiPath);
          setData(response.data);
        } catch (error) {
          setIsError(true);
        }
        setIsLoading(false);
      };
  
    useEffect(() => {
      fetchData(apiRoot);
    }, [apiRoot]);
  
    return [{ data, isLoading, isError }, fetchData];
  };
  