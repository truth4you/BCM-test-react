import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const List = () => {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const questions = JSON.parse(localStorage.getItem("questions")) ?? []
        if(questions.length>0) {
          setQuestions(questions)
        }
        setLoading(false)
    }, [loading])
    const handleDelete = (i) => {
        questions.splice(i,1)
        localStorage.setItem("questions",JSON.stringify(questions))
        setQuestions([...questions])
        toast.success('Successfuly deleted!')
    }
    return (
        <>
            <h1>
                Questions
                <span className="pull-right">
                    <Link to="/add" className="btn btn-sm btn-primary">
                        Add new question
                    </Link>
                </span>
            </h1>
            <ul className="mt-3">
                {
                    questions.map((question,i) => (
                        <li key={i} className="d-flex align-items-center justify-content-between underlined">
                            <span>{question.title}</span>
                            <span>
                                <Link to={`/edit/${i+1}`} className="btn btn-sm link-primary">Edit</Link>
                                <button className="btn btn-sm link-danger" onClick={()=>handleDelete(i)}>Delete</button>
                            </span>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default List