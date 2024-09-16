import { render } from '@testing-library/react';
import { BarChart, Legend, Text, LabelList, Label, Bar, Rectangle, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [{name: 'Student A', grade: 10},
//     {name: 'Student B', grade: 50},
//     {name: 'Student C', grade: 20},
//     {name: 'Student D', grade: 90}];

interface ChartProps {
    width: number,
    height: number,
    data: Array<Object>
}

export const RenderBarChart = ({width, height, data} : ChartProps) => {
    return (
        <ResponsiveContainer width={"80%"} height={"90%"}>
            <BarChart
                width={width}
                height={height}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="name" >
                    <Label value="Students" offset={-10} position="insideBottom" />
                </XAxis> */}

                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip />
                <Legend />
                {/* <Bar dataKey="name" fill="#cf7793" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
                <Bar 
                    dataKey="grade" 
                    fill="#f1a5ad" 
                    animationBegin={0}
                    animationDuration={600}
                    animationEasing="ease-in"
                    background={false} 
                    activeBar={<Rectangle fill="#cf7793" stroke="purple" />} 
                >
                </Bar>

            </BarChart>
        </ResponsiveContainer>
    )
}

export const RenderLineChart = ({width, height, data} : ChartProps) => {
    return(
        <div className="graph" style={{}}>
            <LineChart width={width} height={height} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="grade" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis /> 
                <Tooltip />
            </LineChart>
        </div>
    )
};

  
