import React from 'react'
import { useSearch } from '../context/searchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'

const SearchBar = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.get(`http://localhost:8000/api/products/search/${values.keyword}`)
      setValues({...values,results: {data}})
      navigate("/search")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={values.keyword}
              onChange={(e)=> setValues({...values, keyword: e.target.value})}
             
            />
            <Button onChange={(e)=> setValues({...values, keyword: e.target.value})} variant="light">Search</Button>
          </Form>
    </div>
  )
}

export default SearchBar
