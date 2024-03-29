import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

function App() {
  const [items, setitems] = useState([]);

  const [pageCount,setPageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
    const res = await fetch(//`http://localhost:3004/comments?_page=1&_limit=${limit}`
            `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
    )
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setPageCount(Math.ceil(total / limit));
      // console.log(Math.ceil(total/12));

      setitems(data);
    };
    getComments();
  }, [limit]);
  console.log(items)

  const fetchComments = async (currentPage) => {
    const res = await fetch(
    //  `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
       `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };


  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected+1;

    const commentsFromServer = await fetch(currentPage)
    setitems(commentsFromServer)
  };
  return (
    <div className="container">
      
      {items.map((item)=>{
        
        return   <div key ={item.id}className="col-sm-6 col -md-4 my-2">
          <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
          <div className="card-body">
            <h5 className="card-title text-center h2">Id :{item.id} </h5>
            <h6 className="card-subtitle mb-2 text-muted text-center">
              {item.email}
            </h6>
            <p className="card-text">{item.body}</p>
          </div>
          </div>
        </div>
      })}
      
      {/* {items.map((item)=>{
        return  <div key={item.id} className="col-sm-6 col-md-4 v my-2">
        <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
          <div className="card-body">
            <h5 className="card-title text-center h2">Id :{item.id} </h5>
            <h6 className="card-subtitle mb-2 text-muted text-center">
              {item.email}
            </h6>
            <p className="card-text">{item.body}</p>
          </div>
        </div>
      </div>
      })} */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
      />
    </div>
  );
}

export default App;
