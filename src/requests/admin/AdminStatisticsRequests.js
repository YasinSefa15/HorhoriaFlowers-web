import {api_helper} from "../../utils/api_helper";
import axios from "axios";


const getAdminStatistics = async ({setUserStatistics,setUserStatisticsChart, secret, setLoading, requestParams,setIncomeStatistics}) => {
    await axios.get(api_helper.api_url + api_helper.admin.statistics.read, {
        headers: {
            "Authorization": "Bearer " + secret,
        },
        params: {
            ...requestParams
        }
    })
        .then(async response => {
            const data = response.data.data
            await setUserStatistics(data)
            await setIncomeStatistics(data.income_statistics)
            await setUserStatisticsChart(data.users_statistics)
            await setLoading(true)
        })
        .catch(error => {
            console.log(error)
        })
}

const getAdminSalesStatistics = async ({setIncomeStatistics, secret, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.statistics.sales, {
        headers: {
            "Authorization": "Bearer " + secret,
        },
        params: {
            ...requestParams
        }
    })
        .then(async response => {
            console.log(response.data.data)
            setIncomeStatistics(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

const getAdminUsersStatistics = async ({setUserStatistics, secret, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.statistics.users, {
        headers: {
            "Authorization": "Bearer " + secret,
        },
        params: {
            ...requestParams
        }
    })
        .then(async response => {
            setUserStatistics(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

const getAdminOrderTrackStatistics = async ({setOrderTrackStatistics, secret, requestParams}) => {
    await axios.get(api_helper.api_url + api_helper.admin.statistics.orders, {
        headers: {
            "Authorization": "Bearer " + secret,
        },
        params: {
            ...requestParams
        }
    })
        .then(async response => {
            await setOrderTrackStatistics(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export {
    getAdminStatistics,
    getAdminSalesStatistics,
    getAdminUsersStatistics,
    getAdminOrderTrackStatistics
}