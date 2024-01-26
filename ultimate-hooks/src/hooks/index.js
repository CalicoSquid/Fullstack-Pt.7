import axios from 'axios';
import { useState, useEffect } from "react";
export const useResource = (baseUrl) => {

    const [resources, setResources] = useState([]);

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        return response.data;
    }

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources(resources.concat(response.data))
        return response.data;
    }
    
    const service = {
        getAll,
        create
    }

    return [resources, service]
}

export const useField = (type) => {
    const [value, setValue] = useState("");
  
    const onChange = (event) => {
      setValue(event.target.value);
    };
  
    return {
      type,
      value,
      onChange,
    };
  };