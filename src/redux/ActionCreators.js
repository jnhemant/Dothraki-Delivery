import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';
import fetch from 'cross-fetch';
import {actions} from 'react-redux-form';

export const loginTrue = () => ({
    type: ActionTypes.USER_LOGIN
});

export const loginFalse = () => ({
    type: ActionTypes.USER_LOGOUT
});

export const postLogin = (email, password) => (dispatch) => {
    const userCredentials = {
        email: email,
        password: password
    }
    return fetch(baseUrl + 'auth/users/signin', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type': 'application/json'
        },
        // credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            console.log(JSON.stringify(response));
            localStorage.setItem('token', response.token);
            dispatch(loginTrue());
            // dispatch(resetRoute());
        })
        .catch(err => {
            console.log('Log In not successful ', err.message);
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            dispatch(loginFalse());
            alert('Log In not successful!\nError:  ' + err.message)
        });
}

export const postSignUp = (email, phone, password, location, role) => (dispatch) => {
    const newUser = {
        email: email,
        phone: phone,
        password: password,
        currentLocation: location,
        role: role
    }
    console.log(JSON.stringify(newUser));
    return fetch(baseUrl + 'auth/users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        },
        // credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response));
            localStorage.setItem('token', response.token);
            dispatch(loginTrue());
        })
        .catch(err => {
            console.log('User Sign Up ', err.message);
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            dispatch(loginFalse());
            alert('Sign Up unsuccessful!\nError: ' + err.message)
        });
}



export const signOut = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('User not logged in. Please log in to continue');
        return;
    }
    localStorage.removeItem('token');
    dispatch(loginFalse());
    return fetch(baseUrl + 'auth/users/signout', {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            console.log(response.message)
        })
        .catch(err => console.log(err.message));
}

export const postRequestForm = (destination, latitude, longitude, phone, history)  => (dispatch) =>  {
    const token = localStorage.getItem('token');
    if(!token){
        // alert('User not logged in. Please log in to continue');
        dispatch(addRoute());
        history.push("/login");
        return;
    }
    const newRating = {
        destination: destination,
        destination_phone: phone,
        destination_lat: latitude,
        destination_long: longitude
    }
    console.log(JSON.stringify(newRating));
    return fetch(baseUrl + 'users/users/request', {
        method: 'POST',
        body: JSON.stringify(newRating),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        // credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                if(response.status >= 400 && response.status < 500){
                    localStorage.removeItem('token');
                    dispatch(loginFalse());
                }
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response.message));
            history.push("/pendingrequests");
            dispatch(actions.reset('request'));
            dispatch(fetchRequests());
        })
        .catch(err => {
            console.log('Request could not be created ', err.message);
            alert('Request creation unsuccessful!\nError: ' + err.message);
            dispatch(actions.reset('request'));
        });
}

export const fetchRequests = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if(!token){
        // alert('User not logged in. Please log in to continue');
        return;
    }
    dispatch(requestsLoading());
    return fetch(baseUrl + 'users/requests/pending', {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ": " + response.statusText);
            if(response.status >= 400 && response.status < 500){
                localStorage.removeItem('token');
                dispatch(loginFalse());
            }
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(requests => {
        dispatch(addRequests(requests.requests));
        dispatch(fetchUnratedRequests());
    })
    .catch(err => dispatch(requestsFailed(err.message)));
};

export const requestsFailed = (errmess) => ({
    type: ActionTypes.REQUESTS_FAILED,
    payload: errmess
});

export const requestsLoading = () => ({
    type: ActionTypes.REQUESTS_LOADING
});

export const addRequests = (requests) => ({
    type: ActionTypes.ADD_REQUESTS,
    payload: requests
});


// ProtectedRoute action types
export const addTargetRoute = (route) => ({
    type: ActionTypes.ADD_TARGETROUTE,
    payload: route
});

export const resetTargetRoute = () => ({
    type: ActionTypes.RESET_TARGETROUTE
});

// TargetRoute functions
export const addRoute = (route) => ({
    type: ActionTypes.ADD_ROUTE
});

export const resetRoute = () => ({
    type: ActionTypes.RESET_ROUTE
});

// Fetching unrated requests
export const fetchUnratedRequests = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if(!token){
        // alert('User not logged in. Please log in to continue');
        // history.push("/login");
        return;
    }
    return fetch(baseUrl + 'users/requests/unrated', {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ": " + response.statusText);
            if(response.status >= 400 && response.status < 500){
                localStorage.removeItem('token');
                dispatch(loginFalse());
                // history.push("/login");
            }
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(requests => dispatch(addUnratedRequests(requests.requests)))
    .catch(err => dispatch(unratedRequestsFailed(err.message)));
};

export const unratedRequestsFailed = (errmess) => ({
    type: ActionTypes.UNRATED_REQUESTS_FAILED,
    payload: errmess
});

export const addUnratedRequests = (requests) => ({
    type: ActionTypes.ADD_UNRATED_REQUESTS,
    payload: requests
});

// posting rating for a request

export const postRating = (requestId, rating, feedback, history)  => (dispatch) =>  {
    const token = localStorage.getItem('token');
    if(!token){
        alert('User not logged in. Please log in to continue');
        history.push("/login");
        return;
    }
    const newRating = {
        request_id: requestId,
        rating: rating,
        feedback: feedback
    }
    console.log(JSON.stringify(newRating));
    return fetch(baseUrl + 'users/ratings/agent', {
        method: 'POST',
        body: JSON.stringify(newRating),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                if(response.status >= 400 && response.status < 500){
                    localStorage.removeItem('token');
                    dispatch(loginFalse());
                }
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response.message));
            return dispatch(fetchUnratedRequests());
        })
        .catch(err => {
            console.log('Rating could not be posted', err.message);
            alert('Rating could not be posted' + err.message)
        });
}

