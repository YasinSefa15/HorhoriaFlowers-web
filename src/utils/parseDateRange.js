import moment from "moment";

export default function parseDateRange({name}) {
    //name -> this_week, this_month, last_month, last_3_months, last_6_months, last_year
    let startDate = null
    let endDate = null
    if (name === 'this_week') {
        startDate = moment().startOf('week').add(1,"days").toISOString()
        endDate = moment().endOf('week').add(1,"days").toISOString()
    } else if (name === 'this_month') {
        startDate = moment().startOf('month').toISOString()
        endDate = moment().endOf('month').toISOString()
    } else if (name === 'last_month') {
        startDate = moment().subtract(1, 'month').startOf('month').toISOString()
        endDate = moment().subtract(1, 'month').endOf('month').toISOString()
    }
    return [startDate, endDate]
}