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
            eventNames: []
        };
        this.addToEvent = this.addToEvent.bind(this);
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

    // addDrinktoEvent(eventKey) {
    //     const userId = firebase.auth().currentUser.uid;
    //     console.log(userId);
    //     const dbRef = firebase.database().ref(`/users/${userId}/events/${this.props.eventKey}`);

    // }


  addToEvent() {
    // console.log('clicked')
    const eventList = this.props.events;
    console.log(this);
    // const eventNames = []
    // for(let event in eventList){
    //   eventNames.push(eventList[event].eventName);
    // }
    // console.log(eventNames);
    // this.setState({
    //   eventNames
    // });  
  }

    render() {
        return (
           <Fragment>
               <div className="drinkPreview">
                    <button onClick={this.addToEvent}>Add me</button>
                    {/* <div className="addCocktail" ref={ref => this.addCocktail = ref}>
                        {this.state.eventNames.map((event)=> {
                            return <p>{event}</p>
                        })}
                    </div> */}
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