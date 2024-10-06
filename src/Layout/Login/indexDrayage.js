import React, { Component } from "react";
import "./css/login.css";
import { get } from "lodash";
import {login} from "../../components/container/api/index";
import { Button, Segment, Loader, Form, Header, Checkbox, Select, Label, Icon, Image } from "semantic-ui-react";
import {Link} from 'react-router-dom'
import { Input, FreeForm, FormRow } from "kx-common-components";
import 'semantic-ui-css/semantic.min.css';


class LoginDrayage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            toNextPage: false,
            username: "",
            password: "",
            rememberMe: "",
            usernameError: false,
            passwordError: false,
            showPopup: false,
            error: false,
            loading: false,
        };
    }

   

    componentWillMount = () => {
        this.setState({
            tokenUrl: window.location.hostname === "localhost" ? "localhost:3000" : "klearexpress.com",
        });
    };

    componentDidMount = () => {
        const form = document.getElementById("login-form");

        form.addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                document.getElementById("login-button").click();
            }
        });
    };

    togglePopup() {
        const { username } = this.state;
        this.setState({
            showPopup: !this.state.showPopup,
            username,
        });
    }

    getCookieValue = (name) => {
        var b = document.cookie.match("(^|;)\\s*" + "kxCustomerToken" + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    };


    handleChange = (name, e) => {
        this.setState({ [name]: e });
    }

    handleSubmit = (e) => {
        console.log("HAMBURGER MENU ....")
        e.preventDefault();
        this.setState({ loading: true })

        const { email, password } = this.state;

        let typeOfUser = this.props.type === "DRAYAGE_PARTNER_USER" 
        ? "DRAYAGE_PARTNER_USER" 
            : "SALES_USER" 
                ? "SALES_USER"
                    : "Customer"

        

        login(email, password, typeOfUser)
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                // console.log("responseData", responseData);
                if (responseData.code) {
                    document.getElementById("loginError").innerHTML = `<br /><center> ${responseData.msg} </center>`;
                    this.setState({ error: true, loading: false });
                } else {
                    document.getElementById("loginError").innerHTML = '';
                    this.setState({ loading: false });
                    let token = get(responseData, "eventMessage.user.kxToken", "");
                    let domain = window.location.hostname;
                    const d = new Date();
                    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
                    const expires = `expires=${d.toUTCString()}`;
                    let tokenName = this.getTokenName(typeOfUser)
                    document.cookie = `${tokenName}=${token};${expires};domain=${domain};path=/`;
                    if (document.cookie !== '') window.location.reload();
                    return true;
                }
            })
            .then((res) => {
                if (res) {
                    this.setState({ toNextPage: true });
                }
            })
            .catch((err) => {
                document.getElementById("loginError").innerHTML = "<br /><center> An error occurred. Please contact your KlearNow CSM if the issue persists.</center>";
                console.log("ERROR:", err);
                this.setState({ loading: false });
            });
    }

    getTokenName = (typeOfUser) => {
        console.trace("Type Of User :: getTokenName",typeOfUser)
        switch(typeOfUser) {
          case "DRAYAGE_PARTNER_USER" :
            return "kxPartnerToken"
          case "SALES_USER" :
            return "kxSalesToken"
          case "Customer" :
            return "kxCustomerToken"  
        }
    }    

    render() {

        let setImage = this.props.type === "DRAYAGE_PARTNER_USER" ? "images/Login_page.png" : "";
        
        return (
            <div className="mainContainer">
                <div className="flex-container">
                    <div className="top-content">
                        <Segment padded="very" className="login-container">
                            <p className="login-header">Log in to your account.</p>
                            <div id="login-form" className="login-form">
                                <FreeForm>
                                    <FormRow style={{ display: "flex" }}>
                                        <Input
                                            id="login-email"
                                            onChange={(e) => this.handleChange("email", e)}
                                            label={"EMAIL"}
                                            value={this.state.email}
                                            singleElement
                                            topElement
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <Input
                                            id="login-password"
                                            onChange={(e) => this.handleChange("password", e)}
                                            label={"PASSWORD"}
                                            value={this.state.password}
                                            singleElement
                                            password
                                            bottomElement
                                        />
                                    </FormRow>
                                </FreeForm>

                                <Button disabled={!this.state.email || !this.state.password || this.state.loading} onClick={this.handleSubmit} className="login-button">
                                        {this.state.loading ? <Loader active inline='centered' size='small'/> : "LOG IN"}
                                    </Button>
                                
                                <div id="loginError"></div>

                                <center>
                                    <p className="forgotLogin">
                                        <Link to="/forgot-password">Forgot Password?</Link>
                                    </p>
                                </center>
                            </div>
                        </Segment>

                        <div className="rs-container">
                            <div>
                                <div className="rs-hero">
                                    <div>
                                        <img src='images/Logo.png' className="loginLogo" />
                                        <span className="loginLogoDrayage">DRAYAGE</span>
                                    </div>
                                    <img src={setImage} className="ui image rs-bg" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-wrapper" style={{ "color": "white", "marginTop": "25px" }}>
                        <p>
                            <span className="companyName">
                                <strong>KlearNow Corp.</strong>
                            </span>
                            &nbsp; &nbsp;| &nbsp; &nbsp;
                            <Link to="/view-terms" style={{ "color": "white", "margin-top": "25px" }}>Terms</Link>
                            &nbsp; &nbsp; | &nbsp; &nbsp;
                            <Link to="/privacy" style={{ "color": "white", "margin-top": "25px" }}>Privacy</Link>
                            &nbsp; &nbsp;
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


export default LoginDrayage;
