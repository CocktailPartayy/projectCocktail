import React, { Fragment } from 'react';

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
            user: {}
        };
    }
    // componentWillMount(){
    //     this.setState({
    //         url: this.props.match.url
    //     })
    //     // console.log(this.state.url);
    // }

    // componentDidMount(){
    //     const dbRef = firebase.database().ref(``)
    //     const userId = firebase.auth().currentUser.uid;
    //     const dbRef = firebase.database().ref(`/users/${userId}/${this.state.url}`);
    //     dbRef.on('value', (snapshot)=> {
    //         console.log(snapshot);
    //     })
    // }

    render(){
        return <div>hi</div>
    }

}