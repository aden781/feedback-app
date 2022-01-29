import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const res = await fetch('/feedback?_sort=id&dec')
    const data = await res.json()

    setFeedback(data)
    setLoading(false)
  }

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  const deleteFeedback = async (id) => {
    if(window.confirm("Are you sure you want to delete?")){
      await fetch(`/feedback/${id}`, {method: 'DELETE'} )
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await res.json()

    setFeedback([data, ...feedback])
  }

  const updateFeedback = async (id, updItem) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })

    const data = await res.json()
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item )))
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        loading,
        deleteFeedback,
        addFeedback ,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
