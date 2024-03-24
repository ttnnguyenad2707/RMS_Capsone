import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import { statisticRevenue } from "../../../services/statistic";
import Box from '@mui/material/Box';

export default function BarChartDisplay() {
  const [statistic, setStatistic] = React.useState()
  const [month,setMonth] = React.useState(['']);
  const [revenue,setRevenue] = React.useState(['']);

  React.useEffect(() => {
    async function fetchStatisticRevenue() {
      statisticRevenue().then(data => {
        setStatistic(data.data.data);
        setMonth( Object.keys(data.data.data.revenueByMonth)  )
        setRevenue(Object.values(data.data.data.revenueByMonth))
      })
      
    }
    fetchStatisticRevenue();
  }, [])

  return (
    <Box >
      <Typography
        id="modal-modal-title"
        variant="h5"
        component="h3"
        sx={{ fontWeight: "Bold", color: "#1976d2",pb:1 }}
      >
        Thống Kê năm {statistic?.year}
      </Typography>

        <BarChart
          series={[
            { data: revenue},
          ]}
          height={400}
          xAxis={[{ data:month, scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 100, right: 10 }}
        />
    </Box>
  );
}
