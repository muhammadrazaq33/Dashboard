import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(params);
        getProductData();
    }, [])
    
    const getProductData = async () => {
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
        result = await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
}

  const updateProduct = async () => {
    //   console.log("updated")
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: "put",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.log(result);
      navigate("/")
  };
  return (
    <div className="register-1">
      <div className="register-2">
        <h1>Update Products</h1>
        <input
          className="inputField"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="inputField"
          placeholder="Enter product price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="inputField"
          placeholder="Enter product category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="inputField"
          placeholder="Enter product company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button className="submitBtn " onClick={updateProduct}>
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProducts;
