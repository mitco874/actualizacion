import { ReportsState } from '..';
import { Report } from '../../interfaces';

type ReportsAction=
| { type: '[Reports] - load reports', payload: Report[]}
| { type: '[Reports] - remove reports', payload: string}
| { type: '[Reports] - set target report id', payload:string }

export const ReportsReducer = ( state: ReportsState , action: ReportsAction ): ReportsState => {

     switch ( action.type ) {
        case "[Reports] - load reports":
            return { 
                ...state,
                reports: action.payload
            };
        case "[Reports] - remove reports":
            return { 
                ...state,
                reports: state.reports.filter((report: Report)=>(report.id != action.payload))
            };
        case "[Reports] - set target report id":
            return { 
                ...state,
                targetRerportId: action.payload
            };

          default:
               return state;
     }
}