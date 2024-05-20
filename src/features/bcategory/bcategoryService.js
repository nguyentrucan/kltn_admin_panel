import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getBCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`)
    return response.data;
}

const createBCategory = async (bcategory) => {
    const response = await axios.post(`${base_url}blogcategory/`, bcategory, config)
    return response.data
}

const updateBCategory = async (bcategory) => {
    const response = await axios.put(
        `${base_url}blogcategory/${bcategory.id}`,
        { title: bcategory.bcategoryData.title },
        config
    );
    return response.data
}

const getBCategory = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`, config)
    return response.data
}

const deleteBCategory = async (id) => {
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config)
    return response.data
}

const bcategoryService = {
    getBCategories,
    createBCategory,
    updateBCategory,
    getBCategory,
    deleteBCategory
}

export default bcategoryService;