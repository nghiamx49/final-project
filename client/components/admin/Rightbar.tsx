import ApexCharts, { ApexOptions } from "apexcharts";

import { Container, Row, Spacer, Switch, Text, useTheme } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { IoMdMoon } from "react-icons/io";
import { useTheme as useNextTheme } from "next-themes";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Rightbar = () => {

    const {isDark} = useTheme();
    const {setTheme} = useNextTheme();
  const collumnChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    series: [
      {
        data: [
          {
            x: "08/05/2022",
            y: 10,
          },
          {
            x: "09/05/2022",
            y: 18,
          },
          {
            x: "20/05/2022",
            y: 13,
          },
        ],
      },
    ],
    xaxis: {
      labels: {
        style: {
          colors: isDark
            ? ["white", "white", "white"]
            : ["black", "black", "black"],
        },
      },
    },
  };
  const lineChartOptions: ApexOptions = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.2,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      labels: {
        style: {
          colors: isDark ? "white" : "black",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "white" : "black",
        },
      },
    },
  };


  return (
    <Container>
      <Row
        align="center"
        css={{
          boxShadow: "$md",
          padding: "30px 10px",
          background: isDark ? "$gray700" : "",
          borderRadius: "$sm",
        }}
      >
        <Text b>Switch To {isDark ? "Light" : "Dark"} Mode</Text>
        <Spacer x={.5} />
        <Switch
          checked={isDark}
          iconOff={<IoMdMoon />}
          iconOn={<IoMdMoon />}
          color="secondary"
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
      </Row>
      <Spacer y={1} />
      <Row
        css={{
          display: "flex",
          flexDirection: "column",
          background: isDark ? "$gray700" : "",
          borderRadius: "$sm",
          padding: 10,
          boxShadow: "$md",
        }}
      >
        <Text b>Feeds Report</Text>
        <Chart
          type="bar"
          options={collumnChartOptions}
          series={collumnChartOptions.series}
          height={350}
        />
      </Row>
      <Spacer y={1} />
      <Row
        css={{
          display: "flex",
          flexDirection: "column",
          background: isDark ? "$gray700" : "",
          borderRadius: "$sm",
          padding: 10,
          boxShadow: "$md",
        }}
      >
        <Text b>Posts By Month</Text>
        <Chart
          type="line"
          options={lineChartOptions}
          series={lineChartOptions.series}
          height={250}
        />
      </Row>
    </Container>
  );
};

export default Rightbar;
