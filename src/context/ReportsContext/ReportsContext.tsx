import { createContext } from 'react';
import { Report} from '../../interfaces';

interface ContextProps{
    reports: Report[];
    targetRerportId: string;
    loadReports: () => Promise<void>;
    removeReport: (reportId: string) => Promise<void>;
    setTargetReportId: (id: string) => void;
}

export const ReportsContext =createContext({} as ContextProps );