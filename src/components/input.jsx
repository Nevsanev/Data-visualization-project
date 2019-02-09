import React, { Component } from 'react';
import './input.css';

class Input extends Component {
    render() { 
        return (  
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div id="form">
                                <div className="form-group">
                                    <label>Date</label>
                                    <input onChange={this.props.onChangeDate} className="form-control" placeholder="Enter date" />
                                    <small className="form-text text-muted">Please enter date in form year-month(e.g. 2013-10)</small>
                                </div>
                                <div className="form-group">
                                    <label>Number</label>
                                    <input onChange={this.props.onChangeNum} className="form-control" placeholder="Enter number" />
                                </div>
                                <button onClick={this.props.onAppend} className="btn btn-primary">Append</button>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
        );
    }
}
 
export default Input;