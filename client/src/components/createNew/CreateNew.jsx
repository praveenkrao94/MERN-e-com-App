// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateNew = () => {
//   const [productData, setProductData] = useState({
//     name: '',
//     desc: '',
//     ProductInfo: '',
//     ActualPrice: '',
//     price: '',
//     save: '',
//     image: null,
//   });

//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setProductData({
//       ...productData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (event) => {
//     setProductData({
//       ...productData,
//       image: event.target.files[0],
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();


//     dispatch({ type: 'products/add', payload: productData });

   
//     setProductData({
//       name: '',
//       desc: '',
//       ProductInfo: '',
//       ActualPrice: '',
//       price: '',
//       save: '',
//       image: null,
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Product Name:
//         <input type="text" name="name" value={productData.name} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Description:
//         <input type="text" name="desc" value={productData.desc} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Product Info:
//         <textarea name="ProductInfo" value={productData.ProductInfo} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Actual Price:
//         <input type="number" name="ActualPrice" value={productData.ActualPrice} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Price:
//         <input type="number" name="price" value={productData.price} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Save:
//         <input type="text" name="save" value={productData.save} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Image:
//         <input type="file" name="image" onChange={handleImageChange} />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default CreateNew;
