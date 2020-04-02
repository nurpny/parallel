import React, { Component } from 'react'
import axios from 'axios'
import Address from './Address'
/* global google */

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
      fileUpload: "",
    }
    this.autocomplete = null
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handlePlacesSelect = this.handlePlacesSelect.bind(this)

  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handlePlacesSelect)
  }

  handlePlacesSelect() {
    let addressObj = this.autocomplete.getPlace();
    let address = addressObj.address_components;
    console.log(address);
    this.setState({
      address: `${address[0].long_name} ${address[1].long_name} ${address[4].long_name}`,
      state: address[5].short_name,
      zipcode: address[7].short_name,
    })

  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
    console.log("handlechange called", "state now", this.state)

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
    const currentDate = new Date()
    let options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options)
    const [{ value: mo }, , { value: dt }, , { value: yr }] = dateTimeFormat.formatToParts(currentDate)
    const maxDate = `${yr - 18}-${mo}-${dt}`
    const minDate = `${yr - 120}-${mo}-${dt}`


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
              <input className='form-control' type='date' name='dob' required onChange={this.handleChange} min={minDate} max={maxDate} />
            </div>
          </div>
          <div className="form-group row">
            <label className='col-form-label'>Phone Number: </label>
            <div className="col-3">
              <input className='form-control' type='tel' name='phone' required onChange={this.handleChange} pattern="(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}" />
            </div>
            <small className="form-text text-muted"> xxx-xxx-xxxx</small>
          </div>

          <div className="form-group row">
            <label className='col-form-label'>Enter Address: </label>
            <div className="col-10">
              <input className='form-control' type='text' id="autocomplete" required/>
            </div>
          </div>
          <div className='form-group row'>
            <Address address = {this.state.address} state  = {this.state.state} zipcode = {this.state.zipcode} />
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
