
import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditForm = ({ exercise, handleSubmit, handleChange, handleDelete }) => {
  return (
    <div className="row2">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Log Workout</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              placeholder='Date'
              value={exercise.date}
              name='date'
              type='date'
              onChange={handleChange}
            />
            <Form.Label>Bench Press Weight</Form.Label>
            <Form.Control
              placeholder='Record the weight you used.'
              value={exercise.benchPressWeight}
              name='benchPressWeight'
              onChange={handleChange}
            />
            <Form.Label>Bench Press Reps</Form.Label>
            <Form.Control
              placeholder='Record your repetitions.'
              value={exercise.benchPressReps}
              name='benchPressReps'
              onChange={handleChange}
            />
            <Form.Label>Back Squat Weight</Form.Label>
            <Form.Control
              placeholder='Record the weight you used.'
              value={exercise.backSquatWeight}
              name='backSquatWeight'
              onChange={handleChange}
            />
            <Form.Label>Back Squat Reps</Form.Label>
            <Form.Control
              placeholder='Record your repetitions.'
              value={exercise.backSquatReps}
              name='backSquatReps'
              onChange={handleChange}
            />
          </Form.Group>
          <Button varient="primary" type="submit">Submit</Button>
          <Button variant="warning" type="button" onClick={handleDelete}>Delete Log</Button><Link to="/my-exercises">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}
export default EditForm
