import React from 'react';
import { Nav, Jumbotron, NavbarToggler, Collapse, NavItem, Navbar, NavbarBrand, Button, Modal, ModalHeader, ModalBody, Label, Row, Input, Col } from 'reactstrap';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Control, LocalForm, Errors, Form, actions } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

const RequestForm = (props) => {
    const handleSubmit = async (values) => {
        await props.postRequestForm(values.destination, values.latitude, values.longitude, values.phone, props.history);
        props.resetRequestForm();
    }

    return (
        <div className="container row row-content">
            <div className="col-12 col-md-7 offset-md-2 request_form">
                <Form model="request" onSubmit={(values) => handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="destination" md={4}>Destination Address</Label>
                        <Col md={8}>
                            <Control.text model=".destination" id="destination" name="destination" placeholder="Street, Landmark, City"
                                className="form-control" validators={{ required, minLength: minLength(10), maxLength: maxLength(25) }}
                            ></Control.text>
                            <Errors className="text-danger" model=".destination" show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 10 chars',
                                    maxLength: 'Must be smaller than or equal to 25 chars'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="latitude" md={4}>Destination Latitude</Label>
                        <Col md={8}>
                            <Control.text model=".latitude" id="latitude" name="latitude" placeholder="xx.xxxx"
                                validators={{ required, minLength: minLength(7), maxLength: maxLength(10) }}
                                className="form-control"></Control.text>
                            <Errors
                                className="text-danger"
                                model=".latitude"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 7 chars',
                                    maxLength: 'Must be smaller than or equal to 10 chars'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="longitude" md={4}>Destination Longitude</Label>
                        <Col md={8}>
                            <Control.text model=".longitude" id="longitude" name="longitude"
                                placeholder="yy.yyyy" className="form-control"
                                validators={{ required, minLength: minLength(7), maxLength: maxLength(10) }}
                            ></Control.text>
                            <Errors
                                className="text-danger"
                                model=".longitude"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 7 chars',
                                    maxLength: 'Must be smaller than or equal to 10 chars'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="phone" md={4}>Destination's Contact No.</Label>
                        <Col md={8}>
                            <Control.text model=".phone" id="phone" name="phone"
                                placeholder="Phone number of receiver" className="form-control"
                                validators={{ required, minLength: minLength(10), maxLength: maxLength(10), isNumber }}
                            ></Control.text>
                            <Errors
                                className="text-danger"
                                model=".phone"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 9 numbers',
                                    maxLength: 'Must be smaller than or equal to 10 numbers',
                                    isNumber: 'Must be a number'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{ size: 8, offset: 4 }}>
                            <Button type="submit" className="requestFormButton">
                                Create Request
                                    </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default RequestForm;