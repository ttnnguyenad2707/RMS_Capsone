import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Formik, Field, Form } from 'formik';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalAddProblem = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        
        <div>
            <Button onClick={handleOpen}>Add Problem</Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={style}>
                    <Formik
                        initialValues={{
                            roomId: '',
                            type: '',
                            title: '',
                            content: '',
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAddProblem;