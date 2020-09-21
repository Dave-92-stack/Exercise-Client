import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'

class DeleteExercise extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exercise: null,
      deleted: true,
      user: props.user
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/exercises/${this.props.match.params.id}`)
      .then(res => this.setState({ exercise: res.data.exercise }))
      .catch(console.error)
  }
  destroyExercise = () => {
    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/exercises/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }
  render () {
    const { exercises, deleted } = this.setState
    if (!exercises) {
      return <p>No content...</p>
    }
    if (deleted) {
      return <Redirect to={'/my-exercises/'} />
    }
    return (
      <div>
        <h4>{exercise.date}</h4>
        <button onClick={this.destroyExercise}>Delete Exercise</button>
        <Link to={`/exercises/${this.props.match.params.id}/edit`}></Link>
        <Link to='/exercises'>Back to exercise logs</Link>
      </div>
    )
  }
}

export default DeleteExercise
