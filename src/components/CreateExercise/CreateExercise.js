import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ExerciseForm from '../ExerciseForm/ExerciseForm'

import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class CreateExercise extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exercise: {
        date: '',
        benchPressWeight: '',
        benchPressReps: '',
        backSquatWeight: '',
        backSquatReps: ''
      },
      createdId: null,
      user: props.user
    }
  }

  handleChange = exercise => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [exercise.target.name]: exercise.target.value }
      const editedExercises = Object.assign({}, prevState.exercise, updatedField)
      return { exercise: editedExercises }
    })
  }

  handleSubmit = exercise => {
    event.preventDefault()
    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/exercises`,
      method: 'POST',

      data: { exercise: this.state.exercise },
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    })
      .then(res => this.setState({ createdId: res.data.exercise._id }))
      .then(() => msgAlert({
        heading: 'Exercise Logged!',
        message: messages.createExerciseSuccess,
        variant: 'success'
      }))
      .catch(() => {
        msgAlert({
          heading: 'Exercise failed to log!',
          message: messages.createExerciseFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { createdId } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId) {
      return <Redirect to='/exercises' />
    }

    return (
      <ExerciseForm
        exercise={exercise}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    )
  }
}

export default CreateExercise
