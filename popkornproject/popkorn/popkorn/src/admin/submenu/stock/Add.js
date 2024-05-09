
import TypeIt from "typeit-react";
import "./Add.css";
import { useState } from "react";
import { apiCall } from "../../../service/apiService";


export default function Add() {

   const categoryList = [
      {
         name: "album",
         subcategorys: [
            { subCategorysId: 3, name: "All" }
         ]
      },
      {
         name: "goods",
         subcategorys: [
            { subCategorysId: 4, name: "Official Fanlight" },
            { subCategorysId: 5, name: "Key Ring" },
            { subCategorysId: 6, name: "Phone Case" },
            { subCategorysId: 7, name: "ETC" }
         ]
      },

      {
         name: "photo",
         subcategorys: [
            { subCategorysId: 8, name: "Photo Book" },
            { subCategorysId: 9, name: "Photo Card" }
         ]
      }
   ]

   const noimage = process.env.PUBLIC_URL + "/noimage.png";
   const [keyCateL, setKeyCateL] = useState('album');
   const [keyCateM, setKeyCateM] = useState('all');
   const [addList, setAddList] = useState([]);
   const [imageURL, setImageURL] = useState(""); // State to store image URL
   const [artist, setArtist] = useState("");
   const [categorys, setCategorys] = useState("");
   const [price, setPrice] = useState(0);
   const [option, setOption] = useState("");
   const [productName, setProductName] = useState("");
   const [storing, setStoring] = useState(0);
   const [imageFile, setImageFile] = useState(null); // State to store image file

   // Handle image upload
   const handleImageUpload = (event) => {
      const file = event.target.files[0]; // Get the first file selected by the user

      if (file) { // Check if file exists
         setImageFile(file); // Set the image file in the state
         const imageURL1 = URL.createObjectURL(file); // Create URL for the selected image
         setImageURL(imageURL1); // Set the image URL in the state
      } else {
         setImageFile(null);
         setImageURL('');
      }
   };

   const insertAddListHandler = () => {
      const newItem = {
         productName: productName,
         artist: artist,
         categoryl: keyCateL,
         categorym: keyCateM,
         categorys: categorys,
         price: price,
         option: option,
         storing: storing,
         image1: imageURL,
         imageFile: imageFile, // Store the file reference
      };

      setAddList([...addList, newItem]);
   }

   const eraseListAll = () => {
      setAddList([]);
   }

   const datatoServer = () => {
      
      // Add form data
      addList.map((item, index) => {
         const formData = new FormData();

         formData.append(`productname`, item.productName);
         formData.append(`artist`, item.artist);
         formData.append(`categoryl`, item.categoryl);
         formData.append(`categorym`, item.categorym);
         formData.append(`categorys`, item.categorys);
         formData.append(`price`, item.price);
         formData.append(`alternative`, item.option);
         formData.append(`storing`, item.storing);
         formData.append(`image1`, item.image1.substring(item.image1.lastIndexOf('/') + 1));
         formData.append(`imageFile`, item.imageFile);

         apiCall('/api/manager/product/productSave', 'POST', formData, sessionStorage.getItem('token'))
            .then(response => {
               if (response.data) {
                  alert(`Upload Success!! FileName => ${item.image1}`)
               } else {
                  alert(`Upload Failed!! FileName => ${item.image1}`)
               }

            })
            .catch(err => {
               alert('Editing and deleting are possible from "MANAGER" authority and above.')
            })

      });
   }

   return (
      <div className="add_wrap">
         <div className="add_header">
            <TypeIt options={{ loop: false }} className="productlist_type">Add Product</TypeIt>
         </div>
         <form>
            <div className="add_image_input">
               <img src={imageURL ? imageURL : noimage} alt="Upload Image" />
               <div className="add_input_wrap">
                  <span>Image File</span>
                  <input type="file" onChange={handleImageUpload} />
                  <span>Product Name (Title)</span>
                  <input type="text" onChange={(e) => setProductName(e.target.value)} />
                  <span>Artist</span>
                  <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                  <span>Category</span>
                  <div>
                     <select onChange={(e) => {
                        setKeyCateL(e.target.value)
                        setKeyCateM(categoryList.find(sub => sub.name === keyCateL)?.subcategorys[0].name)
                     }} value={keyCateL}>
                        <option value="album" key="1">ALBUM</option>
                        <option value="goods" key="2">GOODS</option>
                        <option value="photo" key="3">PHOTO</option>
                     </select>
                     &nbsp;
                     <select onChange={(e) => setKeyCateM(e.target.value)}>
                        {categoryList.find(sub => sub.name === keyCateL)?.subcategorys.map(subcategory =>
                           <option value={subcategory.name} key={subcategory.subCategorysId}>{subcategory.name}</option>
                        )}
                     </select>
                  </div>
                  <span>Search Keyword</span>
                  <input type="text" value={categorys} onChange={(e) => setCategorys(e.target.value)} />
                  <span>Price</span>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <span>Option</span>
                  <input type="text" value={option} onChange={(e) => setOption(e.target.value)} />
                  <span>Stock In</span>
                  <input type="number" className="stock_input" value={storing} onChange={(e) => setStoring(e.target.value)} />
                  <div className="add_btn_wrap">
                     <button type="button" className="add_insert_btn" onClick={insertAddListHandler}>Insert</button>
                     <button type="reset" className="add_reset_btn" onClick={() => setImageURL()}>Reset</button>
                  </div>
               </div>
            </div>
         </form>
         <div className="add_list_wrap">
            <span>Add List</span>
            <div className="add_list_contents">
               <ul>{
                  addList.map((item, index) =>

                     <li key={index} className="add_list_li">
                        <input type="checkbox" />
                        <img src={item.image1 ? item.image1 : noimage} alt="Product" />
                        <p>{item.imageURL}</p>
                        <p>{item.productName}</p>
                        <p>{item.artist}</p>
                        <p>{item.categoryl}</p>
                        <p>{item.categorym}</p>
                        <p>{item.categorys}</p>
                        <p>{item.price}</p>
                        <p>{item.option}</p>
                        <p>{item.storing}</p>
                        <p><i className="xi-close"></i></p>
                     </li>
                  )
               }
               </ul>
            </div>
            <div className="add_btn_wrap2">
               <button type="reset" className="add_reset_btn" onClick={eraseListAll}>Erase All</button>
               <button type="button" className="add_insert_btn" onClick={datatoServer}>Add DB</button>
            </div>
         </div>
      </div>
   );
}