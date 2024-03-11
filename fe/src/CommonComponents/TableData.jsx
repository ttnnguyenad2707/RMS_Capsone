import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const TableData = ({ data, setDataSelect,deleteData }) => {
    if (data.length === 0) {
        return <Typography>No data available</Typography>;
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >STT</TableCell>
                        {Object.keys(data[0]).map((key) => (
                            key !== 'id' && (
                                <TableCell key={key}>{key}</TableCell>
                            )
                        ))}
                        <TableCell >Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell key={index}>{index + 1}</TableCell>
                            {Object.keys(row).map((key, index) => (    

                                key !== 'id' && <TableCell key={index}>{row[key]}</TableCell>
                            ))}
                            <TableCell key={index}>
                                <Stack spacing={2} direction="row">
                                    <Button variant="outlined">Update</Button>
                                    <Button variant="outlined" onClick={() => deleteData(row.id)}>Delete</Button>
                                </Stack>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default TableData;