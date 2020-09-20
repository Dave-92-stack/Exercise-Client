import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import EditForm from '../EditForm/EditForm'

class EditExercise extends Component {
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
      updated: null,
      user: props.user
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/exercises/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    })
      .then(res => this.setState({ exercise: res.data.exercise }))
      .catch(console.error)
  }
  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedExercise = Object.assign({}, prevState.exercise, updatedField)
      return { exercise: editedExercise }
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    axios({
      url: `${apiUrl}/exercises/${this.props.match.params.id}`,
      method: 'PATCH',
      data: { exercise: this.state.exercise },
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Exercise log updated!',
        message: messages.editExerciseSuccess,
        variant: 'success'
      }))
      .then(res => this.setState({ updated: true }))

      .catch(() =>
        msgAlert({
          heading: 'Exercise failed to update!',
          message: messages.editExerciseFailure,
          variant: 'danger'
        })
      )
  }

  handleDelete = () => {
    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/exercises/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    })
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Exercise log deleted successfully!',
        message: messages.deleteExerciseSuccess,
        variant: 'success'
      }))
  }
  render () {
    const { exercise, updated } = this.state
    const { handleChange, handleSubmit, handleDelete } = this
    if (updated) {
      return <Redirect to='/my-exercises' />
    }
    return (
      <EditForm
        exercise={exercise}
        handleDelete={handleDelete}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/exercises'
      />
    )
  }
}
export default EditExercise
