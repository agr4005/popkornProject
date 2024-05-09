import { useEffect, useState } from "react";
import "./Category.css";


export default function Category({ currCategorylRef, setCurrCategorym, setPageState, setCurrKeyword, setCurrCategoryl }) {

    const categoryList = [
        {
            name: "new",
            subcategorys: [
                { subCategorysId: 1, name: "All" }
            ]
        },
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

    const [categoryS, setCategoryS] = useState(categoryList[0])
    const [isHover, setIsHover] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [keyCateL, setKeyCateL] = useState('all');
    const [keyCateM, setKeyCateM] = useState('all');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY !== 0);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isHover])

    const currHandler = (e, num) => {
        currCategorylRef.current = e.target.className;
        setKeyCateL(e.target.className);
        setCategoryS(categoryList[num]);
        setIsHover(true);
    }

    const leaveHandler = () => {
        setIsHover(false);
        setIsScrolled(false);
    }

    const categorySHandler = (e) => {
        setCurrCategoryl(keyCateL.toLowerCase());
        setCurrCategorym(e.target.innerText);
        setPageState(1);
    }

    const searchBtnHandler = () => {
        currCategorylRef.current = keyCateL.toLowerCase();
        setCurrCategoryl(keyCateL.toLowerCase());
        setCurrCategorym(keyCateM.toLowerCase())
        setPageState(1);
    }

    const searchInputHandler = (keyword) => {
        setCurrKeyword(keyword)
    }

    const eraseBtnHandler = () => {
        const inputElement = document.querySelector('.product_searchinput');
        if (inputElement) {
            inputElement.value = ''; // input 요소의 값을 지움
            setCurrKeyword(''); // React state를 업데이트하여 검색 키워드를 초기화
        }
    }

    return (
        <div className={`category_wrap ${isScrolled ? "fade-out" : ""}`}>
            <div className={`categoryM_container  ${isScrolled ? "fade-out" : ""}`}>
                <ul className="category_event">
                    <li className="new" onMouseOver={(e) => {
                        let num = 0
                        currHandler(e, num)
                    }}>NEW</li>
                    <li className="album" onMouseOver={(e) => {
                        let num = 1
                        currHandler(e, num)
                    }}>ALBUM</li>
                    <li className="goods" onMouseOver={(e) => {
                        let num = 2
                        currHandler(e, num)
                    }}>GOODS</li>
                    <li className="photo" onMouseOver={(e) => {
                        let num = 3
                        currHandler(e, num)
                    }}>PHOTO</li>
                </ul>
                <div className="product_searchbar_bar">
                    <select onChange={(e) => {
                        setKeyCateL(e.target.value)
                        setKeyCateM('all')
                    }} value={keyCateL}>
                        <option value="all" key="0">ALL</option>
                        <option value="album" key="1">ALBUM</option>
                        <option value="goods" key="2">GOODS</option>
                        <option value="photo" key="3">PHOTO</option>
                    </select>
                    &nbsp;
                    <select onChange={(e) => setKeyCateM(e.target.value)}>
                        <option value="all" key="0">ALL</option>
                        {categoryList.find(sub => sub.name === keyCateL)?.subcategorys.map(subcategory =>
                            <option value={subcategory.name} key={subcategory.subCategorysId}>{subcategory.name}</option>
                        )}
                    </select>
                    <input className="product_searchinput" placeholder="Let's Search Products" onChange={(e) => searchInputHandler(e.target.value)} />
                    <i className="xi-close" onClick={eraseBtnHandler}></i>
                    <i className="xi-search" onClick={searchBtnHandler}></i>
                </div>
            </div>
            <div className={`categoryS_container ${isHover ? "active" : ""} ${isScrolled ? () => {
                setIsScrolled(false)
                return "fade-out";
            } : ""}`} onMouseLeave={leaveHandler}>
                <div className={`transform_Cwrap ${isHover ? "active" : ""}`}></div>
                {
                    categoryS.subcategorys.map(subcategory =>
                        <div key={subcategory.subCategorysId} className="subcategory" onClick={categorySHandler}>
                            {subcategory.name}
                        </div>
                    )
                }
            </div>
        </div> /* category_wrap */
    )
}