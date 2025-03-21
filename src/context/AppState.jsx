import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";


function AppState(props) {
  // const url = "http://localhost:2000/api";

  const url = "https://abhi-ecom.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress,setUserAddress] = useState("")
  const [userOrder,setUserOrder] = useState([])
  const [loading,setLoading] = useState(true)
 
  // Browser rendering
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Start loading

        const api = await axios.get(`${url}/product/all`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        setProducts(api.data.products);
        setFilterData(api.data.products);

        // Execute additional functions after fetching products
        await profile();
        await userCart();
        await getAddress();
        await user_Order();
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); //  Stop loading after fetch completes (whether success or error)
      }
    };

    fetchProduct();
  }, [token, reload]);


  // token set in local storage
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // register
  const register = async (name, email, password) => {
    try {
      const api = await axios.post(
         `${url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("User Register ", api);
      // alert(api.data.message)
      toast.success(api.data.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return api.data;
    } catch (error) {
      console.log("some error userRegister", error);
    }
  };

  // login
  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // Toast
      // console.log("User Login", api.data);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      // token setup
      localStorage.setItem("token", api.data.token);
      setToken(api.data.token);
      setIsAuthenticated(true);
      return api.data;
    } catch (error) {
      console.log("some error userLogin", error);
    }
  };

  // logout
  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("User logout sucessfully--!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // profile
  const profile = async () => {
    const token = localStorage.getItem("token");
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setUser(api.data.user);
  };

  // add to cart
  const addToCart = async (productId, title, price, qty, imgSrc, navigate) => {
    if (!isAuthenticated) {
      toast.warning("You need to log in first!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      navigate("/login"); // Redirect to login page
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const api = await axios.post(
        `${url}/cart/add`,
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  // user cart
  // const userCart = async () => {
  //   const token = localStorage.getItem("token");
  //   const api = await axios.get(`${url}/cart/user`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Auth: token,
  //     },
  //     withCredentials: true,
  //   });
  //   console.log("User card", api);
  // };

  const userCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      // console.log("User cart:", api.data.cart);
      setCart(api.data.cart);
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return null;
    }
  };

  // decrease Qty--
  const decreaseQty = async (productId, qty) => {
    // console.log("productId",productId);
    try {
      const token = localStorage.getItem("token");
      const api = await axios.post(
        `${url}/cart/--qty`,
        {productId, qty },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      // console.log("Decrese cart:", api.data.cart);
      setReload(!reload)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error fetching decrease cart:", error);
      return null;
    }
  };
  // remove product from cart
  const removeCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const api = await axios.delete(
        `${url}/cart/remove/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error fetching remove cart:", error);
      return null;
    }
  };

  // clear cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const api = await axios.delete(
        `${url}/cart/clear`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error fetching remove cart:", error);
      return null;
    }
  };

  // shipping Address
  const addAddress = async( fullName, phoneNumber, country, state, city, pincode,address) => {
    try {
      const token = localStorage.getItem("token")
      const api = await axios.post(
        `${url}/address/add`,
        { fullName, phoneNumber, country, state, city, pincode, address},
        {
          headers: {
            "Content-Type": "application/json",
            Auth:token,
          },
          withCredentials: true,
        }
      );
      // console.log(" Add Address ", api)
      setReload(!reload)
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return api.data


    } catch (error) {
      console.error("Error fetching add Address:", error);
      return null;
    }
  };

   // shipping getAddress
   const getAddress = async() => {
    try {
      const token = localStorage.getItem("token")
      const api = await axios.get(
        `${url}/address/get`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth:token,
          },
          withCredentials: true,
        }
      );
      // console.log(" get Address ", api.data)
      setUserAddress(api.data.userAddress)
      // setReload(!reload)
      // toast.success(api.data.message, {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   transition: Bounce,
      // });
      // return api.data
    } catch (error) {
      console.error("Error fetching add Address:", error);
      return null;
    }
  };


  // get-userOrder
  const user_Order = async() => {
    try {
      const token = localStorage.getItem("token")
      const api = await axios.get(
        `${url}/payment/userorder`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth:token,
          },
          withCredentials: true,
        }
      );
      // console.log(" user order", api.data)
      setUserOrder(api.data.orders)
      // setReload(!reload)
      // toast.success(api.data.message, {
      //   position: "top-right",
      //   autoClose: 1500,
      //   hideProgressBar: false,
      //   closeOnClick: false,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   transition: Bounce,
      // });
      // return api.data
    } catch (error) {
      console.error("Error fetching User Order:", error);
      return null;
    }
  };



  return (
    <AppContext.Provider
      value={{
        products,
        loading,
        register,
        login,
        url,
        token,
        isAuthenticated,
        setIsAuthenticated,
        filterData,
        setFilterData,
        logout,
        profile,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeCart,
        clearCart,
        addAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
