import React, { Fragment } from 'react';
import axios from 'axios';
import configKey from './config-key';



export default class DrinkLocations extends React.Component{
    constructor(){
        super();
        this.state={
            address: '',
            productID: '',
            LcboAddress: ''
        }
        this.addressInput = this.addressInput.bind(this);
        this.showAddress = this.showAddress.bind(this);
        
    }

    addressInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    componentWillMount() {
        axios.get(configKey.apiURLP, {
            params: {
                access_key: configKey.apiKey,
                // order: id.asc,
                // where_not: is_dead,
                // product_id: this.state.productID,
                q: this.props.ingredient,
                // order: 'regular_price_in_cents.asc'
            }
        }).then(({ data }) => {
            // const lcbo = data.result[0].address_line_1;
            // console.log(data.result[0].id);
            if(data.result[0]) {
                this.setState({
                    productID: data.result[0].id
                })
            } else {
                this.setState({
                    productID: ''
                })
            }
        })
    }

    showAddress(e) {
        e.preventDefault();
            if(this.state.productID !== '') {
                axios.get(configKey.apiURLS, {
                    params: {
                        access_key: configKey.apiKey,
                        // order: id.asc,
                        // where_not: is_dead,
                        product_id: this.state.productID,
                        geo: this.state.address,
                        order: 'distance_in_meters.asc'
                    }
                }).then(({ data }) => {
                const LcboAddress = data.result[0].address_line_1;
                // console.log(data.resul);

                this.setState({
                    LcboAddress
                })
            })
        }
    }

    render(){
        return (
            <Fragment>
                <form onSubmit={this.showAddress}>
                    <input type="text" name='ingredient' id="address" value={this.state.address} onChange={this.addressInput} />
                    <input type="submit" name="" id=""/>
                    <p>{this.state.LcboAddress}</p>
                </form>                      

            </Fragment>
        )
    }
}