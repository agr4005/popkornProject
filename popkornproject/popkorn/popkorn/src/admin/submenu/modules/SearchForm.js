
import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ setCurrKeyword, setCurrentPage, showButton = true }) {

   const [searchKeyword, setSearchKeyword] = useState('');

   const onChangeSearch = (e) => {
      setSearchKeyword(e.target.value);
   }

   const getSearchData = () => {
      setCurrKeyword(searchKeyword);
      setCurrentPage(1);
      window.scrollTo(0, 0);
   }

   const handleKeyPress = (event) => {
      if (event.keyCode === 13) {
         getSearchData();
      }
   };

   return (
      <div className="searchform_wrap">
         <div>
            <input type="text" className="searchform_input" placeholder="Search" onChange={onChangeSearch} onKeyDown={handleKeyPress} />
            <button type="button" className="searchform_btn" onClick={getSearchData}><i className="xi-search"></i></button>
         </div>
      </div>
   );
}