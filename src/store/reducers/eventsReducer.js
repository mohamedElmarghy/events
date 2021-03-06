import cuid from "cuid";
import EventsList from "../../components/events/EventsList";

const initalState = []
export  const eventReducer = (state = initalState, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            // const event = {...action.payload,
            // id : cuid(),
            // authId : cuid(),
            // authPhoto : 'https://randomuser.me/api/portraits/women/84.jpg',
            // authName : 'Ibrahim',
            // attendee : []      
        
            return [...state, action.payload]
            break;
        case 'DELETE_EVENT':
           return [...state.filter(elem =>elem.id != action.payload)]
           break;
        case 'UPDATE_EVENT' : 
            return [...state.map(elem => elem.id == action.payload.id ? action.payload : elem)];
            break;
        default:
            return state;
            break;
    }
   
} 