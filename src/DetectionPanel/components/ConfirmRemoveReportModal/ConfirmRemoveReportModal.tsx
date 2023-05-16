import { FC, useContext } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import { ReportsContext } from "../../../context";

import './ConfirmRemoveReportModal.css'

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const ConfirmRemoveModal: FC<Props> = ({ open, handleClose }) => {
    const { targetRerportId, removeReport } = useContext(ReportsContext);

    const deleteReportPermanent = () => {
        removeReport(targetRerportId);
        handleClose();
    }

  return (
    <Modal open={open} onClose={handleClose} >

      <Box className="confirm-remove-report-modal">
        <Typography variant="h6" component="h2" sx={{marginBottom: "10px"}}>
          Esta seguro/a de querer eliminar el reporte: {targetRerportId}
        </Typography>

            <Button 
                variant="contained" 
                onClick={deleteReportPermanent}
                sx={{marginRight: "10px"}}
            >
                Eliminar
            </Button>
            
            <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
            </Button>
      </Box>

    </Modal>
  );
};