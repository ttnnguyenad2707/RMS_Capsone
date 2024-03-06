import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
const ChartRooms = () => {
  const data = [
    { id: 0, value: 10, label: "Phòng Trống" },
    { id: 1, value: 30, label: "Phòng Đã Được Thuê" },
  ];
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
