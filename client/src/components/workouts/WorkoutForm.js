import React, { useState } from 'react';

const WorkoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'cardio',
    name: '',
    duration: '',
    calories: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const { type, name, duration, calories, date, notes } = formData;

  const workoutTypes = [
    { value: 'cardio', label: 'Cardio' },
    { value: 'strength', label: 'Strength Training' },
    { value: 'flexibility', label: 'Flexibility & Mobility' },
    { value: 'sports', label: 'Sports & Recreation' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      ...formData,
      name: '',
      duration: '',
      calories: '',
      notes: ''
    });
  };

  return (
<form className="workout-form p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
  <h4 className="text-center mb-3">Add your Workout</h4>

  {/* Workout Type */}
  <div className="mb-3">
    <label htmlFor="type" className="form-label">Workout Type</label>
    <select id="type" name="type" className="form-select" value={type} onChange={handleChange} required>
      {workoutTypes.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>

  {/* Workout Name */}
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Workout Name</label>
    <input type="text" id="name" name="name" className="form-control" value={name} onChange={handleChange} placeholder="e.g., Running, Weightlifting, Yoga" required />
  </div>

  {/* Duration & Calories (Same Row) */}
  <div className="row">
    <div className="col-md-6 mb-3">
      <label htmlFor="duration" className="form-label">Duration (minutes)</label>
      <input type="number" id="duration" name="duration" className="form-control" value={duration} onChange={handleChange} placeholder="Enter duration" min="1" required />
    </div>
    <div className="col-md-6 mb-3">
      <label htmlFor="calories" className="form-label">Calories Burned</label>
      <input type="number" id="calories" name="calories" className="form-control" value={calories} onChange={handleChange} placeholder="Estimated calories" min="0" />
    </div>
  </div>

  {/* Date */}
  <div className="mb-3">
    <label htmlFor="date" className="form-label">Date</label>
    <input type="date" id="date" name="date" className="form-control" value={date} onChange={handleChange} required />
  </div>

  {/* Notes */}
  <div className="mb-3">
    <label htmlFor="notes" className="form-label">Notes</label>
    <textarea id="notes" name="notes" className="form-control" value={notes} onChange={handleChange} placeholder="Additional details, how you felt, etc." rows="3"></textarea>
  </div>

  {/* Submit Button */}
  <button type="submit" className="btn btn-primary w-100">Log Workout</button>
</form>


  );
};

export default WorkoutForm;