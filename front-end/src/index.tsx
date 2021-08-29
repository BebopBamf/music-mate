import React from 'react';
import { render } from 'react-dom';
import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './routes/home';
import { SWRConfig } from 'swr';
import { fetcher } from './config/api';

import "./style.css";

const App = () => (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
        <SWRConfig
            value={{
                fetcher: fetcher,
            }}
        >
          
            <Switch>
                <Route path="/">
                    <Home />
                </Route>

                {/*
                
                <Route path="/signup">
                    <SignUp path="/signup" />
                </Route>

                <Route path="/messages/:guid">
                    <Messages />
                </Route>

                <Route path="/profile">
                    <Profile path="/profile" />
                </Route>

                <Route path="/profile/:guid">
                    <Profile path="/profile/:guid" />
                </Route>
                */}

            </Switch>
        
        </SWRConfig>
    </div>
);

render(<App />, document.body);
