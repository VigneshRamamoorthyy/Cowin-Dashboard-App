import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationByDayData} = props
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="vaccination-by-coverage-container">
      <h1 className="vaccination-coverage-header">Vaccination Coverage</h1>
      <BarChart
        data={vaccinationByDayData}
        margin={{
          top: 20,
        }}
        width={1000}
        height={300}
      >
        <XAxis
          dataKey="vaccineData"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: '14px',
          }}
        />

        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0,
          }}
        />

        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="10%"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="10%"
          radius={[5, 5, 0, 0]}
        />
        <Legend
          wrapperStyle={{
            fontSize: 12,
            fontFamily: 'Roboto',
            textAlign: 'center',
            paddingTop: 20,
          }}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
