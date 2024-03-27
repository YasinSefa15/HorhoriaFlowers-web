import axios from "axios";
import {api_helper} from "../utils/api_helper";

export default async function getDiscountedProducts({setDiscountedProducts, setNewProducts}) {
    await axios.get(api_helper.api_url + api_helper.home)
        .then((response) => {
            setDiscountedProducts(response.data.data.discounted_products)
            setNewProducts(response.data.data.new_products)
        })
        .catch((error) => {
            console.log(error)
        })
}