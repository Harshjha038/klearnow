import './Layout.scss';
import { HamburgerMenu } from 'kn-hamburger-menu-component';
import React, { Component, useState } from 'react';
import MarketplaceConnector from "../redux-connectors/MarketplaceConnector"
import { getCookie, cookieNames } from "../util"
import Login from './Login/index'
import {DRAYAGE_APP} from "KN-Drayage-UI"
import ContainerPortal from "../components/container/"
import DrayageInvoicePortal from "../components/drayageInvoices" 
import { compact } from 'lodash';

function Layout() {

  window._env_.APP_NAME =  "Partner"
  
  // window._env_.REACT_APP_API_URL= "https://api.klearnow.com/dev-cust/v1/events"
  // window._env_.REACT_APP_CHAT_KEY= "368e58ccc62de8c3013d36c5fb9bd3c1d"
  // window._env_.ENVIRONMENT= "dev"
  // window._env_.REACT_APP_LOGIN_URL_CUSTOMER= "https://drayage-dev.klearnow.com/"
  // window._env_.REACT_APP_LOGOUT_URL_CUSTOMER= "https://drayage-dev.klearnow.com"
  // window._env_.KX_K8S_CLUSTER_AWS_REGION= "us-west-2"
  // window._env_.KX_S3_ATTACHMENT_URL= "https://kxr-attachments-public.s3.amazonaws.com"
  // window._env_.REACT_APP_CUSTOMER_STRIPE_KEY= "pk_test_Wx9KxRm5f3qFThN7ODhsvLVJ00KDqbnmGf"
  // window._env_.REACT_APP_SHIPMENT_MEDIA_URL= "https://api.klearnow.com/dev/v1/upload"
  // window._env_.REACT_APP_MEDIA_URL= "https://api.klearnow.com/dev/v1/uploadTo"
  // window._env_.CUSTOMER_MEDIA_BUCKET= "kx-customer-media"
  // window._env_.TRUCKER_MEDIA_BUCKET= "kx-trucker-media-public"
  let kxPartnerToken  = getCookie(cookieNames.KxCommon);

  let displayName = kxPartnerToken  ? "MarketPlace" : "Login"
  // let displayName = "MarketPlace"
 
  const [showHamburgerMenu, setshowHamburgerMenu] = useState(false);
  const [displayPortalName, setDisplayPortalName] = useState(displayName);
  const [invoiceContainer, setInvoiceContainer] = useState('');

  const handlePortal = (data, value) =>{
    data === "DrayageInvoices" && setDisplayPortalName("DrayageInvoices");
    setInvoiceContainer(value)
  }

  return (
    <div>
     {
        displayPortalName !== "Login" &&
        <header className="top_header">
        <img
          src="/images/hbmenu_icon.svg"
          className="hbmenu_icon"
          onClick={() => {
            setshowHamburgerMenu(!showHamburgerMenu);
          }}
        />
        <img src="/images/Logo.png" className="logo" />
        <button
          className="header_button"
          onClick={(e) => {
            setDisplayPortalName("DrayageInvoices");
            setshowHamburgerMenu(false);
          }}
        >
          Invoices
        </button>
        <button
          className="header_button"
          onClick={(e) => {
            setDisplayPortalName("DMODAL");
            setshowHamburgerMenu(false);
            setInvoiceContainer('');
          }}
        >
          My Drayage
        </button>
        <button
          className="header_button"
          onClick={(e) => {
            setDisplayPortalName("MarketPlace");
            setshowHamburgerMenu(false);
            setInvoiceContainer('');
          }}
        >
          MarketPlace
        </button>
        
      </header>
      }
     


      <div>
        <section id="main-page">
          {
            showHamburgerMenu ? <HamburgerMenu /> :
            displayPortalName === "Login" ? <Login type="DRAYAGE_PARTNER_USER" appName={DRAYAGE_APP.KLEARDRAY_PARTNER} /> :
            displayPortalName === "MarketPlace" ? (
              <MarketplaceConnector />
            )
            : displayPortalName === "ContainerCards" ? (
              <div>
                {" "}
                {/* <ShipmentList /> */} 
              </div>
            ) 
            : displayPortalName === "DrayageInvoices" ? (
              <div><DrayageInvoicePortal
              invoiceContainer = {invoiceContainer}/></div>
            )
            : (
              <div><ContainerPortal
              handlePortal = {handlePortal}
              /></div>
            )
          }
        </section>
      </div>

    
    </div>
  );
}


export default Layout;
