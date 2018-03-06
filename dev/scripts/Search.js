import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import DrinkList from './DrinkList'
import {imgStyle} from './app'

export default class Search extends React.Component {
    constructor() {
        super();
        this.state={
            byName: '',
            byIng: '',
            drinksList: []
        };
        this.userInput = this.userInput.bind(this);
        this.getDrinksList = this.getDrinksList.bind(this);
        
    }

    userInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    getDrinksList(e) {
        e.preventDefault();
        if (this.state.byName !== '') {
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.byName}`, {
            }).then(({ data }) => {
                this.setState({
                byName: '',
                drinksList: data.drinks
                })
            })
        }
        else if (this.state.byIng !== '') {
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.byIng}`, {
            })
            .then(({ data }) => {
                // console.log(data.drinks);
                const drinkIds = data.drinks
                const drinksListz = [];
                drinkIds.map(drinkId => {
                    // console.log(drinkId.idDrink);
                    const id = drinkId.idDrink;
                    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, {
                    }).then(({ data }) => {
                        drinksListz.push(data.drinks[0]);
                        this.setState({
                            byIng: '',
                            drinksList: drinksListz
                        })
                    }); 
                });
            })
        }

    }
    
    render() {
        console.log('searrr')
        return (
            <Fragment>
                <form onSubmit={this.getDrinksList}>
                    <label htmlFor="ByName">Search by Name</label>
                    <input type="text" name='name' id='byName' value={this.state.byName} onChange={this.userInput} />
                    <button>submit</button>
                </form>
                <form onSubmit={this.getDrinksList}>
                    <label htmlFor="ByIng">Search by Ingredient</label>
                    <input type="text" name='ingredient' id="byIng" value={this.state.byIng} onChange={this.userInput} />      
                    <button>submit</button>    
                </form>  

                {this.state.drinksList ? this.state.drinksList.map(drink=> {
                   return <DrinkList drinks={drink} key={drink.idDrink} drinksList={this.state.drinksList} events={this.props.events}/>
                }): null}
            </Fragment>
        ) 
    }
}

