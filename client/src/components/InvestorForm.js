import React, { Component } from 'react'
import axios from 'axios'

const states = ["AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
const url = "http://localhost:8000/api/investors"

export default class InvestorForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      address: "",
      state: "",
      zipcode: "",
      phone: "",
      fileUpload: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleFileChange(evt) {
    this.setState({ fileUpload: evt.target.files[0] })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      const investorForm = new FormData();
      for (let key in this.state) {
        if (key !== "fileUpload") {
          investorForm.append(key, this.state[key])
        }
      }
      if (this.state.fileUpload !== "") {
        investorForm.append("fileUpload", this.state.fileUpload)
      }
      const { data } = await axios.post(url, investorForm)
      alert("Form submitted")
    } catch (err) {
      console.error(err)
      alert("There was a problem with your submission")
    }

  }

  render() {
    return (
      <div>
        <h2>Investor Form</h2>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className='col-form-label'>First Name: </label>
            <div className="col-3">
              <input className='form-control' type='text' name='firstName' required onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-form-label'>Last Name: </label>
            <div className="col-3">
              <input className='form-control' type='text' name='lastName' required onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-form-label'>Date of Birth: </label>
            <div className="col-3">
              <input className='form-control' type='date' name='dob' required onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-form-label'>Phone Number: </label>
            <div className="col-3">
              <input className='form-control' type='tel' name='phone' required onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-form-label'>Address: </label>

            <input className='col-form-lg' type='text' name='address' required onChange={this.handleChange} />

            <label className='col-form-label'>State: </label>
            <select className="col-form-sm" name="state" id="state" onChange={this.handleChange}>
              {states.map((state, idx) => <option key={idx}>{state}</option>)}
            </select>
            <label className='col-form-label'>Zipcode: </label>
            <input className='col-form-sm' type='text' name='zipcode' required onChange={this.handleChange} />
          </div>

          <div className='form-group row custom-file mb-4'>
            <label className='custom-file-label' htmlFor='customFile'>Upload files: </label>
            <input type='file' className='custom-file-input col-sm' id='customFile' onChange={this.handleFileChange} />
          </div>

          <button type='submit' className="btn btn-primary">Submit</button>

        </form>

      </div>
    )
  }
}
