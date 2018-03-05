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
            userId: ''
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        console.log(this);
        // const userId = firebase.auth().currentUser.uid;
        // console.log(userId);
        // this.setState({
        //     url: this.props.match.url
        //     // userId
        // })
    //     // console.log(this.state.url);
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

        // const dbRef = firebase.database().ref(``)
        // const userId = firebase.auth().currentUser.uid;

        // const dbRef = firebase.database().ref(`/users/${this.state.userId}${this.state.url}`);
        // dbRef.on('value', (snapshot) => {
        //     console.log(snapshot);
        // })
        
    // }

    render(){
        return <button onClick={this.handleClick}>get my shit</button>
    }

}


// question about retrieving uid data in a routed componnent, white tables