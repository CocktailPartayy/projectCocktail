import React from 'react'; 

class UserLogin extends React.Component {
    constructor() {
        super();
        this.state = {

            loggedIn: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signInGoogle = this.signInGoogle.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loggedIn: true,
                });
            } else {
                this.setState({
                    loggedIn:false,
                });
            }
        })
    }

    createShow(e) {
        e.preventDefault();
        this.createPopup.classList.toggle("show");
    }

    signInShow(e) {
        e.preventDefault();
        this.signinPopup.classList.toggle("show");
    }

    handleChange(e, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = e.target.value;
        this.setState(newState);
    }


    signInGoogle(e) {
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: 'select_account'
        });

        firebase.auth().signInWithPopup(provider)
            .then((user) => {
                console.log('signed in successful')
            })

    }

    signOut() {
        firebase.auth().signOut()
            .then((success)  => {
                console.log('Signed Out!')
        }), (error) => {
            console.log(error);
        };
        this.setState({
            loggedIn: false,
            user: {}
        })
    }
    
    render() {

        return ( 
           <React.Fragment>
                <button className="btn-google" onClick={this.signInGoogle}>Log In with <i className="fab fa-google"></i></button>
                <button onClick={this.signOut}>Sign Out</button>
           </React.Fragment>
        )
    }
}

export default UserLogin;