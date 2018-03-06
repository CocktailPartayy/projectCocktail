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

        // this gives us the current  logged in user's uid
        // const userId = firebase.auth().currentUser.uid;
        // // this refers to each user's uid path on firebase
        // const dbRefz = firebase.database().ref(`/users/${userId}`);
        // // retrieving data from firebase
        // dbRefz.on('value', (snapshot) => {
        //     // we took the events and pushed it
        //     const data = snapshot.val().events
        //     const eventId = [];
        //     for (let key in data) {
        //         data[key].key = key;
        //         eventId.push(data[key].key);
        //     }
        //     this.setState({
        //         eId: eventId
        //     })
        // })
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
               <div className="drinkPreview">
                    {/* on click it will show the events you can add to (otherwise it will all show)*/}
                    <button onClick={this.addToEvent}>Add me</button>
                    <div>
                        {/* refered to the addToEvent method */}
                        <ul className="addToEvents" ref={ref => this.addToEvents = ref}>
                        {/* map through the events passed from Search passed originally from app, for each event use the eventkey property as a argument to pass the addDrink function whcich sends what you added to firebase*/}
                        {this.props.events.map((event, key)=> {
                                return <li key={event.key}>{event.eventName} <button onClick={() => this.addDrink(event.key)}>Add drink</button></li>
                        })}
                        </ul>
                    </div>
                    {/* this is for routing, on click of the drinkThumb, itll route us to  the Drink component based on the id  */}
                    <Link to={`/search/${this.props.drinks.idDrink}`}>
                        <DrinkThumb drinkName={this.props.drinks.strDrink} drinkPic={this.props.drinks.strDrinkThumb} key={`DrinkThumb-${this.props.drinks.idDrink}`}/>
                    </Link>
               </div>
           </Fragment>
        )
    }
}

// simple component with props pass down down for just each 
const DrinkThumb = (props) => {
    return (
        <div>
            <h2>{props.drinkName}</h2>
            <img style={imgStyle} src={props.drinkPic} alt="" />
        </div>
    )
}