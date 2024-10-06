/*************************************************************************
 * 
 * KlearNow CONFIDENTIAL
 * __________________
 * 
 *  Copyright (c) 2021 - 2021 KlearExpress Corporation.
 *  All Rights Reserved.
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of KlearExpress Corporation and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to KlearExpress Corporation
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from KlearExpress Corporation.
 */


 import { createStore, applyMiddleware, compose } from 'redux'
 import thunkMiddleware from 'redux-thunk';
 import { logger } from 'redux-logger';
 import rootReducer from '../reducers';
 import * as actions from '../actions'
 const actionSanitizer = (action) => (
   actions[action.type] ?
     { ...action } : null
 )
 
 const composeEnhancers =
   typeof window === 'object' &&
     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
     process.env.NODE_ENV !== 'production' ?
     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
       actionSanitizer,
       stateSanitizer: (state) => true ? { modal: state.modal } : state
     }) : compose;
 
 const middleware = [thunkMiddleware];
 
 // UNCOMMENT OUT BELOW TO LOG ACTIONS TO CONSOLE
 // process.env.NODE_ENV !== 'production' && middleware.push(logger)
 
 const enhancer = composeEnhancers(
   applyMiddleware(...middleware, logger),
   applyMiddleware(...middleware),
 
   // other store enhancers if any
 );
 
 
 
 const store = createStore(rootReducer, enhancer);
 
 export default store;