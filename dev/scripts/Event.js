import React, { Fragment } from 'react';
import {EventsPage, EventCard} from './Eventspage';

// renders our event as an individual url so we can send this event url to ppl to invite them
export default class Event extends React.Component {
    constructor(props){
        super(props);
        this.state={
            url: '',
            userId: '',
            eName: '',
            eDate: '',
            eDesc: '',
            eHost:'',
            guests: [],
            recipes: [],
            ingredients: []
        };
        this.addUser = this.addUser.bind(this);
    }
    componentDidUpdate() {
        // const Array =[];
        // console.log(Array);
        
    }
    componentDidMount(){
        // refer to our public events path and grab the all objects in the recipes object
        const dbRef = firebase.database().ref(`${this.state.url}`);
        dbRef.on('value', (snapshot) => {
            const e = snapshot.val();
            const recipez = e.recipes;
            const recipes = [];

            for (let recipe in recipez) {
                recipes.push(recipez[recipe]);
            }
            
            // console.log(Array.from(this.props.events));
            
            
            // console.log(recipes);
            
            recipes.map(recipe=>{
                const ingredients = [];
                // console.log(recipe);
                for( let property in recipe){
                    // console.log(property);
                    if (/Ingredient/.test(property)){
                        if(!recipe[property]){
                            delete recipe[property];
                            // console.log(recipe[property])
                            // recipe.ingredients = ingredients.push(recipe[property]);
                        } else{
                            
                            // console.log(recipe[property]);
                            // const newArray= [];
                            ingredients.push(recipe[property]); 
                            
                            recipe.ingredient = ingredients;
                            
                            // console.log(newArray);
                            
                        }
                    }
                }
                // console.log(recipe);
                // recipes.push(recipe);
                { console.log(typeof Array.from(this.props.events)) }
                
            })
            
            
            
            // setstate of what we get from snapshot 
            this.setState({
                eName: e.eventName,
                eDate: e.eventDate,
                eDesc: e.eventDescription,
                recipes,
                eHost: e.eventHost
                // guests : snapshot.val().guests
            })
            // if we have guests then also set guests sas an array
            if(snapshot.val().guests){
                this.setState({
                    guests: snapshot.val().guests 
                })
            }
        })
        
        
    }
    
    // used to just set our /events/url for easy access
    componentWillMount() {
        this.setState({
            url: this.props.match.url,
        });
        // console.log(this.props.events);
    }
    
    // method used to 
    addUser(e) {
        e.preventDefault();
        const guestID = this.props.user.uid;
        console.log(guestID);
        let guestsNew = this.state.guests.slice();
        guestsNew.push(guestID);
        
        this.setState({
            guests: guestsNew
        })
        // set our guest array to firebase in the event
        const dbRef = firebase.database().ref(`${this.state.url}/guests`);
        dbRef.set(guestsNew);
        // console.log(guestsNew)
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
                                {recipe.ingredient.map((ing)=>{
                                   return <li><input type='checkbox'/>{ing}</li>
                                })}
                            </ul>
                        </div>

                        )
                    })}
                <button onClick={this.addUser}>Join the thing!</button>
           </Fragment>
        )
    }

}



