// import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';
import Drink from './Drink'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


import { imgStyle } from './app'

// this is passed in Drink.js, renders component drink thumb, what was passed down was individual drink objects, drinklist array and events
// this component returns a list of drinks based on query and has an add to event butt
export default class DrinkList extends React.Component {
    constructor(){
        super();
        this.state = {
            ingredients: [],
            instructions: '',
            recipes: []
        };
        this.addToEvent = this.addToEvent.bind(this);
        this.addDrink = this.addDrink.bind(this);
    }

    componentDidMount() {
        // setting states based on what was passed from Drink
        const drinks = this.props.drinks;
        this.setState({
            instructions: drinks.strInstructions
        })

        const drinkIngredient =[];
        // doing a for in look through each drink object  for each proj
        for (let property in drinks) {
            // if statement, IF the property matches the string "Ingredient"
            if(/Ingredient/.test(property)) {
                // if that value is not null or "" then push it to drinkIngredientz array
                if (drinks[property]) {
                drinkIngredient.push(drinks[property]);
                 }
                 this.setState({
                     ingredients: drinkIngredient
                 })
            }   
        }
    }

    addDrink(eventKey) {
        // refer to each user's events and add a recipes path, it takes in paramter of the eventkey , push the current drink object into the recipes path
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`/users/${userId}/events/${eventKey}/recipes`);
        dbRef.push(this.props.drinks)
        .then((data) => {
            // then also push it to the corresponding event in the event path
            const dbRefE = firebase.database().ref(`/events/${eventKey}/recipes`)
            dbRefE.push(this.props.drinks);
        })
    }

    // this function is to toggle show and hide on click, it will refer to the tag with the class of addToEvent to show or hid
    addToEvent() {
        this.addToEvents.classList.toggle("show");    
    }


    render() {
        return (
           <Fragment>
               <div className="wrapper">
                    {/* on click it will show the events you can add to (otherwise it will all show)*/}
                    <div className='drink-preview'>
                        {/* this is for routing, on click of the drinkThumb, itll route us to  the Drink component based on the id  */}
                        <Link className='drink-link' to={`/search/${this.props.drinks.idDrink}`}>
                            <DrinkThumb drinkName={this.props.drinks.strDrink} drinkPic={this.props.drinks.strDrinkThumb} key={`DrinkThumb-${this.props.drinks.idDrink}`}/>
                        </Link>
                        <div className='add-me-div'>
                        <button  className='add-me' onClick={this.addToEvent}>+</button>
                            {/* refered to the addToEvent method */}
                            <ul className="addToEvents" ref={ref => this.addToEvents = ref}>
                            {/* map through the events passed from Search passed originally from app, for each event use the eventkey property as a argument to pass the addDrink function whcich sends what you added to firebase*/}
                            {this.props.events.map((event, key)=> {
                                    return <li key={event.key}> <button onClick={() => this.addDrink(event.key)}>{event.eventName}</button></li>
                            })}
                            </ul>
                        </div>
                    </div>
               </div>
           </Fragment>
        )
    }
}

// simple component with props pass down down for just each 
const DrinkThumb = (props) => {
    return (
        <Fragment>
            <h2>{props.drinkName}</h2>
            <div className="drink-pic"><img style={imgStyle} src={props.drinkPic} alt="" /></div>
        </Fragment>
    )
}