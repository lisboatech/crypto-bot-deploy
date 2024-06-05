import React, {useState, useEffect, useContext } from "react";
import axios from "axios";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
  Header, 
  Footer, 
  Search, 
  MovingSubmenu, 
  Preloader, 
  SideBar,
  Home, 
  TradeTokens, 
  TopExchangeTokens, 
  Networks, 
  AddNetwork,
  Price, 
  Login, 
  Signup, 
  Profile, 
  Setting, 
  AddTokenPair, 
  Trading,
  Loader,
} from "../components/index";

import { CONTEXT } from "../context/context";


const index = () => {

  const { 
    TRADING_BOT,
    topTokens,
    trading,
    tradingCount,
    length,
    setTradingCount,
    setLoader,
    loader,
  } = useContext(CONTEXT);

  
  const [activeComponent, setActiveComponent] = useState("Home");
  const [membershipType,setMembershipType] = useState("Premium");
  const [authBackEndID, setAuthBackEndID] = useState("");
  const [networks, setNetworks] = useState({});
  const [networkName, setNetworkName] = useState();


  const notifyError = (msg) => toast.error(msg, {duration: 2000});
  const notifySuccess = (msg) => toast.success(msg, {duration: 2000});
  

  useEffect(() => {
    
    const userBackEndID = localStorage.getItem("CryptoBot_BackEnd");
    const auth = localStorage.getItem("CryptoAUT_TOKEN");
    const network = JSON.parse(localStorage.getItem("activeNetwork"));

    setNetworks(network);
    setNetworkName(network?.networkName);

    if (auth == null || userBackEndID == null) {
      setActiveComponent("Signup");
    } else {
      setActiveComponent("Home");
      setAuthBackEndID(userBackEndID);
    }

  }, []);


  
  const buyMemberShip = async(memberType, price) => {

    notifySuccess("Transaction is processing...");
    setMembershipType(memberType);
    setLoader(true);

    
    const provider = new ethers.JsonRpcProvider(
      `https://rpc.ankr.com/polygon_amoy`
    );

    const wallet = new ethers.Wallet(
      `0x${networks?.privateKey}`, provider
    );
    
    const ammountToSend = ethers.parseUnits(price.toString(), "ether");

    
    const transaction = {
      to: "0xa25f07bccFAffc9934121e1C8e781Ef7F9078AAF", 
      value: ammountToSend,
    };


    
    const signedTransaction = await wallet.sendTransaction(transaction);

    const receipt = await signedTransaction.wait();

    console.log(receipt);

    try {
      
      if (receipt) {
        const res = await axios({
          method: "PATCH",
          url: "/api/v1/user/buyMembership",
          withCredentials: true,
          data: {
            membershipType: memberType,
            userID: authBackEndID,
          },
        });

        
        if (res.statusText == "OK") {
          localStorage.setItem("USER_MEMBERSHIP", memberType);
          notifySuccess("Welcome to the LisboaBot pro Membership");
          setLoader(false);
          window.location.reload();
        }

      }
      
    } catch (error) {
      console.log(error);
      notifyError("Transaction failed");
      setLoader(false);
    }

  };


  return (
    <div>
       <MovingSubmenu />
      {/* */}
      <Preloader />
      {/* Signup */}
      {activeComponent == "Signup" ? (
        <Signup 
          axios={axios}
          setActiveComponent={setActiveComponent}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />

      ) : (

        <div className="techwave_fn_wrapper">
          <div className="techwave_fn_wrap">
          
            <Search />
            <Header 
              networkName={networkName}
              setActiveComponent={setActiveComponent}
            />  
            <SideBar 
              setActiveComponent={setActiveComponent}
            />
            
            {
              activeComponent == "Home" ? (
                <Home/>
              ) : activeComponent == "Trade Tokens" ? (
                <TradeTokens/>
              ) : activeComponent == "Top Exchange Tokens" ? (
                <TopExchangeTokens/>
              ) : activeComponent == "Networks" ? (
                <Networks 
                  networkName={networkName} 
                  setNetworkName={setNetworkName}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                />
              ) : activeComponent == "Add Network" ? (
                <AddNetwork
                  axios={axios} 
                />
              ) : activeComponent == "Trading" ? (
                <Trading 
                  axios={axios} 
                  trading={trading}
                  tradingCount={tradingCount}
                  length={length}
                  setTradingCount={setTradingCount}
                  setActiveComponent={setActiveComponent}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                />
              ) : activeComponent == "Pricing" ? (
                <Price
                  buyMemberShip={buyMemberShip}
                  setMembershipType={setMembershipType}
                />
              ) : activeComponent == "Profile" ? (
                <Profile
                  setActiveComponent={setActiveComponent}
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                />
              ) : activeComponent == "Setting" ? (
                <Setting
                  notifyError={notifyError}
                  notifySuccess={notifySuccess}
                  axios={axios}
                />
              ): activeComponent == "Add Token Pair" ? (
                <AddTokenPair />
              ) : (
                ""
              )
            }
          </div>
        </div>
        
      )}

      
      {activeComponent == "Login" ? (
        <Login
          setActiveComponent={setActiveComponent}
          axios={axios}
          notifyError={notifyError}
          notifySuccess={notifySuccess}
        />

      ) : (
        ""
      )}
      
      {
        loader && (
          <div className="new_loader">
            <Loader />
          </div>
        )
      } 
      
    </div>
  );

};

export default index;
