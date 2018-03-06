import React, { Fragment } from 'react'; 
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Event from './Event';


// renders a list of events the user has created
class EventsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            eventName: '',
            eventDate: '',
            eventDescription: '',
            eventHost: ''
            // users: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid;        
        firebase.auth().onAuthStateChanged((user) => {
        // if we have a user response then retreive our user specific events from firebase and set as state
        if (user) {
            const dbRef = firebase.database().ref(`/users/${user.uid}/events`);
            dbRef.on('value', (data) => {
            const eventsArray = [];
            const eventdata = data.val();
            // use a for in loop to also use the key returned from firebase and add it as a property on individual event objects
            for (let eventKey in eventdata) {
                eventdata[eventKey].key = eventKey;
                // push the whole thing into an array and set as events array state
                eventsArray.push(eventdata[eventKey])
            }
            this.setState({
                events: eventsArray,
                eventHost: userId
            });
            });
        } 
        });
    }

    // set state based on user input
    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    // method passed when we submit the form
    addEvent(e) {
        const userId = firebase.auth().currentUser.uid;
        e.preventDefault();
        // compile our event input information into an object
        const events = {
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            eventDescription: this.state.eventDescription,
            eventHost: this.state.eventHost
        }

        const dbRef = firebase.database().ref(`users/${userId}/events`)
        // push to our user specific event path
        dbRef.push(events)
        // AT THE SAME TIME, .push returns a promise including the key firebase has so we took that exact key and UPDATED our event onto the public events path
        .then((data)=>{
            const dbRefE = firebase.database().ref(`/events/${data.ref.key}`)
            console.log(dbRefE);
            dbRefE.update(events);
        })
        this.setState({
            eventDate: '',
            eventDescription: ''
        })
    }

    // used to remove event pass in event key as argumennt, just kinda removes it from firebase and since our evennt page is rendered from what we grab on firebase it will update
    removeEvent(eventKey) {
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`/users/${userId}/events/${eventKey}`);
        dbRef.remove();
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.addEvent}>
                    <h2>Let's Create An Event</h2>
                    <label htmlFor="eventName">Event Name:</label>
                    <input type="text" onChange={this.handleChange} id="eventName" placeholder="Enter Name" value={this.state.eventName}/>
    
                    <label htmlFor="eventDate">Event Date:</label>
                    <input type="date" onChange={this.handleChange} id="eventDate" value={this.state.eventDate} />

                    <label htmlFor="eventDescription">Description:</label>
                    <textarea name="eventDescription" value={this.state.eventDescription} id="eventDescription" cols="10" rows="5" onChange={this.handleChange} placeholder="Details"></textarea>
                    <input type="submit" value="Add Event"/>
                </form>

                {/* takes the events array returned from firebase and map it and show each event card onn click of the button the removeEvent method will take the eventkey and remove from firebase, thus our event page*/}
                    {this.state.events.map((event, key) => {
                        return (
                            <div key={event.key}>
                                <Link to={`/events/${event.key}`} key={event.key}>
                                    <EventCard key={event.key} event={event}  />
                                </Link>
                                <button className="remove-btn" onClick={() => this.removeEvent(event.key)}><i className="far fa-times-circle"></i></button> 
                            </div>
                        )
                    })}
            </React.Fragment>
        )
    }
}

// render each event, passed down the event state (pulled from firebase directly , includes event info and recipes list) from events page
class EventCard extends React.Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        }
    }
    componentDidMount() {
        // putting our recipes in an array and setting state
        const recipeArray = [];
        const data = this.props.event.recipes;
        for (let key in data) {
            recipeArray.push(data[key]);
        }
        this.setState({
            recipes: recipeArray
        })
    }
    render() {
        return (
            <React.Fragment>
                    <div>
                        <p>{this.props.event.eventName}</p>
                        <ul>
                            <li>Event Date: {this.props.event.eventDate}</li>
                            <li>Event Description:{this.props.event.eventDescription}</li>
                            <li>Drinks:
                                <ul>
                                    {/* mapping over state annd rendering the drinks we have added */}
                                    {this.state.recipes.map((recipe, key) => {
                                        return <li key={key}>{recipe.strDrink}</li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <p>Date: {this.props.event.eventDate}</p>
                           
                        
                    </div>
    
            </React.Fragment>
        )
    }
}

export default EventsPage;
// export {EventsPage, EventCard};
// export EventCard;
