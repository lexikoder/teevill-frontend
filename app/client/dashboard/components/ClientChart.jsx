"use client"
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const ClientChart = ({ textCenter, header,labels,colors,values }) => {
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();

      const text = textCenter;
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "middle";

      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2;

      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  };

  ChartJS.register(centerTextPlugin);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || ["#0A644E", "#2CAEC2", "#FBBF24"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "50%", 
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        display: false, 
      },
    },
  };

  return (
    <Box mt="30px">
      <Text color={"#fff"} pb={"10px"} textAlign={"center"}>{header}</Text>
      <Doughnut data={chartData} options={options} width={250} height={250} />;
    </Box>
  );
};

export default ClientChart;
