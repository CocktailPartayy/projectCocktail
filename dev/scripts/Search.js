import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import DrinkList from './DrinkList'
import {imgStyle} from './app'

// renders inputs where user can search for ingredients or cocktail names
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
    // changes the state to what the user inputs
    userInput(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // returns a set state of one drinklist based on which input the user searched on, makes axios call based on input
    getDrinksList(e) {
        e.preventDefault();
        // this axios returns a drinklist that includes all the properties we need , name ingredients etct
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
            // this first axios call returns a condensed drink list info, only name, id and thumbnail picture
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${this.state.byIng}`, {
            })
            .then(({ data }) => {
                const drinkIds = data.drinks
                const drinksListz = [];
                // mapped each of the drink arrays we rec
                drinkIds.map(drinkId => {
                    // for each drink id we have, do another axios call that returns a drink list with full details like ingredients and instructions
                    const id = drinkId.idDrink;
                    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`, {
                    }).then(({ data }) => {
                        // push all data into the array variable we made and set state
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
        return (
            <Fragment>
                <div className='search clearfix'>
                    <h1 className='banner'>Search 
                    </h1>
    
                    <div className='wrapper'>
                        <form onSubmit={this.getDrinksList} className=''>
                            <label  htmlFor='byName'>
                                <input type="text" placeholder='Search Cocktail Name' name='name' id='byName' value={this.state.byName} onChange={this.userInput} />
                                <button>search</button>
                            </label>

                            <label htmlFor='byIng'>
                                <input type="text" name='ingredient' placeholder='Search Ingredient' id="byIng" value={this.state.byIng} onChange={this.userInput} />
                                <button>search</button> 
                            </label> 
                        </form>
                    </div>
    
                    {this.state.drinksList ? this.state.drinksList.map(drink=> {
                       return <DrinkList drinks={drink} key={drink.idDrink} drinksList={this.state.drinksList} events={this.props.events}/>
                    }): null}
                </div>
            </Fragment>
        ) 
    }
}

