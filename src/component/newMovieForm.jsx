import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser'

class NewMovieForm extends Form {
    state = {
        data: {
            title: '',
            number: '',
            rate: ''
        },
        errors: {}
    }

    schema = {
        title: Joi.string().required().label('Title'),
        number: Joi.number().required().min(0).label('Number in Stock'),
        rate: Joi.number().required().min(0).max(10).label('Rate')
    }

    doSubmit = () => {
        console.log('Submitted')
    }

    render() {
        return (
            <div className="">
                <h1>Movie Form</h1>
                <form action="" onSubmit={this.handleSubmit}>
                    {this.renderInput("title", "Title")}
                    {this.renderInput("number", "Number in Stock")}
                    {this.renderInput("rate", "Rate")}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}

export default NewMovieForm;