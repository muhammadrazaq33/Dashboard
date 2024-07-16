// start of project
// npm init for json file
// npm i express
// npm i mongoose
// npm i jsonwebtoken (for user authentication)
// npm i cors(for running frontend and backend both)
// npm i nodemon


const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const Product = require("./DB/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register",async (req, res) => {
    let user = new User(req.body);
    let data = await user.save();
    data = data.toObject();
    delete data.password;
    // res.send(data)
     Jwt.sign({ data }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong" });
                }
                 res.send({data, token: token});
            })
})

app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password"); 
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong" });
                }
                 res.send({user, token: token});
            })
           
        } else {
            res.send({result: "No user found"})
    }    
    } else {
        res.send({result:"No user found"})
    }
})

app.post("/add-product",verifyToken,async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/products",verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products) {
        res.send(products)
    } else {
        res.send({result: "No product found"})
    }
})

app.delete("/delete/:id",verifyToken, async (req, res) => {
    let result = await Product.deleteOne({_id: req.params.id})
    res.send(result);
})

app.get("/product/:id",verifyToken,async (req, res) => {
    let product = await Product.findOne({ _id: req.params.id })
    if (product) {
        res.send(product)
    }
    else {
        res.send({ result: "No Record Found" });
    }
})

app.put("/product/:id",verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {$set:req.body}
    )
    res.send(result)
})

app.get("/search/:key",verifyToken,async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            // { price: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
                                                
        ]
    })
    res.send(result);
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (token) {
        token = token.split(" ")[1]
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token" });
            } else {
                next();
            }
        })
    // console.log("middleware called",token);
    } else {
        res.status(403).send({result: "Please provide token"})
    }
}

app.listen(5000);