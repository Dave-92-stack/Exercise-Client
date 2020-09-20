import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Exercises extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exercises: [],
      user: props.user
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/userexercises`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      },
      data: { ownerExercise: this.state.user._id }
    })
      .then(res => this.setState({ exercise: res.data.events }))
  }

  render () {
    const exercises = this.state.exercises.map(exercise => (
      <Link key={exercise._id} to={`/exercises/${exercise._id}`}>
        <div className="card cardHover mb-4 card-body">
          <div className="card-header mb-4" >
            {exercise.benchPressWeight}
          </div>
          <div className="card-text mb-4">
            {exercise.benchPressReps}
          </div>
          <div className="card-text mb-4">
            {exercise.backSquatWeight}
          </div>
          <div className="card-text mb-4">
            {exercise.backSquatReps}
          </div>
        </div>
      </Link>
    ))

    return (
      <div className="my-Exercises">
        <h4 className="myLoggedExercise">My Logged Exercises </h4>
        {exercises}
      </div>
    )
  }
}

export default Exercises
