import React, { Component } from 'react'
import Form from './common/form';
import Joi from 'joi-browser'

class RegisterForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    doSubmit = () => {
        console.log('Submitted')
    }

    render() {
        return (
            <div className="">
                <h1>Register</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>

        );
    }
}

export default RegisterForm;