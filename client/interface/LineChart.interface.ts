export interface LineChart {
  series?: {
    name: string;
    data: number[];
  }[];
  categories?: string[];
}

export interface LineChartItem {
  _id: { date: string };
  posts: number;
}