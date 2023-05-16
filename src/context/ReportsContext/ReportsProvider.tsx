import { FC, useCallback, useEffect, useReducer } from 'react';
import { Report } from '../../interfaces';
import { ReportsContext, ReportsReducer } from '..';
import { JWTDecoder, validateJwtSession } from '../../utils';
import { sistemaDeteccionApi } from '../../api';
import { reports } from '../../data';

export interface ReportsState {
    reports: Report[];
    targetRerportId: string;
}

const REPORTS_INITIAL_STATE: ReportsState = {
    reports: [],
    targetRerportId:""
}

interface Props {
    children: React.ReactNode
}

export const ReportsProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(ReportsReducer, REPORTS_INITIAL_STATE);

    const loadReports = useCallback(async () => {
        //const {id} = JWTDecoder.decodeSavedToken();
        //const { data } = await sistemaDeteccionApi.get(`/api/v1/report?userId=${id}`, validateJwtSession.getHeaders());
        dispatch({ type: "[Reports] - load reports", payload: reports });
    }, [])

    const removeReport = async (reportId: string): Promise<void> => {
        //await sistemaDeteccionApi.delete(`/api/v1/report/${reportId}`,validateJwtSession.getHeaders());
        dispatch({ type: "[Reports] - remove reports", payload: reportId });
    }

    const setTargetReportId = (id: string) => {
        dispatch({ type: "[Reports] - set target report id", payload: id });
    } 

    useEffect(()=> {
        loadReports();
    },[])

    return (
        <ReportsContext.Provider value={{
            ...state,
            loadReports,
            removeReport,
            setTargetReportId
        }} >
            {children}
        </ReportsContext.Provider>
    )
}