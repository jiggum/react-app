import { fromJS } from 'immutable';
import { objectMap } from 'general/util/fp';

export const handleActions = (actionHandlerMap = {}, initialState) =>
  (state = initialState, action) => {
    if (!actionHandlerMap[action.type]) return state;
    return actionHandlerMap[action.type](
      state,
      objectMap((val) => {
        if (typeof val !== 'object') return val;
        return fromJS(val);
      }, action),
    );
  };


export const makeActionCreator = (type, ...argNames) =>
  (...args) => {
    const action = {
      type,
    };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };

export const makeMapDispatchToProps = funcs =>
  dispatch => objectMap((val, key) =>
    (...args) => dispatch(funcs[key](...args)), funcs);

