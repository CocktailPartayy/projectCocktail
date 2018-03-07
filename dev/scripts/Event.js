import React, { Fragment } from 'react';
import { EventsPage, EventCard } from './Eventspage';


export default class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            userId: '',
            eName: '',
            eDate: '',
            eDesc: '',
            eHost: '',
            guests: [],
            recipes: [],
            ingredients: []
        };
        this.addUser = this.addUser.bind(this);
    }
    componentDidMount() {
        const dbRef = firebase.database().ref(`${this.state.url}`);
        dbRef.on('value', (snapshot) => {
            const e = snapshot.val();
            const data = e.recipes;
            const recipes = [];
            for (let key in data) {
                recipes.push(data[key]);
            }

            console.log(recipes);
            const ingredients = [];

            recipes.map(recipe => {
                const ingredients = [];
                for (let property in recipe) {
                    if (/Ingredient/.test(property)) {
                        if (!recipe[property]) {
                            delete recipe[property];
                        } else {
                            ingredients.push(recipe[property]);

                            recipe.ingredient = ingredients;
                        }
                    }
                }

            })


            this.setState({
                eName: e.eventName,
                eDate: e.eventDate,
                eDesc: e.eventDescription,
                eHost: e.eventHost,
                recipes
            })

            if (snapshot.val().guests) {
                this.setState({
                    guests: snapshot.val().guests
                })
            }
        })


    }

    componentWillMount() {
        this.setState({
            url: this.props.match.url,
        });
    }

    addUser(e) {
        e.preventDefault();
        const guestID = this.props.user.uid;
        console.log(guestID);
        let guestsNew = this.state.guests.slice();
        guestsNew.push(guestID);


        this.setState({
            guests: guestsNew
        })
        const dbRef = firebase.database().ref(`${this.state.url}/guests`);
        dbRef.set(guestsNew);
        console.log(guestsNew)
    }


    render() {
        return (
            <Fragment>
                <div className="wrapper event clearfix">
                    
                    <h2>{this.state.eName}</h2>
                    <p>{this.state.eDate}</p>
                    <p>{this.state.eDesc}</p>
                    {this.state.recipes.map((recipe, key) => {
                        return (
                            <div className="eventRecipeCard" key={key}>
                                <h3>{recipe.strDrink}</h3>
                                <ul>
                                    {recipe.ingredient.map((ing) => {
                                        return <li><input type='checkbox' />{ing}</li>
                                    })}
                                </ul>
                            </div>
    
                        )
                    })}
                    {this.state.guests.includes(this.props.user.uid) || firebase.auth().currentUser.uid == this.state.eHost ? null :
                        <button onClick={this.addUser}>Join the thing!</button>}
                </div>
            </Fragment>
        )
    }
}