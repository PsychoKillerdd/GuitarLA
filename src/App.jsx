import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState,useEffect } from "react";
import { db } from "./data/db";

function App() {
  const initialCart = () => {
    const localStorageCard = localStorage.getItem('cart')
    return localStorageCard ? JSON.parse(localStorageCard) : []
  }


  const MAX_ITEMS = 5.0
  const MIN_ITEMS = 1
  const [data] = useState(db);
  const [cart,setCart] = useState(initialCart);
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])
  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }
  function aumentarCantidad(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,quantity:item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }
  function disminuirCantidad(id){
    const updateCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,quantity:item.quantity - 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function addToCart(item){
    const itemExists = cart.findIndex(guitar => guitar.id === item.id );
    if(itemExists < 0){
      item.quantity = 1;
      setCart([...cart,item])
    }else{
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }
  }
  function clearCart(){
    setCart([])
  }



  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      aumentarCantidad={aumentarCantidad}
      disminuirCantidad={disminuirCantidad}
      clearCart={clearCart}
    
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map(
            (guitar) => 
              (<Guitar
              //props
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
              />
              //finprops
            ))}
          
        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}
export default App