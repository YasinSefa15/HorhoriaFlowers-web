import axios from "axios";
import {api_helper} from "../utils/api_helper";

export default async function getDiscountedProducts({setDiscountedProducts, setNewProducts}) {
    console.log(api_helper.api_url + api_helper.home)
    await axios.get(api_helper.api_url + api_helper.home)
        .then((response) => {
            console.log(response.data.data.discounted_products)
            setDiscountedProducts(response.data.data.discounted_products)
            setNewProducts(response.data.data.new_products)
            //console.log(response.data.data)
        })
        .catch((error) => {
            console.log(error)
        })
}