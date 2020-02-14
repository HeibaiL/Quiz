import {SAVE_ANSWER} from "./reducers";
import {combineReducers} from "redux"

const defaultState = {question:"", answers:[]};

const answerReducer = (state=defaultState,action)=>{
switch(action.type){
    case SAVE_ANSWER:
        return {
            ...state,
            answers:answers.concat(action.payload)
        }
        default:
            return state
}
}
export const rootReducer = combineReducers({
    answers:answerReducer
})




