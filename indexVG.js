import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import products from "./productsSchema.js";
import productsSchema from "./productsSchema.js";

mongoose.connect("mongodb://127.0.0.1:27017/products");
const db = mongoose.connection;

db.on("error", console.error);
db.once("open", ()=> console.log("Mongodb connected succesfully!"));

const PORT = 3000;
const app = express();

app.set("view engine", "pug");

app.get("/", async (req, res)=>{
    try{
    const prodData = await products.find()
    res.render("products", { products: prodData })
    res.status(200)
    }catch(error){
        res.status(404).end()
    }
});

app.use(bodyParser.json());

app.get("/api/products", async (req, res)=>{
    try{
    const searchWord = req.query.Name
    if(searchWord){
        const word = searchWord
        const filtered = await products.find({ Name: {"$regex": word}});
        res.json(filtered)
        res.status(200).end()
    }else{
        const product = await products.find()
        res.json(product)
        res.status(200).end()
    }
}catch(error){
    res.status(500).json({ message: "Internal server error" })
}
})

app.get("/api/products/:id", async (req, res)=>{
    try{
        const productId = await products.findById(req.params.id);
        if(productId){
            res.json(productId)
            res.status(200).end()
        }else{
            res.status(404).end()
        }
    }catch(error){
        res.status(500).json({ message: "Internal server error" })
    }
})

app.post("/api/products", async (req, res)=>{
    try{
        const product = new products({
            ...req.body,
        });
       const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    }catch(error){
        res.status(400).end();
    }
});

app.put("/api/products/:id", async (req, res)=>{
    try{
        const product = await products.findById(req.params.id);
        if(product){
            if(req.body.Name){
                product.Name = req.body.Name
            }
            if(req.body.Model){
                product.Model = req.body.Model
            }
            if(req.body.Price){
                product.Price = req.body.Price
            }
            if(req.body.Quantity){
                product.Quantity = req.body.Quantity
            }
            if(req.body.Category){
                product.Category = req.body.Category
            }
            const changedProduct = await product.save()
            res.status(200).json(changedProduct)
        }else{
            res.status(404).end()
        }
    }catch(error){
        res.status(400).end();
    }
})

app.delete("/api/products/:id", async (req, res)=>{
    try {
        await products.findOneAndDelete({ _id: req.params.id });
        res.status(200).end();
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "not found" });
    }
});
app.delete("/api/products", async (req, res)=>{
        await products.deleteMany({});
        res.status(200).end();
});


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

// {
//     "_id": "656f1236184475912a9434be",
//     "Name": "Gunt",
//     "Model": "Jacket",
//     "Price": 1299,
//     "Quantity": 100,
//     "Category": "Full-Price",
//     "__v": 0
// },
//  {
//     "_id": "656f1275184475912a9434c2",
//     "Name": "Lorris",
//     "Model": "Suit Pants",
//     "Price": 899,
//     "Quantity": 100,
//     "Category": "Full-Price",
//     "__v": 0
// }
// {
//     "_id": "656f12c5184475912a9434c4",
//     "Name": "Thomas Pilfigur",
//     "Model": "Polo-shirt",
//     "Price": 399,
//     "Quantity": 100,
//     "Category": "SALE",
//     "__v": 0
// },
// {
//     "_id": "656f132b184475912a9434c6",
//     "Name": "Alfred Lauren",
//     "Model": "Boots",
//     "Price": 2999,
//     "Quantity": 100,
//     "Category": "Full-price",
//     "__v": 0
// },
// {
//     "_id": "65704990e3d36391ee0bd637",
//     "Name": "Alfred Lauren",
//     "Model": "Boots",
//     "Price": 1399,
//     "Quantity": 100,
//     "Category": "SALE",
//     "__v": 0
// }