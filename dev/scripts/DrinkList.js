// import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';
import Drink from './Drink'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';


import { imgStyle } from './app'


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

        const userId = firebase.auth().currentUser.uid;
        const dbRefz = firebase.database().ref(`/users/${userId}`);
        const dbRef = firebase.database().ref(`/users/${userId}/events/`);
        dbRefz.on('value', (snapshot) => {
            const data = snapshot.val().events
            const eventId = [];
            for (let key in data) {
                data[key].key = key;
                eventId.push(data[key].key);
            }
            this.setState({
                eId: eventId
            })
        })
    }

    addToEvent() {
        this.addToEvents.classList.toggle("show");    
    }

    addDrink(eventKey) {
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`/users/${userId}/events/${eventKey}/recipes`);
        dbRef.push(this.props.drinks)
        .then((data) => {
            const dbRefE = firebase.database().ref(`/events/${eventKey}/recipes`)
            console.log(dbRefE);
            dbRefE.push(this.props.drinks);
})
    }
    render() {
        return (
           <Fragment>
               <div className="drinkPreview">
                    <button onClick={this.addToEvent}>Add me</button>
                    <div>
                        <ul className="addToEvents" ref={ref => this.addToEvents = ref}>
                        {this.props.events.map((event, key)=> {
                                return <li key={event.key}>{event.eventName} <button onClick={() => this.addDrink(event.key)}>Add drink</button></li>
                        })}
                        </ul>
                    </div>
                    <Link to={`/search/${this.props.drinks.idDrink}`}>
                        <DrinkThumb drinkName={this.props.drinks.strDrink} drinkPic={this.props.drinks.strDrinkThumb} key={`DrinkThumb-${this.props.drinks.idDrink}`}/>
                    </Link>
               </div>
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