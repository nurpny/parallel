import React from 'react'

export default function Address(props) {
  return (
    <div className='container border rounded bg-light'>

    <div className='row text-left'>
      <div className="col-1">Address: </div>
      <div className="col-6">{props.address}</div>
      <div className="col-1">State:</div>
      <div className="col-1">{props.state}</div>
      <div className="col-1">Zipcode:</div>
      <div className="col-1">{props.zipcode}</div>
    </div>
    </div>

  )
}
