"use client"

import { Box, Flex, Text, Select } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { _COLORS } from '@/constant/colors';

const barChartdata = [
  { year: 2024, name: "jan", rc: 4000, nc: 40 },
  { year: 2024, name: "feb", rc: 3000, nc: 20 },
  { year: 2024, name: "mar", rc: 2000, nc: 70 },
  { year: 2024, name: "apr", rc: 2780, nc: 65 },
  { year: 2024, name: "may", rc: 1890, nc: 120 },
  { year: 2024, name: "jun", rc: 2390, nc: 105 },
  { year: 2024, name: "jul", rc: 3490, nc: 130 },
  { year: 2024, name: "aug", rc: 3470, nc: 150 },
  { year: 2024, name: "sep", rc: 3490, nc: 130 },
  { year: 2024, name: "oct", rc: 4490, nc: 140 },
  { year: 2024, name: "nov", rc: 3690, nc: 220 },
  { year: 2024, name: "dec", rc: 4490, nc: 200 },

  { year: 2025, name: "jan", rc: 4200, nc: 60 },
  { year: 2025, name: "feb", rc: 3100, nc: 30 },
  { year: 2025, name: "mar", rc: 2500, nc: 100 },
  { year: 2025, name: "apr", rc: 3000, nc: 85 },
  { year: 2025, name: "may", rc: 2100, nc: 140 },
  { year: 2025, name: "jun", rc: 2600, nc: 120 },
  { year: 2025, name: "jul", rc: 3700, nc: 150 },
  { year: 2025, name: "aug", rc: 3600, nc: 170 },
  { year: 2025, name: "sep", rc: 3700, nc: 160 },
  { year: 2025, name: "oct", rc: 4700, nc: 180 },
  { year: 2025, name: "nov", rc: 3900, nc: 240 },
  { year: 2025, name: "dec", rc: 4600, nc: 210 },
];

const Charts = () => {
  const years = useMemo(() => [...new Set(barChartdata.map(d => d.year))], []);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);

  const filteredData = useMemo(
    () => barChartdata.filter(d => d.year === selectedYear),
    [selectedYear]
  );

  return (
    <Box w={"100%"} h={"100%"} bg={"#2c2c2c"} borderRadius={"20px"}>
      <Flex justify="space-between" align="center" px="50px" py="20px">
        <Text color="white">Projects in {selectedYear}</Text>
        <Select
          w="150px"
          bg="none"
          color="white"
          focusBorderColor={_COLORS?.brand}
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year} style={{color:"black"}}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>

      <BarChart
        width={900}
        height={500}
        data={filteredData}
        barSize={40}
        barCategoryGap={20}
        margin={{ top: 50, right: 30, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="1 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="nc"
          fill="#00C853"
          activeBar={<Rectangle fill="#00C853" stroke="#00C853" />}
        />
      </BarChart>
    </Box>
  );
};

export default Charts;
