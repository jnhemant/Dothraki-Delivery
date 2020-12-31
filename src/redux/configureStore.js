import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { InitialLogin, InitialRequestForm, InitialSignup } from './forms';
// import { Reducer, initialState } from './reducer'
import { UserLogin } from './userLogin';
import { Requests } from './requests';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            isLoggedIn : UserLogin,
            requests: Requests,
            ...createForms({
                login: InitialLogin,
                signup: InitialSignup,
                request: InitialRequestForm
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};

