import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const ChartSection = ({ allProduct, usersLength, orderLength }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
      <div className="xl:col-span-2 md:min-h-[400px]  min-h-[300px] bg-white/80 border border-slate-200/50  hover:shadow-xl hover:shadow-slate-200/20  p-6 rounded-2xl ">
        <Bar 
          data={{
            labels: allProduct?.map((product) => product.label),
            datasets: [
              {label: "all category Product",
                data: allProduct.map((product) => product.dataLength),
                backgroundColor: ["rgba(43, 73, 220,.9)","rgba(225, 176, 12,.9)","rgba(264, 135, 135,.9)","rgba(164, 235, 235,.9)",],
                borderColor: ["rgba(43, 73, 220,.9)","rgba(225, 176, 12,.9)","rgba(264, 135, 135,.9)","rgba(164, 135, 135,.9)",],
              }],
          }} />
      </div>
      <div className="md:min-h-[400px] min-h-[300px] bg-white/80 border border-slate-200/50  hover:shadow-xl hover:shadow-slate-200/20  p-6 rounded-2xl ">
        <Doughnut
          data={{labels: ["users", "orders"],datasets: [{label: "total Orders",data: [usersLength, orderLength]}],}} />
      </div>
    </div>
  )};

export default ChartSection;
