const express = require("express");
const mongoose = require("mongoose");
const app = express();
const products = require('./product');

// const Product = require("./Models/ProductModel");

const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://ecom:mongopass@cluster0.poybcmo.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors({
    origin: "*",
}));
const port =  4000;
const http = require("http");
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});


  app.get('/products', (req, res) => {
    res.send(products);
  }
  )



app.get("/product/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get product' });
    }
  });


  // app.post('/create', async (req, res) => {
  //   try {
  //     const { name, description, price, discountPrice } = req.body;
  
  //     const newProduct = await Product.create({
  //       name,
  //       description,
  //       price,
  //       discountPrice,
  //     });
  
  //     res.status(201).json(newProduct);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to create product' });
  //   }
  // });
  
  





  
  // Get all products
  app.get('/getAll', async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get products' });
    }
  });

server.listen(port, () => {
  console.log(`listening on ${port}`);
});



