import React, { Fragment } from 'react';
import {EventsPage, EventCard} from './Eventspage'

// initialize firebase
// var config = {
//     apiKey: "AIzaSyAKuFRAm4lX_T_9PitdDB7dZHyzDKDMyk8",
//     authDomain: "cocktail-party-28499.firebaseapp.com",
//     databaseURL: "https://cocktail-party-28499.firebaseio.com",
//     projectId: "cocktail-party-28499",
//     storageBucket: "",
//     messagingSenderId: "882276644580"
// };
// firebase.initializeApp(config);

export default class Event extends React.Component {
    constructor(){
        super();
        this.state={
            url: '',
            userId: '',
            eName: '',
            eDate: '',
            eDesc: '',
            guests: []
        };
        // this.handleClick = this.handleClick.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    componentDidMount(){
        
        // const dbRef = firebase.database().ref(``)
        // const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`${this.state.url}`);
        dbRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            const e = snapshot.val();
            console.log(snapshot.val().guests);
            
            this.setState({
                eName: e.eventName,
                eDate: e.eventDate,
                eDesc: e.eventDescription,
                // guests : snapshot.val().guests
            })

            if(snapshot.val().guests){
                this.setState({
                guests: snapshot.val().guests 
                })
            }
        })
        
        //    console.log(this.props)
    }
    
    componentWillMount() {
        this.setState({
            url: this.props.match.url,
            userId: this.props.user.uid
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
    
    
    // componentWillUpdate (){
    //     // const userId = firebase.auth().currentUser.uid;
    //     // console.log(userId);
    // }
        
        
    // handleClick(e){
    //     e.preventDefault();
        
        
    //     this.setState({
    //         userId
    //     })
    // }
        
        // this.setState({
        //     userId
        // })
        // console.log(this.state.userId);

        // 
        
    // }

    render(){
        return (
           <Fragment>
                <h2>{this.state.eName}</h2>
                <p>{this.state.eDate}</p>
                <p>{this.state.eDesc}</p>
                <button onClick={this.addUser}>Join the thing!</button>
           </Fragment>
        )
    }

}


// question about retrieving uid data in a routed componnent, white tables
