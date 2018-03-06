import React, { Fragment } from 'react';
import {EventsPage, EventCard} from './Eventspage';


export default class Event extends React.Component {
    constructor(props){
        super(props);
        this.state={
            url: '',
            userId: '',
            eName: '',
            eDate: '',
            eDesc: '',
            guests: [],
            recipes: [],
            ingredients: []
        };
        // this.handleClick = this.handleClick.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    componentDidMount(){
        
        // const dbRef = firebase.database().ref(``)
        // const userId = firebase.auth().currentUser.uid;
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


            this.setState({
                eName: e.eventName,
                eDate: e.eventDate,
                eDesc: e.eventDescription,
                recipes
                // guests : snapshot.val().guests
            })

            if(snapshot.val().guests){
                this.setState({
                guests: snapshot.val().guests 
                })
            }
        })

  
    }
    
    componentWillMount() {
        this.setState({
            url: this.props.match.url,
            // userId: this.props.user.uid
        });
    }
    
    addUser(e) {
        e.preventDefault();
        const guestID = this.props.user.displayName;
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
    

    render(){
        return (
           <Fragment>
                <h2>{this.state.eName}</h2>
                <p>{this.state.eDate}</p>
                <p>{this.state.eDesc}</p>
                {this.state.recipes.map((recipe, key) => {
                    return (
                        <div className="eventRecipeCard" key={key}>
                            <h3>{recipe.strDrink}</h3>
                            <ul>
                                <li>{}</li>
                            </ul>
                        </div>
                        )
                    })}
                <button onClick={this.addUser}>Join the thing!</button>
           </Fragment>
        )
    }

}


// question about retrieving uid data in a routed componnent, white tables
