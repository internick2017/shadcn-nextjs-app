// Chart data for various dashboard components

export interface ChartDataPoint {
  [key: string]: string | number
}

export interface BarChartDataPoint {
  month: string
  desktop: number
  mobile: number
}

export interface AreaChartDataPoint {
  month: string
  sales: number
  revenue: number
}

export interface PieChartDataPoint {
  name: string
  value: number
}

// Bar Chart Data
export const barChartData: BarChartDataPoint[] = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

// Area Chart Data
export const areaChartData: AreaChartDataPoint[] = [
  { month: "Jan", sales: 2400, revenue: 1800 },
  { month: "Feb", sales: 1398, revenue: 2100 },
  { month: "Mar", sales: 9800, revenue: 2900 },
  { month: "Apr", sales: 3908, revenue: 2780 },
  { month: "May", sales: 4800, revenue: 1890 },
  { month: "Jun", sales: 3800, revenue: 2390 },
]

// Pie Chart Data
export const pieChartData: PieChartDataPoint[] = [
  { name: "Web", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Desktop", value: 200 },
  { name: "Other", value: 100 },
] 