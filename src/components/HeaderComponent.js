import React, { Component } from 'react';
import { Nav, Jumbotron, NavbarToggler, Collapse, NavItem, Navbar, NavbarBrand, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, Label, Row, Input, Col } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
// import { Control, LocalForm, Errors, Form, actions } from 'react-redux-form';
import ReactStars from "react-rating-stars-component";



class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            // isNavSignUp: false,
            // isModalSignUpOpen: false,
            // role: 'consumer'
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRating = this.handleRating.bind(this);
    //     this.handleLogin = this.handleLogin.bind(this);
    //     this.toggleNavSignUp = this.toggleNavSignUp.bind(this);
    //     this.toggleModalSignUpOpen = this.toggleModalSignUpOpen.bind(this);
    //     this.handleSignUp = this.handleSignUp.bind(this);
    //     this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    // handleRoleChange = (event) => {
    //     this.setState({ role: event.target.value })
    // }

    // handleLogin = async (values) => {
    //     this.toggleModal();

    //     // event.preventDefault();
    //     await this.props.postLogin(values.email, values.password);
    //     // alert("email: " + values.email
    //     //     + " Password: " + values.password +
    //     //     " Remember: " + values.remember);
    //     if (!values.remember) {
    //         this.props.resetLoginForm();
    //     }
    // }

    handleRating = async (value) => {
        console.log("inside handleRating");
        if(this.props.unratedRequests.requests.length !== 0){
            await this.props.postRating(this.props.unratedRequests.requests[0].id, value, "Awesome", this.props.history);
        }        
        this.toggleModal();      
        this.props.history.push('/home');
    }

    handleDefaultRating = async () => {
        console.log("inside handleRating");
        if(this.props.unratedRequests.requests.length !== 0){
            await this.props.postRating(this.props.unratedRequests.requests[0].id, 1, "Awesome", this.props.history);
        }        
        this.toggleModal();      
        this.props.history.push('/home');
    }

    toggleNav = () => this.setState(
        { isNavOpen: !this.state.isNavOpen });

    toggleModal = () => this.setState(
        { isModalOpen: false });

    // handleSignUp = async (values) => {
    //     this.toggleModalSignUpOpen();
    //     await this.props.postSignUp(values.email, values.phone, values.password, values.location, this.state.role);
    //     // alert("Email: " + values.email
    //     //     + " Phone: " + values.phone+ " Role: " + this.state.role);
    //     this.props.resetSignUpForm();
    // }

    // toggleNavSignUp = () => this.setState(
    //     { isNavSignUp: !this.state.isNavSignUp });

    // toggleModalSignUpOpen = () => this.setState(
    //     { isModalSignUpOpen: !this.state.isModalSignUpOpen });

    ratingView = (value) => {
        console.log(value);
    }

    
    static getDerivedStateFromProps(props, state) {
        if(props.unratedRequests.requests.length !== 0 && !state.isModalOpen){
            console.log("length of requests is greater than one");
            return {isModalOpen: true};
        }
        return null;
        // return {favoritecolor: props.favcol };
    }
    
    render() {
        var button;
        if (!this.props.isLoggedIn.isLoggedIn) {
            // console.log(this.props.isLoggedIn.isLoggedIn);
            button = <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className="nav-link" to="/login"  style={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}
                        activeStyle={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}>
                        <span className="fa fa-sign-in fa-lg"></span>{' '}Login
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-link" to="/signup" style={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}
                        activeStyle={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}>
                        <span className="fa fa-user-plus fa-lg"></span>{' '}Sign Up
                    </NavLink>
                </NavItem>
            </Nav>;
            
        }
        else {
            // console.log(this.props.isLoggedIn.isLoggedIn);
            button = <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/pendingrequests" className="nav-link" style={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}
                        activeStyle={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}>
                        Pending Requests
                    </NavLink>
                    </NavItem>
                <NavItem><NavLink to="/home" className="nav-link" onClick={this.props.signOut} style={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}
                    activeStyle={{ color: 'rgb(3, 233, 233)', textDecoration: 'none' }}>
                    Sign Out{' '}<span className="fa fa-sign-out fa-lg"></span>
                </NavLink></NavItem>
            </Nav>;

            //State should not the changed inside render function *****IMPORTANT*****
            // if(this.props.unratedRequests.requests.length !== 0 && !this.state.isModalOpen){
            //     console.log("length of requests is greater than one");
            //     this.setState({isModalOpen: true});
            // }
        }
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/logo.png" height="45rem" width="110rem" alt="Dothraki Delivery" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>

                            {button}

                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <div className="jumbotext">
                                    <h1>Dothraki Delivery</h1>
                                    <p>Wanna send goods to your loved ones, but cannot go personally? We got you covered!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                {/* {unratedRequests} */}
                 <Modal isOpen={this.state.isModalOpen} toggle={this.handleDefaultRating}>
                    <ModalHeader toggle={this.handleDefaultRating}>How was your experience with us?</ModalHeader>
                    <ModalBody>
                    <ReactStars
                count={5}
                onChange={this.handleRating}
                size={24}
                activeColor="#ffd700"
            />
                            {/* <Row className="form-group">
                                <Col md={{ size: 7, offset: 5 }}>
                                    <Button type="submit" color="primary" >
                                        Login
                                    </Button>
                                </Col>
                            </Row> */}
                    </ModalBody>
                </Modal>
                {/*<Modal isOpen={this.state.isModalSignUpOpen} toggle={this.toggleModalSignUpOpen}>
                    <ModalHeader toggle={this.toggleModalSignUpOpen}>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form model="signup" onSubmit={(values) => this.handleSignUp(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>Full Name</Label>
                                <Col md={8}>
                                    <Control.text model=".name" type="text" id="name" name="name" placeholder="Full Name"
                                        className="form-control" validators={{ required }} />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }} /></Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={4}>E-mail</Label>
                                <Col md={8}>
                                    <Control.text model=".email" type="email" id="email" name="email" placeholder="Email Id"
                                        className="form-control" validators={{ required, validEmail }} />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validEmail: 'Must be a valid email'
                                        }}
                                    /></Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phone" md={4}>Phone</Label>
                                <Col md={8}>
                                    <Control.text model=".phone" type="tel" id="phone" name="phone" placeholder="Phone Number"
                                        className="form-control" validators={{ required, validPhone, isNumber }} />
                                    <Errors
                                        className="text-danger"
                                        model=".phone"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validPhone: 'Must be a valid phone',
                                            isNumber: 'Must be a number'
                                        }}
                                    /></Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="password" md={4}>Password</Label>
                                <Col md={8}>
                                    <Control.text model=".password" type="password" id="password" name="password" placeholder="Password"
                                        className="form-control" validators={{ required, validPassword }} />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            validPassword: 'Password must have more than 7 characters'
                                        }}
                                    /></Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="location" md={4}>Current Location</Label>
                                <Col md={8}>
                                    <Control.text model=".location" type="text" id="location" name="location" placeholder="Current Location"
                                        className="form-control" validators={{ required }} />
                                    <Errors
                                        className="text-danger"
                                        model=".location"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }} /></Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="role" md={4}>Role</Label>
                                <Col md={4}>
                                    <Control.select model=".role" value={this.state.role} name="role" className="form-control" onChange={this.handleRoleChange}>
                                        <option value="consumer">Consumer</option>
                                        <option value="agent">Agent</option>
                                    </Control.select></Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 7, offset: 5 }}>
                                    <Button type="submit" color="primary">
                                        Sign Up
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal> */}
            </>
        )
    }
}

export default Header;