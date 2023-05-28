import { legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
const reducer = function (state = {}, action) {
    console.log('mani',state, action)
    return state
}
const store = legacy_createStore(reducer,applyMiddleware(thunk.default))
const addAction = ()=>{
    return {
        type: 'add',
        payload: 'test'
    }
}
function incrementAsync() {
  console.log('testing')
  return function addAsyncAction(dispatch, state){
    console.log('incrementAsync',state())
    setTimeout(() => {
      // You can invoke sync or async actions with `dispatch`
      dispatch(addAction());
    }, 10000);
  };
}
console.log(store.dispatch(incrementAsync()))