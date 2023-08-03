const express = require("express");
const mongoose = require("mongoose");
const app = express();
const products = require('./product');

// const products = require("./Models/ProductModel");

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
const port = process.env.PORT || 4000;
const http = require("http");
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test ok");
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads'); // Destination folder for uploaded images
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); // Rename image files with a unique name
//     }
//   });
  
//   const upload = multer({ storage: storage });
  
//   router.post('/products', upload.single('image'), (req, res) => {
//     const { name, ActualPrice, desc, price, ProductInfo, save } = req.body;
//     const image = req.file ? req.file.filename : undefined; // Get the filename of the uploaded image
//     const product = new Product({
//       name,
//       save,
//       desc,
//       price,
//       image,
//       ProductInfo,
//       ActualPrice,
//     });
  
//     product.save()
//       .then(savedProduct => {
//         res.status(200).send(savedProduct);
//       })
//       .catch(error => {
//         res.status(500).send(error);
//       });
//   });

  app.get('/products', (req, res) => {
    res.send(products);
  }
  )



app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});



