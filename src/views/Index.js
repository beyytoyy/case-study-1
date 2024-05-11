import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";

import axios from "axios"
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {  
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  CardFooter,
  Media,

} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch('http://localhost:9001/vehicles/best-seller');
        const responseData = await response.json();

        const labels = responseData.map(seller => seller._id)
        const sales = responseData.map(seller => seller.totalSales)
        
        setBestSellers({
          labels: labels,
          datasets: [
            {
              label: "Top Sales",
              data: sales,
              fill: true,
              backgroundColor: "#1d7b76",
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };

    fetchBestSellers();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales data
        const response = await fetch('http://localhost:9001/customers/sales-data');
        const responseData = await response.json();

        // Generate an array of short month names for the entire year
      const labels = Array.from({ length: 12 }, (_, monthIndex) => {
        const monthName = new Date(2020, monthIndex, 1).toLocaleString('default', { month: 'short' });
        return monthName;
      });

      // Initialize sales data array with zeros
      const sales = Array(12).fill(0);

      // Process sales data to map it to the corresponding month
      responseData.labels.forEach((label, index) => {
        const dateParts = label.split('-');
        const monthIndex = parseInt(dateParts[1], 10) - 1; // Month index starts from 0
        sales[monthIndex] += responseData.datasets[0].data[index];
      });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, " rgb(42,21,128)");
        gradientStroke.addColorStop(0.1, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)");

        // Update sales data state
        setSalesData({
          labels: labels,
          datasets: [
            {
              label: responseData.datasets[0].label,
              data: sales,
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1a43bf",
              borderWidth: 4,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 0,
              pointHoverRadius: 0,
              pointHoverBorderWidth: 0,
              pointRadius: 4,
            },
          ],
        });

      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid >
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow" style={{ background: '#00172D' }}>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-white ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={salesData}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card style={{ background: '#fef9ff3', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)'}}>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Top Sales</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={bestSellers}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Row>
        </Row>
        </Row>
      </Container>
    </>
  );
};

export default Index;
