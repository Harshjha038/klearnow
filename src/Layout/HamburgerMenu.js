import './Layout.scss';
import React from 'react';


function Layout() {
  return (
    <div className="hamburger_menu">
        <div className="hamburger_menu_top">
            <div className="user_initials">AB</div>
            <p className="username">Lorem Ipsum</p>
            <p className="useremail">lifestyle@klearexpress.us</p>
            
        </div>

        <div className="hamburger_menu_menu">
            <h3>Profile</h3>
            <a href="">Test 1</a>
            <a href="">Test 1</a>
            <a href="">Test 1</a>

            <h3>Profile</h3>
            <a href="">Test 1</a>
            <a href="">Test 1</a>
            <a href="">Test 1</a>

        </div>
    </div>
  );
}


export default Layout;
