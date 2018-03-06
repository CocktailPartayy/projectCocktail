import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import configKey from './config-key';
// import { EventsPage,  EventCard } from './EventsPage';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Search from './Search'
import Drink from './Drink'
// import Home from './Home'
import EventsPage from './EventsPage'
import Event from './Event'
// import EventsPage from './EventsPage'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: {},
            events: {}
        };
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        // this.retrieveEvent = this.retrieveEvent.bind(this);
    }
    signIn() {
        // creatinng a nnew instance of google auth provider
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        firebase.auth().signInWithPopup(provider)
    }
    signOut() {
        firebase.auth().signOut();
    }



    componentDidMount() {
        // runs and watched for changes after things are rendered
        // accepts a promist that accepts a callback funcaiton as an argumennt
        firebase.auth().onAuthStateChanged((userRes) => {
            // console.log(userRes);
            if (userRes) {
                this.setState({
                    loggedIn: true,
                    // if two things equal the same we can just do it like that same as user:user just typing user
                    user: userRes
                });
                const dbRef = firebase.database().ref(`/users/${this.state.user.uid}`);
                dbRef.update({ name: `${this.state.user.displayName}` });
                const userId = firebase.auth().currentUser.uid;
                const dbRefz = firebase.database().ref(`/users/${userId}/events`);
                // const dbRef = firebase.database().ref(`/events`);
                dbRefz.on('value', (snapshot) => {
                    const data = snapshot.val();
                    // console.log(data);
                    const state = [];
                    for (let key in data) {
                        // console.log(key);

                        // grab object, add property of key annd assign value of key that firebase provides!!!
                        data[key].key = key;
                        // console.log(data[key]);
                        state.push(data[key]);
                    }
                    this.setState({
                        events: state
                    })
                })

            } else {
                this.setState({
                    loggedIn: false,
                    user: {}
                })
            }
        });
    }

    render() {
        return (
            
            <Fragment>
                {this.state.loggedIn ?
                       <Fragment>
                            {/* <Brent /> */}
                            {/* <Link to={`/`}>Home</Link>
                            <Link to={`/events`}>Events</Link>
                            <Link to={`/search`}>Search</Link> */}
                            {/* <button onClick={this.signOut}>sign out</button> */}
                            {/* <button onClick={this.retrieveEvent}>get my shit</button> */}
                            {/* what i wanna do is  <Search /> <Events /> <Favs /> */}
                            <h1>hi</h1>
                            {/* <Search /> */}
                            {/* <Event /> */}
                            
                            {/* <Brent events={this.state.events} /> */}
                       </Fragment>



                    :

                    <div className="sign-in">
                        <div><img className='animated tada infinite' src='../../assets/signin-bkg.png' alt="" /></div>
                        <div>
                            {/* <h1>Cocktail Partayyy</h1> */}
                            <button onClick={this.signIn}>sign in!</button>
                        </div>
                    </div>

                }
            </Fragment>
        )
    }
}

export default Home;


{/* linda's example
    <Route
    path="/invite/:eventid" exact
    render={(props) => (
        <InviteLandingPage {...this.state.user}
            {...props}
            showLogin={this.showLogin}
            showSignUp={this.showSignUp}
            closeModal={this.closeModal}
        />)}
/> */}