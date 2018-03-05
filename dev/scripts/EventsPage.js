import React from 'react'; 

class EventsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            eventName: '',
            eventDate: '',
            eventDescription: '',
            eventid: ''
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
            console.log(eventsArray)
            this.setState({
                events: eventsArray,
                loggedIn: true
            });
            });
        } else {
            this.setState({
            events: [],
            loggedIn: false
            })
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
        const dbRef = firebase.database().ref(`users/${userId}/events/`)
        dbRef.push(events);

        this.setState({
            eventDate: '',
            eventDescription: ''
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

                <section className="events">
                    {this.state.events.map((event, key) => {
                        return <EventCard key={event.key} eventName={event} remove={this.removeEvent} eventKey={event.key}/> 
                    })}
                </section>
            </React.Fragment>
        )
    }
}

const EventCard = (props) => {
    return (
        <React.Fragment>
            <p>{props.eventName.eventName}</p>
            <ul>
                <li>Event Date: {props.eventName.eventDate}</li>
                <li>Event Description:{props.eventName.eventDescription}</li>
            </ul>
            <button className="remove-btn" onClick={() => props.remove(props.eventKey)}><i className="far fa-times-circle"></i></button>
        </React.Fragment>
    )
}

export default EventsPage;
