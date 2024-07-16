import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

    const submitProduct = async () => {
        if (!name || !price || !category || !company) {
            // console.log("heelo g")
            setError(true);
            return false;
        }
        // console.log(name, price, category, company)
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        // console.log(userId)
        let result = await fetch("http://localhost:5000/add-product", {
          method: "post",
          body: JSON.stringify({ name, price, category, company, userId }),
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
      result = await result.json();
      if (result) {
        navigate("/")
      }
        // console.log(result)
    }
    return (
      <div className="register-1">
        <div className="register-2">
          <h1>Add Products</h1>
          <input
            className="inputField"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="inputError">Enter valid name</span>
          )}
          <input
            className="inputField"
            placeholder="Enter product price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && (
            <span className="inputError">Enter valid price</span>
          )}
          <input
            className="inputField"
            placeholder="Enter product category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && (
            <span className="inputError">Enter valid category</span>
          )}
          <input
            className="inputField"
            placeholder="Enter product company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && (
            <span className="inputError">Enter valid company</span>
          )}
          <button className="submitBtn " onClick={submitProduct}>
            Add
          </button>
        </div>
      </div>
    );
}

export default AddProduct;