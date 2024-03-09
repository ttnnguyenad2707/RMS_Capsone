import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { formatMoney } from '../../../Utils';

function GeneralInfo(props) {
    const { children, value, index, room, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "auto auto auto auto",
                        gap: 4
                    }}>
                        <Typography>
                            Tầng : {room.floor}
                        </Typography>
                        <Typography>
                            Tên phòng : {room.name}
                        </Typography>
                        <Typography>
                            Loại : {room.roomType === "normal" ? "Thường" : "Cao Cấp"}
                        </Typography>
                        <Typography>
                            Đơn giá : {formatMoney(room?.roomPrice)}
                        </Typography>
                        <Typography>
                            Số người phù hợp : {room.quantityMember}
                        </Typography>
                        <Typography>
                            Số người đang thuê : {room && room.members ? room.members.length : 0}
                        </Typography>
                        <Typography>
                            Tình trạng : {room && room.members && room.members.length === 0 ? "Chưa có khách thuê" : "Đã cho thuê"}
                        </Typography>

                    </Box>
                    {/* <Box>
                        <Typography>Tiện ích: </Typography>
                        <Checkbox label={"chec"}></Checkbox>
                    </Box> */}
                </Box>
            )}
        </div>
    );
}

export default GeneralInfo