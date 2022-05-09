import { Link, useNavigate, useParams } from "react-router-dom"
import { BsFillTrashFill, BsPlusCircleFill } from "react-icons/bs"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState()
  const [options, setOptions] = useState([...Array(5)])

  useEffect(() => {
    const questions = JSON.parse(localStorage.getItem("questions")) ?? []
    if(questions.length+1>id) {
      setTitle(questions[id-1].title)
      setOptions(questions[id-1].options)
    }
  }, [id])
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeOption = (e,i) => {
    options[i] = e.target.value
    setOptions([...options])
  }
  const handleSave = () => {
    if(!title) 
      toast.error('You have to fill Question Title field.')
    else if(options.length==0) 
      toast.error('You have to add at least one option.')
    else if(options.filter(o=>!o).length) 
      toast.error('You have to fill all Options field.')
    else {
      const questions = JSON.parse(localStorage.getItem("questions")) ?? []
      if(questions.length < id) {
        toast.error(`Cannot update question at ${i}.`)
        return
      }
      questions[id-1] = {
        title, options
      }
      localStorage.setItem("questions",JSON.stringify(questions))
      toast.success('Successfuly saved!')
      setTimeout(() => navigate("/", {replace:true}), 2000)
    }
  }
  const handleDelete = (i) => {
    options.splice(i,1)
    setOptions([...options])
  }
  const handleAdd = () => {
    if(options.length>=6) {
      toast.warn('Cannot add options more than 6.')
      return
    }
    options.push('')
    setOptions([...options])
  }
  return (
    <>
      <h1>
        Edit Question
        <span className="pull-right">
          <Link to="/"><button className="btn btn-sm btn-secondary">Cancel</button></Link>
          {' '}
          <button className="btn btn-sm btn-primary" onClick={handleSave}>Save</button>
        </span>
      </h1>
      <div className="mb-1">
        <label>Question Title</label>
        <input className="form-control" value={title} onChange={handleChangeTitle}/>
      </div>
      <div>
        <label>Options</label>
        <ul>
          {options.map((option,i) => (
            <li key={i} className="d-flex mb-1">
              <input className="form-control" value={option} onChange={(e)=>handleChangeOption(e,i)}/>
              <button className="btn btn-default d-flex align-items-center gap-2" onClick={()=>handleDelete(i)}>
                <BsFillTrashFill/>
                Delete
              </button>
            </li>
          ))}
          <li key={'new'} className="">
            <a className="btn btn-sm d-flex align-items-center gap-2" onClick={handleAdd}><BsPlusCircleFill/> Add New Option</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Edit