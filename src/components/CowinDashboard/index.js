import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationByDayData: [],
    vaccinationByAgeData: [],
    vaccinationByGenderData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchCovidVaccinationData()
  }

  formatVaccinationByDayData = data => ({
    dose1: data.dose_1,
    dose2: data.dose_2,
    vaccineData: data.vaccine_date,
  })

  fetchCovidVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const data = await response.json()

      const formattedVaccinationByDayData = data.last_7_days_vaccination.map(
        eachData => this.formatVaccinationByDayData(eachData),
      )

      this.setState({
        vaccinationByDayData: formattedVaccinationByDayData,
        vaccinationByAgeData: data.vaccination_by_age,
        vaccinationByGenderData: data.vaccination_by_gender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccesView = () => {
    const {
      vaccinationByAgeData,
      vaccinationByDayData,
      vaccinationByGenderData,
    } = this.state
    return (
      <>
        <div className="website-logo-name-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="website-name">Co-WIN</h1>
        </div>
        <h1 className="cowin-dashboard-header">CoWIN Vaccination in India</h1>

        <VaccinationCoverage vaccinationByDayData={vaccinationByDayData} />
        <VaccinationByGender
          vaccinationByGenderData={vaccinationByGenderData}
        />
        <VaccinationByAge vaccinationByAgeData={vaccinationByAgeData} />
      </>
    )
  }

  renderInProgressView = () => (
    <>
      <div data-testid="loader" className="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <div className="website-logo-name-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
          className="website-logo"
        />
        <h1 className="website-name">Co-WIN</h1>
      </div>
      <h1 className="cowin-dashboard-header">CoWIN Vaccination in India</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-msg">Something went wrong</h1>
    </>
  )

  cowinDashboardView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccesView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="responsive-container">{this.cowinDashboardView()}</div>
      </div>
    )
  }
}

export default CowinDashboard
