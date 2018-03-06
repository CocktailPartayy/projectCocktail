import React, { Fragment } from 'react';
import configKey from './config-key';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import DrinkLocations from './DrinkLocations'



export default class Drink extends React.Component {
    constructor() {
        super();
        this.state={
            id: '',
            drinkName: '',
            drinkPic: '',
            drinkIns: '',
            drinkIng: []
        }
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
                            <DrinkLocations ingredient={ing} />
                        </li>
                    )
                })}
            </ul>
           </div>
        )
    }
}