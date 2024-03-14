import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { getMemberShipInHouse } from "../../../services/houses";
import { useDispatch, useSelector } from "react-redux";

const ChartRooms = ({ houseData, roomsData }) => {
  const [countWithMembers,setCountWithMembers] = React.useState(0)
  const [countWithoutMembers,setCountWithoutMembers] = React.useState(0)
  const [data,setData] = React.useState([])

  React.useEffect(() => {
    setData([])
    let countWithMembers = 0;
    let countWithoutMembers = 0;

    roomsData.forEach(room => {
      if (room.members && room.members.length > 0) {
        countWithMembers++;
      } else {
        countWithoutMembers++;
      }
    });
    setData(prev => [
      ...prev,
      { id: 0, value: countWithoutMembers, label: "Phòng Trống" },
      { id: 1, value: countWithMembers, label: "Phòng Đã Được Thuê" }
    ]);
    
  }, [houseData,roomsData])

  

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
          fontSize: "15px",
        },
      }}
      width={800}
      height={350}
    />
  );
};
export default ChartRooms;
