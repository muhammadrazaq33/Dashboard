import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  
    useEffect(() => {
        getProducts(); 
    }, [])
    
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        result = await result.json();
        // console.log(result)
        setProduct(result)
  }
  
  const deleteProduct = async (id) => {
    // console.log("deleted")
    let result = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    // console.log(result);
    if (result) {
      getProducts();
      alert("Item deleted");
    }
  }

  const inputHandle = async (e) => {
    // console.log(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
    result = await result.json();
    if (result) {
      setProduct(result);
    }
    // console.log(result);   
    } else {
      getProducts();
    }
   
  }
    return (
      <div className="products">
        <h1>products</h1>
      <input type="text" placeholder="Search Product" onChange={inputHandle} className="search" />
        <ul>
          <li>S.No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Operation</li>
        </ul>
        <div>
          {product.length>0 ? product.map((item, index) => (
            <ul key={index}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}>
                  {" "}
                  <button>Updata</button>
                </Link>
                {/* <MdDelete className="delete-icon" onClick={() => deleteProduct(item._id)} /> */}
              </li>
            </ul>
          ))
        : <h1 className="not-found">No result found</h1>
        }
        </div>
      </div>
    );
}

export default Products;