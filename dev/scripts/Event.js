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
            userId: '',
            eName: '',
            eDate: '',
            eDesc: '',
            users: []
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
    //    console.log(this.state.url)
        // const dbRef = firebase.database().ref(``)
        // const userId = firebase.auth().currentUser.uid;
        // const dbRef = firebase.database().ref(`/users/${this.state.userId}${this.state.url}`);
        // const dbRef = firebase.database().ref('/events/-L6s7YhY9RHRNQQO6CTQ');
        const dbRef = firebase.database().ref(this.state.url);
        
        

        dbRef.on('value', (snapshot) => {
            console.log(snapshot.val());
            // const e = snapshot.val()
            // this.setState({
            //     eName: e.eventName,
            //     eDate: e.eventDate,
            //     eDesc: e.eventDescription
            // })
        })

        // dbRefE = firebase.database().ref(`/${this.state.url}`)
        
        
    //    console.log(this.props)
    }
    
    componentWillMount() {
        this.setState({
            url: this.props.match.url,
            // userId: this.props.user.uid
        });
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
           </Fragment>
        )
    }

}


// question about retrieving uid data in a routed componnent, white tables