import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

function Content({data}) {
    const dataLength = data.length;
    function PaginatedItems({ itemsPerPage }) {
      const [currentItems, setCurrentItems] = useState(data);
      const [pageCount, setPageCount] = useState(dataLength);
      const [itemOffset, setItemOffset] = useState(0);
  
      useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);
  
      const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
      };
  
      return (
        <div className="flex main-content-wrapper">
          <ContentItems currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className="pagination flex"
          />
        </div>
      );
    }
    return (
        <PaginatedItems itemsPerPage={4} />
    )
}

function ContentItems({currentItems}) {
    const dataLength = currentItems.length;
    return (
        <div className="content-wrapper">
        <h2>Courses &amp; Streams</h2>
           {dataLength > 0 ? (
                currentItems.map((value, index) => (
                    <div key={index} className="flex card">
                        <img src={value.image} alt={value.title}/>
                        <div className="card__content flex">
                            <div className="card__content--left">   
                                <h3>{value.title}</h3>                                                                    
                                {value.type === 'courses' ?
                                    <span className={value.status === true ? "btn-course course-active" : "btn-course course-ended" }> {value.status === true ? "Active" : "Course Ended" }</span>  : 
                                    <span className="btn-stream">{value.status === true ? "Ongoing Stream" : "Course Ended" }</span> 
                                }                                    
                            </div>
                            <div className="card__content--right">   
                            {value.type === 'courses' ?
                                <button type="submit" className={value.status === true ? "btn btn-disable" : "btn btn-enable" }>{value.status === true ? "Instructing" : "Join" }</button> : 
                                <button type="submit" className={value.status === true ? "btn btn-disable" : "btn btn-enable" }>{value.status === true ? "Enrolled" : "Join" }</button> 
                            }    
                            </div>
                        </div>
                    </div>
                ))
           ): (
               <div className="no-data-found"><em>No data Found</em></div>
           )}            
        </div>
    )
}

export default Content;
