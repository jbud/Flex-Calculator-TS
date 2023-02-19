import React, { useEffect } from 'react';
import ReactJson from 'react-json-view';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';

import { setDebugWindow } from '../store/masterDebug';
import { RootState } from '../store/store';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Debug = () => {
    const disp = useDispatch();
    const open = useSelector((state: RootState) => state.debug.debugMode);
    const subjects = useSelector(
        (state: RootState) => state.debug.debugMessages
    );
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        setDialogOpen(open);
    }, [open]);

    useEffect(() => {
        disp(setDebugWindow(dialogOpen));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dialogOpen]);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div"
                    >
                        Debug
                    </Typography>
                </Toolbar>
            </AppBar>
            <List
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                {Object.keys(subjects).map((keyName, i) => {
                    const isJSON = (str: string) => {
                        try {
                            return JSON.parse(str) && !!str;
                        } catch (e) {
                            return false;
                        }
                    };
                    if (isJSON(subjects[keyName].message)) {
                        return (
                            <>
                                <ListItem key={subjects[keyName].title + i}>
                                    <ListItemText
                                        key={i}
                                        primary={subjects[keyName].title}
                                    />
                                    <ReactJson
                                        key={subjects[keyName].message + i}
                                        src={JSON.parse(
                                            subjects[keyName].message
                                        )}
                                        collapsed={true}
                                        theme="monokai"
                                    />
                                </ListItem>
                            </>
                        );
                    }
                    return (
                        <>
                            <ListItem key={i}>
                                <ListItemText
                                    key={i + subjects[keyName].title}
                                    primary={subjects[keyName].title}
                                    secondary={subjects[keyName].message}
                                />
                            </ListItem>
                            <Divider />
                        </>
                    );
                })}

                <ListItem>
                    <ListItemText
                        primary="Default notification ringtone"
                        secondary="Tethys"
                    />
                </ListItem>
            </List>
        </Dialog>
    );
};

export default Debug;
