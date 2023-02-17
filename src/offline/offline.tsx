import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setManual } from '../store/manual';
import INOP from '../inop/inop';

const Offline = () => {
    const disp = useDispatch();
    const open = useSelector((state: RootState) => state.manual.dialogOpen);
    const [dialogOpen, setDialogOpen] = React.useState(open);

    const handleClickClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    useEffect(() => {
        disp(setManual({ dialogOpen: dialogOpen }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogOpen]);

    return (
        <>
            <Dialog
                open={dialogOpen}
                onClose={handleClickClose}
                sx={{
                    height: 'fit-content',
                }}
            >
                <DialogTitle>Offline</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are currently offline. Please connect to the
                        internet to use this app.
                    </DialogContentText>

                    <DialogActions>
                        <Box display="flex">
                            <Button onClick={handleClickClose}>Cancel</Button>
                            <Button onClick={handleClickClose}>
                                Enter Manual Details
                            </Button>
                            <Box
                                sx={{
                                    transform:
                                        'translateX(-6rem) translateY(0.75rem)',
                                }}
                                width="6rem"
                            >
                                <INOP />
                            </Box>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Offline;
