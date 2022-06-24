
import './App.scss';
import pizzaIcon from './pizza.png';
import { useState , useEffect} from 'react'
function App() {
  const [ num, setNum] = useState(1);
  const [ price ] = useState(50);
  const [ totalPrice, setTotalPrice] = useState(price);
  const [Discount, setDiscount] = useState(0);
  const [Msg, SetMsg] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [addon, setAddon] = useState(0);

// qty increment-------------
  const increment = () => {
    setNum(Number(num)+1)
  } 

// qty decrement-------------
const decrement = () => {
    if(num>0) {
      setNum(Number(num)-1)
    }
} 

// addon changes
const handleOnChange = (event) => {
    // setIsChecked(event.target.checked);
    console.log(event.target.checked);
    if(event.target.checked) {
      setAddon(5);
    }
    else {
      setAddon(0);
    }
};


// discount input change
const onChange=(e)=> {
    setDiscount(e.target.value)

    if(e.target.value > 60){
      SetMsg(true);
      setDiscount(0);
    }
    else {
      SetMsg(false)
    }
}

const getFinalPrice=()=> {
   return Number(totalPrice) - Number(totalPrice*Discount/100).toFixed(2);
}

const getTotalPrice=()=> {
  return Number(num)*price + addon;
}

// final price and total price update
useEffect(() => {
  setFinalPrice(getFinalPrice());
  setTotalPrice(getTotalPrice());
}, [getFinalPrice, getTotalPrice, totalPrice, addon]);


  return (
   <div className="Product-Card">
        <h2 className="Product-Title">Pizza ABC</h2>
        
        <span className="Product-Desc">We Currently Serving one pizza only. 
        Please taste and review.</span>
        
        <div className="Product-Wrapper">

          <div className="Product-Detail">
              <div className="Product-Qty">
                <button className="button minus" onClick={decrement}>
                    minus
                </button>
                <input type="number" className="InputNumber" value={num} />
                <button className="button plus" onClick={increment}>
                    Plus
                </button>
              </div>
        
              {num ? 
              <div className="topping">
                  <input type="checkbox" id="topping" name="topping"  onChange={handleOnChange}/>Add On
              </div> : null
            }
          </div>
        
          <div className="Product-Image">
              <img src={pizzaIcon} alt="img" />
          </div>  
        </div>

        <div className="Product-Total">
            <span className="TotalPrice"><span className="title">Total</span> ${totalPrice}</span>

            <span className="Discount"><span className="title">Discount</span> - <input type="number" value={ Discount } onChange = { onChange }  className="DiscountInput"  disabled = { num < 1 ? true : false}  min='0' />%</span>
             {Msg && <span className="ErrorMsg">Less then 60% Discount is allow.</span> }
            
            <span className="topay"><span className="title">To Pay</span>{finalPrice}</span>
        </div>

    </div>
  );
}

export default App;
