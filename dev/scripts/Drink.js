import React, { Fragment } from 'react';
import configKey from './config-key';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';



export default class Drink extends React.Component {
    constructor() {
        super();
        this.state={
            id: '',
            userLoc: '',
            LcboAddress: [],
            drinkName: '',
            drinkPic: '',
            drinkIns: '',
            drinkIng: []
        };
        this.userInput = this.userInput.bind(this);
        this.getLocations = this.getLocations.bind(this);
    }

    componentWillMount() {
        this.setState({
            id: this.props.match.params.searchId
        });
    }
    componentDidMount() {
        // this.setState({
        //     drinksList: this.props.drinksList
        // })
        
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.state.id}`, {
        }).then(({data} ) => {
            // console.log(data.drinks[0]);
            const drinkDetails = data.drinks[0];
            const drinkIng = []
            this.setState({
                drinkName: drinkDetails.strDrink,
                drinkPic: drinkDetails.strDrinkThumb,
                drinkIns: drinkDetails.strInstructions
            })
            console.log(drinkDetails)
            for (let property in drinkDetails) {
                if (/Ingredient/.test(property)) {
                    if (drinkDetails[property]) {
                        drinkIng.push(drinkDetails[property]);
                    }
                    this.setState({
                        drinkIng
                    })
                }

            }
        }); 
        
    }
    userInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    getLocations(e) {
        e.preventDefault();
        console.log(this.state.userLoc);
        if (this.state.userLoc !== '') {
            axios.get(configKey.apiURLS, {
                params: {
                    access_key: configKey.apiKey,
                    geo: this.state.userLoc,
                    order: 'distance_in_meters.asc'
                }
            }).then(({ data })=>{
                console.log(data)
                const LcboList = []
                const LcboAddress = data.result;
                for(let i = 0; i < 3; i++){
                LcboList.push(data.result[i].address_line_1)
                }

                this.setState({
                    LcboAddress: LcboList
                })
            })
        }

    }

    render(){
        return (
           <div>
            {/* <Link to={`/search`}>Search</Link> */}
            <h2>{this.state.drinkName}</h2>
            <img src={this.state.drinkPic} alt=""/>
            <p>{this.state.drinkIns}</p>
            <ul>
                {this.state.drinkIng.map(ing=>{
                    return (
                        <li key={`${this.state.id}-${ing}`}>
                            <p>{ing}</p>
                        </li>
                    )
                })}
            </ul>
            <form onSubmit={this.getLocations}> 
            <input placeholder="Your address" id="userLoc" value={this.state.userLoc} onChange={this.userInput} type="text"/>
            <input type="submit" value="Show stores"/>
            </form>
            {this.state.LcboAddress.map(address =>{
                return <p key={address}>{address}</p>
            })}
           </div>
        )
    }
}