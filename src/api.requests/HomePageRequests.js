import axios from "axios";
import {api_helper} from "../helpers/api_helper";

export default function getDiscountedProducts({setDiscountedProducts, setNewProducts}) {
    axios.get(api_helper.api_url + api_helper.home)
        .then((response) => {
            //console.log(response.data)
            setDiscountedProducts(response.data.data.discounted_products)
            setNewProducts(response.data.data.new_products)
        })
        .catch((error) => {
            console.log(error)
        })
}