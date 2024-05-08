import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`)
    return response.data;
}

const bcategoryService = {
    getBCategories,
}

export default bcategoryService;