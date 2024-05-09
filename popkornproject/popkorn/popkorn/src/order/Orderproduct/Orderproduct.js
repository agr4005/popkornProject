import './Orderproduct.css';
import PriceOutput from './../../useModules/priceOutput/PriceOutput';

export default function Orderproduct({ items, totalPrice}) {
    const productimgSrc = process.env.PUBLIC_URL + "/productIMG/";

    return (
        <div>
            <h3>OrderProduct</h3>
            <div className="orderproductbox">
                <table className='oderproductbox_table'>
                    <thead>
                        <tr className='orderbox_th'>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Option</th>
                            <th>Count</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody className='orderbox_tb'>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td><img src={productimgSrc + item.image1} alt="" /></td>
                                <td>{item.productname}</td>
                                <td>{item.alternative}</td>
                                <td>{item.detailcount}</td>
                                <td>{item.price * item.detailcount}￦</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="orderproductPrice">
                    <PriceOutput priceWon={totalPrice}/>
                </div>
            </div>
        </div>
    );
}
