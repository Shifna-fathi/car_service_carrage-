import React, { useState } from 'react';

export default function CustomerFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ rating: '', comments: '' });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    if (!form.rating) return;
    setFeedbacks([...feedbacks, form]);
    setForm({ rating: '', comments: '' });
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Customer Feedback</h2>
      <form onSubmit={submit} className="mb-6">
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Rating</label>
          <select name="rating" value={form.rating} onChange={handle} className="border rounded-lg px-4 py-2 w-full">
            <option value="">Select Rating</option>
            {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Comments</label>
          <textarea name="comments" value={form.comments} onChange={handle} className="border rounded-lg px-4 py-2 w-full" placeholder="Your feedback..." />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Submit</button>
      </form>
      <h3 className="text-lg font-semibold text-blue-600 mb-2">Feedback History</h3>
      <ul className="space-y-2">
        {feedbacks.length === 0 ? <li className="text-gray-500">No feedback yet.</li> :
          feedbacks.map((fb, idx) => (
            <li key={idx} className="bg-gray-100 rounded-lg p-3">
              <div><b>Rating:</b> {fb.rating} Star{fb.rating > 1 ? 's' : ''}</div>
              <div><b>Comments:</b> {fb.comments}</div>
            </li>
          ))}
      </ul>
    </div>
  );
} 