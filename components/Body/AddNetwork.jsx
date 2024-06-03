import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import {Footer} from '../index'


const AddNetwork = ({ axios }) => {

  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });


  const [displayImg, setDisplayImg] = useState("");

  const [network, setNetwork] = useState({
    networkName: "",
    rpcUrl: "",
    apiKey: "",
    walletAddress: "",
    privateKey: "",
    image: displayImg,
  });


  const handleFormFieldChange = (fieldName, e) => {
    setNetwork({ ...network, [fieldName]: e.target.value });
  };

  
  const saveNetwork = () => {

    const { networkName, rpcUrl, apiKey, walletAddress, 
      privateKey, image, } = network;

    
    if(
      !networkName || 
      !rpcUrl || 
      !apiKey || 
      !walletAddress || 
      !privateKey || 
      !image 
    ) {
      return notifyError("Please all data");
    }
      
    
    let  networkArray = [];

    
    const networkLists = localStorage.getItem("setNetworks");

    
    if(networkLists) {
      networkArray = JSON.parse(localStorage.getItem("setNetworks"));
      networkArray.push(network);
      localStorage.setItem("setNetworks", JSON.stringify(networkArray));
      notifySuccess("Network added Successfully");
    } else {
      // 
      networkArray.push(network);
      localStorage.setItem("setNetworks", JSON.stringify(networkArray));
      notifySuccess("Network added Successfully");
    }

  };

  
  const uploadToInfura = async (file) => {

    notifySuccess("Uploading file");

    
    if(file){
    
      try {
        
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: "0d42724bba628ee2ecf5",
            pinata_secret_api_key: "55a799f0c3408328a1ea77a5017d5e42329ca46f33613b0678e826fe78f55270",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

        setNetwork({ ...network, image: ImgHash });
        setDisplayImg(ImgHash);

        notifySuccess("Uploaded Successfully");
        
      } catch (error) {
        notifyError("Unable to upload image to pinata");
        console.log(error);
      }
    }
  };

  
  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  });

 
  const {
    getInputProps, 
    getRootProps, 
    isDragAccept, 
    isDragReject, 
    isDragActive,
  } = useDropzone({
    onDrop, 
    maxSize: 500000000000,
  });


  return (
    <div className="techwave_fn_content">
      <div className="techwave_fn_page">
        <div className="techwave_fn_user_settings_page">
          <div className="techwave_fn_pagetitle">
            <h2 className="title">Add Network</h2>
          </div>

          {/**/}
          <div className="container small">
            <div className="techwave_fn_user_settings">
              <form>
                {/**/}
                <div className="user__settings">
                  {/**/}
                  <div className="settings_left">
                    <label htmlFor="input"
                    className="fn__upload">
                      {displayImg == "" ? (
                        <span className="upload_content"
                        {...getRootProps()}>
                          <span className="title">
                            Drag & Drop a Image
                          </span>
                          {/**/}
                          <span className="fn__lined_text">
                            <span className="line"></span>
                            <span className="text">Or</span>
                            <span className="line"></span>
                          </span>
                          {/**/}
                          <span className="title">Browse</span>
                          <span className="desc">
                            Support JPG, JPEG, and PNG
                          </span>
                          {/**/}
                          <input 
                            type="file" 
                            accept="image/*"
                            {...getInputProps()}
                          />
                        </span>
                        
                      ) : (
                        <img 
                          src={displayImg} 
                          className="preview_img"
                          alt="" 
                        />
                      )}
                    </label>
                  </div>
                  

                  {/**/}
                  <div className="settings_right">

                    {/* Network Name */}
                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Network Name
                      </label>
                      {/**/}
                      <div className="input_item">
                        <input 
                          type="text"
                          className="input" 
                          placeholder="NETWORK"
                          onChange={
                            (e) => handleFormFieldChange("networkName", e)
                          }
                        />
                      </div>
                    </div>

                    {/* Provider */}
                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Alchemy Provider
                      </label>
                      {/**/}
                      <div className="input_item">
                        <input 
                          type="text"
                          className="input" 
                          placeholder="RPC URL"
                          onChange={
                            (e) => handleFormFieldChange("rpcUrl", e)
                          }
                        />
                      </div>
                    </div>

                    {/* API Key */}
                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Alchemy API Key
                      </label>
                      {/**/}
                      <div className="input_item">
                        <input 
                          type="text"
                          className="input" 
                          placeholder="API KEY"
                          onChange={
                            (e) => handleFormFieldChange("apiKey", e)
                          }
                        />
                      </div>
                    </div>

                    {/* Wallet Address */}
                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Wallet Address
                      </label>
                      {/**/}
                      <div className="input_item">
                        <input 
                          type="text"
                          className="input" 
                          placeholder="WALLET ADDRESS"
                          onChange={
                            (e) => handleFormFieldChange("walletAddress", e)
                          }
                        />
                      </div>
                    </div>

                    {/* Private Key */}
                    <div className="item">
                      <label htmlFor="name" className="input_label">
                        Private Key
                      </label>
                      {/**/}
                      <div className="input_item">
                        <input 
                          type="text"
                          className="input" 
                          placeholder="PRIVATE KEY"
                          onChange={
                            (e) => handleFormFieldChange("privateKey", e)
                          }
                        />
                      </div>
                    </div>

                    {/* Button Save */}
                    <div className="item">
                      <div>
                        <a 
                          onClick={() => saveNetwork()}
                          className="techwave_fn_button"
                        >Save Network</a>
                      </div>
                    </div>

                  </div>

                </div>
              </form>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddNetwork;