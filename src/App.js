import './App.css';

import React, { Component } from 'react';
import FormInput from './components/FormInput';
import validator from './address_validator/validator'

class App extends Component {

  constructor() {
    super()
    this.state = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",

      addressError: "",
      cityError: "",
      stateError: "",
      zipError: "",

      successMessage: ""
    }
  }

  updateForm = (field, value) => this.setState({ [field]: value })

  _validateAddress = () => {
    validator.validate(this.state).then(result => {
      const validationResults = result.data
      console.log(validationResults)

      this.setState({ addressError: "", cityError: "", stateError: "", zipError: "", successMessage: "" }, () => {

        if (validationResults.result && validationResults.success) {
          return this.setState({ successMessage: "ברוך השם, the address looks good." })
        }

        Object.keys(validationResults).forEach(field => { this.setState({ [field]: validationResults[field] }) })
      })
    })
  }

  render() {
    return (
      <div id="app">
        <div className="form">
          <FormInput updateForm={this.updateForm}
            field={"address1"}
            label={"Address 1"}
            value={this.state.address1}
            errorMessage={this.state.addressError}></FormInput>
          <FormInput updateForm={this.updateForm}
            field={"address2"}
            label={"Address 2"}
            value={this.state.address2}></FormInput>
          <FormInput updateForm={this.updateForm}
            field={"city"}
            label={"City"}
            value={this.state.city}
            errorMessage={this.state.cityError}></FormInput>
          <FormInput updateForm={this.updateForm}
            field={"state"}
            label={"State"}
            value={this.state.state}
            errorMessage={this.state.stateError}></FormInput>
          <FormInput updateForm={this.updateForm}
            field={"zip"}
            label={"Zip Code"}
            value={this.state.zip} isZip={true}
            errorMessage={this.state.zipError}></FormInput>

          {this.state.successMessage ? <div className="success-message">{this.state.successMessage}</div> : null}
          <div id="submit" onClick={this._validateAddress}>Submit</div>
        </div>
      </div>
    );
  }
}

export default App;