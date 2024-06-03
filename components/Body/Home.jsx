import React from 'react';
import { Footer } from "../index";


const Home = () => {
  return (
    <div className="techwave_fn_content">
      <div className="techwave_fn_page">
        <div className="techwave_fn_home">
          <div className="section_home">
            
            <div className="section_left">
              <div className="techwave_fn_title_holder">
                <h1 className="title">Automate Your Crypto Trading</h1>
                <p className="desc">
                  Crypto Trading Financial Bot For Buying and Sell Crypto
                </p>
              </div>
            
              
              <div className="techwave_fn_interactive_list">
                <ul>
                  
                  <li>
                    <div className="item">
                      <a>
                        
                        <span className="icon">
                          <img 
                            src="img/lighticon/light-19.png" 
                            className="fn__svg"
                            alt="" 
                          />
                        </span>
                        
                        <h2 className="title">Buy Any Token</h2>
                        <p className="desc">
                          Seamlessly purchase any cryptocurrency with our 
                          state-of-the-art trading bot. Experience quick, 
                          secure, and hassle-free transactions to expand 
                          your investment portfolio.
                        </p>
                        
                        <span className="arrow">
                          <img 
                            src="img/lighticon/light-22.png" 
                            className="fn__svg"
                            alt="" 
                          />
                        </span>
                      </a>
                    </div>
                  </li>

                  
                  <li>
                    <div className="item">
                      <a>
                        
                        <span className="icon">
                          <img 
                            src="img/lighticon/light-16.png" 
                            className="fn__svg"
                            alt="" 
                          />
                        </span>
                        
                        <h2 className="title">Sell Any Token</h2>
                        <p className="desc">
                          Effortlessly sell your cryptocurrencies with 
                          our advanced trading bot. Benefit from swift, 
                          secure, and streamlined sales to manage your 
                          assets efficiently and profitably.
                        </p>
                        
                        <span className="arrow">
                          <img 
                            src="img/lighticon/light-22.png" 
                            className="fn__svg"
                            alt="" 
                          />
                        </span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          
            
            <div className="section_right">
              <div className="company_info">
                <img src="img/light-logo.png" alt=""/>
                
                <p className="fn__animated_text">
                  Welcome to the future of automated cryptocurrency 
                  trading. Our platform offers a cutting-edge financial 
                  trading bot to buy and sell cryptocurrencies with 
                  efficiency and security. Simplify your transactions 
                  and maximize your profits with our innovative 
                  technology.
                </p>
                <hr />

                <div className="fn__members">
                  <div className="active item">
                    <span className="circle"></span>
                    <span className="text">1 Online</span>
                  </div>

                  <div className="item">
                    <span className="circle"></span>
                    <span className="text">1 Members</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  
  );
}

export default Home;