import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const getPCategories = async () => {
    const response = await axios.get(`${base_url}category/`)
    return response.data;
}

const createPCategory = async (category) => {
    const response = await axios.post(`${base_url}category/`, category, config)
    return response.data
}

const updatePCategory = async (category) => {
    const response = await axios.put(
        `${base_url}category/${category.id}`,
        { title: category.pcategoryData.title },
        config
    );
    return response.data
}

const getPCategory = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`, config)
    return response.data
}

const deletePCategory = async (id) => {
    const response = await axios.delete(`${base_url}category/${id}`, config)
    return response.data
}

const pcategoryService = {
    getPCategories,
    createPCategory,
    getPCategory,
    updatePCategory,
    deletePCategory,
}

export default pcategoryService;