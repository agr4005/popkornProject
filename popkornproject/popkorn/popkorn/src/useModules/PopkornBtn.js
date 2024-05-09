import './PopkornBtn.css';



export default function PopkornBtn({ btnName, btntype, btnfun }) {


    return (
        <div>
            {
                btntype ?
                    <button onClick={btnfun} className='popkornButton1'>{btnName}</button>
                    :
                    <button onClick={btnfun} className='popkornButton2'>{btnName}</button>
            }
        </div>
    );

};