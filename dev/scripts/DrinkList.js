import React, { Fragment } from 'react';
// import ReactDOM from 'react-dom';
import Drink from './Drink'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


import { imgStyle } from './app'


export default class DrinkList extends React.Component {
    constructor(){
        super();
        this.state = {
            ingredients: [],
            instructions: ''
        };
    }

    componentDidMount() {
        // console.log(this.props.drinks);
        const drinks = this.props.drinks;
        this.setState({
            instructions: drinks.strInstructions
        })
        const drinkIngredient =[];
        for (let property in drinks) {
            if(/Ingredient/.test(property)) {
                if (drinks[property]) {
                drinkIngredient.push(drinks[property]);
                 }
                 this.setState({
                     ingredients: drinkIngredient
                 })
            }   

        }
    }

    render() {
        return (
           <Fragment>
                <Link to={`/search/${this.props.drinks.idDrink}`}>
                    <DrinkThumb drinkName={this.props.drinks.strDrink} drinkPic={this.props.drinks.strDrinkThumb} key={`DrinkThumb-${this.props.drinks.idDrink}`} />
                </Link>
           </Fragment>
        )
    }
}

const DrinkThumb = (props) => {
    return (
        <div>
            <h2>{props.drinkName}</h2>
            <img style={imgStyle} src={props.drinkPic} alt="" />
        </div>
    )
}