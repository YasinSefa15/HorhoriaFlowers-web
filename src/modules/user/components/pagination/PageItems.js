export default function PageItems({pageCount, currentPage, changeCurrentPage}) {
    //let nums = range(currentPage - 5 > 0 ? currentPage - 5 : currentPage, currentPage + 5 < pageCount ? currentPage + 5 : pageCount);
    //todo nums range will be arranged
    let nums = range(1, pageCount);

    function range(start, end) {
        let nums = [];
        for (let i = start; i <= end; i++) nums.push(i);
        return nums;
    }

    //console.log(nums, currentPage - 5 > 0 ? currentPage - 5 : currentPage, currentPage + 5 < pageCount ? currentPage + 5 : pageCount)
    //console.log("pagination pagecount and current page", pageCount, currentPage)

    return nums.map(i => (
        <li
            className={"page-item " + (currentPage === parseInt(i) ? "active" : "")}
        >
            <a className="page-link" href="#"
               onClick={(e) => {
                   changeCurrentPage(i - currentPage)
               }}
            >{i} </a>
        </li>
    ))
}