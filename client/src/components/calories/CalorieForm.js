// File: client/src/components/calories/CalorieForm.js
import React, { useState } from 'react';

const CalorieForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    calories: '',
    mealType: 'breakfast',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const { foodName, calories, mealType, date, notes } = formData;

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
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
      foodName: '',
      calories: '',
      notes: ''
    });
  };

  return (
    <form className="calorie-form p-4 border rounded shadow bg-light" onSubmit={handleSubmit}>
    <h4 className="text-center mb-3">Add Food Entry</h4>
  
    {/* Food Item */}
    <div className="mb-3">
      <label htmlFor="foodName" className="form-label">Food Item</label>
      <input
        type="text"
        id="foodName"
        name="foodName"
        value={foodName}
        onChange={handleChange}
        placeholder="e.g., Oatmeal with fruit, Chicken salad"
        className="form-control"
        required
      />
    </div>
  
    {/* Meal Type */}
    <div className="mb-3">
      <label htmlFor="mealType" className="form-label">Meal Type</label>
      <select
        id="mealType"
        name="mealType"
        value={mealType}
        onChange={handleChange}
        className="form-select"
        required
      >
        {mealTypes.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  
    {/* Calories & Date (Same Row) */}
    <div className="row">
      <div className="col-md-6 mb-3">
        <label htmlFor="calories" className="form-label">Calories</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={calories}
          onChange={handleChange}
          placeholder="Calorie count"
          className="form-control"
          min="0"
          required
        />
      </div>
      <div className="col-md-6 mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
    </div>
  
    {/* Notes */}
    <div className="mb-3">
      <label htmlFor="notes" className="form-label">Notes</label>
      <textarea
        id="notes"
        name="notes"
        value={notes}
        onChange={handleChange}
        placeholder="Additional details, portion size, etc."
        className="form-control"
        rows="3"
      />
    </div>
  
    {/* Submit Button */}
    <button type="submit" className="btn btn-primary w-100">Add Food Entry</button>
  </form>
  
  );
};

export default CalorieForm;
