import React, { Component } from 'react';

class FormInput extends Component {

    constructor(props) {
        super(props)
        this.isZip = props.isZip
    }

    handleChange = e => this.props.updateForm(this.props.field, e.target.value)

    render() {
        return (
            <div className="form-input">
                <label>{this.props.label}</label>
                <br />
                <input
                    value={this.props.value}
                    type={this.isZip ? "number" : "text"}
                    onChange={this.handleChange}></input>
                <br />
                <label className="error-message">{this.props.errorMessage || null}</label>
            </div>
        );
    }
}

export default FormInput;