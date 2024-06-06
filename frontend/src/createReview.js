import React, {useState} from 'react'
import axios from 'axios'

function createReview({userId}) {
    const [formData, setFormData] = useState ({gameId: '', reviewText:'', rating: ''})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const respone = await axios.post('http://localhost:4000/review/create')
            alert('Review created successfully')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Review</h2>
            <input type="text" name="gameId" placeholder="Game ID" onChange={handleChange} required />
            <textarea type="reviewText" placeholder="Review" onChange={handleChange} required />
            <input type="number" name="rating" placeholder="Rating" onChange={handleChange} required />
            <button type="Submit">Submit Review</button>
        </form>
    )
}

export default createReview