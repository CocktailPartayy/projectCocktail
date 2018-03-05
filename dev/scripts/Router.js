import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App'
import NotFound from './NotFound'

const Router = () => (
    <BrowserRouter>
        <Switch>
            {/* switch works like it will try the first route and if not match then the 2nd and fall back to not found route */}
            <Route exact path="/" component={Cece} />
            {/* this :storeId here we can literally type at the end of the url /store/anythigndfsajkfjdsa and it will render app.js */}
            <Route path="/store/:storeId" component={App} />
            {/* when it doensnt match anything leave the path out */}
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;