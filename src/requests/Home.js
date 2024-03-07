import {api_helper} from "../utils/api_helper";
import axios from "axios";


const getCategoriesList = async ({setCategories}) => {
    await axios.get(api_helper.api_url + api_helper.category.read)
        .then(async response => {
            await setCategories(response.data.data)
            //console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export {
    getCategoriesList
}