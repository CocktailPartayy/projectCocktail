import React from 'react'; 
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Event from './Event';



class EventsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            eventName: '',
            eventDate: '',
            eventDescription: ''
            // users: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const dbRef = firebase.database().ref(`/users/${user.uid}/events`);
            dbRef.on('value', (data) => {
            const eventsArray = [];
            const eventdata = data.val();
        
            for (let eventKey in eventdata) {
                eventdata[eventKey].key = eventKey;
                eventsArray.push(eventdata[eventKey])
            }
            // console.log(eventsArray)
            this.setState({
                events: eventsArray
            });
            });
        } 
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    addEvent(e) {
        e.preventDefault();
        const events = {
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            eventDescription: this.state.eventDescription
        }

        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`users/${userId}/events`)
        dbRef.push(events)
        .then((data)=>{
            const dbRefE = firebase.database().ref(`/events/${data.ref.key}`)
            console.log(dbRefE);
            dbRefE.update(events);
        })
        console.log('hey')

        
        // "/events/-L6s5-eSMUkKv9wDjViM" THIS IS THE URL WHEN CECE IS SIGNED IN AND GOES TO A LINK THAT BRENT MADE
        //"/events/-L6s5-eSMUkKv9wDjViM"
    
        this.setState({
            eventDate: '',
            eventDescription: '',

        })
    }

    removeEvent(eventKey) {
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`/users/${userId}/events/${eventKey}`);
        dbRef.remove();
    }

    render() {
        return (
            <React.Fragment>
                {/* <Link to={`/`}>Home</Link>
                <Link to={`/events`}>Events</Link>
                <Link to={`/search`}>Search</Link> */}
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
                {/* <Event /> */}
                {/* <div>
                    {this.state.events.map((event, key) => {
                        return event.eventName
                    })}
                </div> */}

                {/* <Link to={`/events/${this.props.eventKey}`}> */}
                    {this.state.events.map((event, key) => {
                        return (
                            <Link to={`/events/${event.key}`} key={event.key}>
                                <EventCard key={event.key} event={event} remove={this.removeEvent}  />
                            </Link>
                        )
                    })}
                {/* </Link> */}
            </React.Fragment>
        )
    }
}

class EventCard extends React.Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        }
    }
    componentDidMount() {
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
                {/* {console.log(props)} */}
                {/* <Link to={`/events/event${props.eventKey}`} params={{name: props.event.eventName}}>stuff</Link> */}
                    <div>
                        <p>{this.props.event.eventName}</p>
                        <ul>
                            <li>Event Date: {this.props.event.eventDate}</li>
                            <li>Event Description:{this.props.event.eventDescription}</li>
                            <li>Drinks:
                                <ul>
                                    {this.state.recipes.map((recipe, key) => {
                                        return <li key={key}>{recipe.strDrink}</li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                        <p>Date: {this.props.event.eventDate}</p>
                           
                        <button className="remove-btn" onClick={() => this.props.remove(this.props.eventKey)}><i className="far fa-times-circle"></i></button> 
                    </div>
    
            </React.Fragment>
        )
    }
}

export default EventsPage;
// export {EventsPage, EventCard};
// export EventCard;
