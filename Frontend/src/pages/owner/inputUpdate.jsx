import React, { Component, useCallback } from 'react';

class MyForm extends Component {
    constructor(props) {

        super(props);
        console.log(this.props.item);
        this.state = {
            username: this.props.item.name,
            quantity: this.props.item.stock
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
           await this.setState({ quantity: getTextAreaValue });
        }
        let obj = {
            name: this.state.username,
            stock: this.state.quantity*1
        }
        this.props.handleStateChange(this.props.item.name, obj);
    }

    render() {
        
        return (
            <form>
               <div id="finalLabel">
               <p id="label">{this.state.username}</p>
               
               <input type="text" value={this.state.quantity} onChange={(e) => this.handleChange(e, 0)}></input>

               </div>
              
              
            </form>
        );
    }
}

export default MyForm;