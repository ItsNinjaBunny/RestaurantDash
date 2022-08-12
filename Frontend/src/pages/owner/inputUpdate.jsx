import React, { Component, useCallback } from 'react';

class MyForm extends Component {
    constructor(props) {

        super(props);
        console.log(this.props.item[this.props.index]);
        this.state = {
            username: this.props.item.name,
            qty: this.props.item.qty
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // https://reactjs.org/docs/forms.html#handling-multiple-inputs

    handleSubmit(e) {
        e.preventDefault();




        


        // axios.put('http://localhost:3000/api/user/' + this.props.data, json).then(response => {});
    }
    async handleChange(e, x) {

        let getTextAreaValue = e.target.value;
        if (x == 1) {
           await this.setState({ username: getTextAreaValue });
        } else {
           await this.setState({ qty: getTextAreaValue });
        }
        let obj = {
            name: this.state.username,
            qty: this.state.qty
        }
        this.props.handleStateChange(this.props.item.name, obj);
    }

    render() {
        
        return (
            <form >
                <label>User Name</label>
                <input type="text" value={this.state.username} onChange={(e) => this.handleChange(e, 1)}></input>
                <label>Email address</label>
                <input type="text" value={this.state.qty} onChange={(e) => this.handleChange(e, 0)}></input>

              
            </form>
        );
    }
}

export default MyForm;