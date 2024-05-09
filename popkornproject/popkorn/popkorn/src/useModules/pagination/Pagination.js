

import "./Pagination.css";

export default function Pagination({ pageData, setPageState }) {

    const pageHandeler = (pagenum) => {
        setPageState(pagenum);
    }

    const prevHandler = () => {
        if (pageData.prev) { // 이전 페이지로 이동 가능한 경우에만
            setPageState(pageData.start-1); 
        }
    }

    const nextHandler = () => {
        if (pageData.next) { // 다음 페이지로 이동 가능한 경우에만
            setPageState(pageData.end+1);
        }
    }

    const startHandler = () => {
        setPageState(1); // 시작 페이지로 이동
    }

    const endHandler = () => {
        setPageState(pageData.totalPage); // 마지막 페이지로 이동
    }

    return (
        <div className="pagination_wrap">
            {pageData.prev ?
                <>
                    <div className="pagenum_round nextprev" onClick={startHandler}>
                        <span>start</span>
                    </div>
                    <div className="paging_prev_div">
                        <div className="pagenum_round arrowbtn" onClick={prevHandler}>
                            <i className="xi-angle-left"></i>
                        </div>
                    </div>
                </>
                : <></>
            }
            <div className="paging_pagenum_div">
                {
                    pageData.pageList.map((pagenum, index) =>
                        <div key={index} className="pagenum_round" onClick={() => { pageHandeler(pagenum) }}>
                            <span className={pageData.page === pagenum ? 'currpagenum' : 'pagenum'} >{pagenum}</span>
                        </div>
                    )
                }
            </div>
            {
                pageData.next ?
                    <>
                        <div className="paging_next_div">
                            <div className="pagenum_round arrowbtn" onClick={nextHandler}>
                                <i className="xi-angle-right"></i>
                            </div>
                        </div>
                        <div className="pagenum_round nextprev" onClick={endHandler}>
                            <span>end</span>
                        </div>
                    </>
                    :
                    <></>
            }
        </div >
    )
}