import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props

  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-heading">Vaccination By age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="50%"
          data={vaccinationByAgeData}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill=" #64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontSize: 12,
            fontFamily: 'Roboto',
            textAlign: 'center',
            paddingTop: 20,
          }}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
