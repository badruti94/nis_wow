import { useNavigate } from "react-router-dom"
import { Card, Col } from "reactstrap"

const List = (props) => {
    const { id, img, title, author, setAlert = false } = props
    const navigate = useNavigate()

    const handleBookClick = e => {
        const isSubcribe = JSON.parse(localStorage.getItem('is_subcribe'))
        if (!isSubcribe) {
            setAlert(true)
        } else {
            navigate('/detail/' + id)
        }
    }

    return (
        <Col className='col-md-3 mt-3'>
            <Card style={{ width: '100%' }} onClick={handleBookClick}>
                <img src={'http://localhost:3000/' + img} alt="" />
            </Card>
            <p className='mt-3 fw-bold fs-5' >{title}</p>
            <p className='mt-3 fw-bold fs-6 text-secondary' >{author}</p>
        </Col>
    )
}

export default List