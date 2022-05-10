import ApexCharts, { ApexOptions } from "apexcharts";

import { Container, Row, Spacer, Switch, Text, useTheme } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { IoMdMoon } from "react-icons/io";
import { useTheme as useNextTheme } from "next-themes";
import { LineChart } from "../../interface/LineChart.interface";
import { FC } from "react";
import { BarChart } from "../../interface/BarChart.interface";

interface Props {
  lineChartData: LineChart,
  barChartData: BarChart[]
}

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Rightbar: FC<Props> = ({ lineChartData, barChartData }) => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  const collumnChartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    series: [
      {
        data: barChartData,
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
    series: lineChartData.series,
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
      categories: lineChartData.categories,
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
        <Spacer x={0.5} />
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
        <Text b>Posts Per Day</Text>
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
