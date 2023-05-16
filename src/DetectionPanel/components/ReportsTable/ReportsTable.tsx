import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useContext, useState } from "react";
import { Report } from "../../../interfaces";
import { ReportsContext } from "../../../context";
import { ConfirmRemoveModal } from "..";

export const ReportsTable = () => {
    const {setTargetReportId} = useContext(ReportsContext)

    const [open, setOpen] = useState(false);
    const handleOpen = (id: string) => {
        setTargetReportId(id);
        setOpen(true)};
    const handleClose = () => setOpen(false);


    const columns: GridColDef[] = [
        { field: "id", headerName: "Id", width: 10 },
        {
            field: "image",
            headerName: "Imagen",
            width: 220,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box component="img" src={params.row.image} height="190px" width="300px"/>
            )
        },
        {
            field: "camera",
            headerName: "Cámara",
            width: 170,
            sortable: false,
        },
        {
            field: "detection",
            headerName: "Evento",
            width: 170,
            sortable: false,
        },
        {
            field: "confidence",
            headerName: "Confianza",
            width: 170,
            sortable: false,
        },
        {
            field: "timeStamp",
            headerName: "Fecha y hora",
            width: 140,
            sortable: false
        },
        {
            field: "options",
            headerName: "Options",
            width: 120,
            renderCell: (params: GridRenderCellParams) => (
                <Button variant="contained" color="error" onClick={()=>{handleOpen(params.row.id)}}>Eliminar</Button>
            )
        }
    ];

    const { reports } = useContext(ReportsContext);

    const rows = reports.map((report: Report) => ({
        id: report.id,
        image: report.imageURL,
        camera: report.cameraName,
        detection: report.detection,
        confidence: report.confidence,
        timeStamp: report.timeStamp,
    }))

  return (
    <Box className="reports-table">
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
                        },
                    },
                }}
                rowHeight={200}
                pageSizeOptions={[7]}
            />
            <ConfirmRemoveModal handleClose={handleClose} open={open}/>
    </Box>
  )
}