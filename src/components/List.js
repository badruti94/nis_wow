import { useNavigate } from "react-router-dom"
import { Card, Col } from "reactstrap"
import { API } from '../config/api'

const List = (props) => {
    const { id, img, title, author, setAlert = false } = props
    const navigate = useNavigate()

    const handleBookClick = e => {
        try {
            (async () => {
                const userId = JSON.parse(localStorage.getItem('user')).id
                const response = await API.get(`is-subcribed/${userId}`);
                if (!response.data.data.isSubcribed) {
                    setAlert({ display: true })
                } else {
                    navigate('/detail/' + id)
                }
            })()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Col className='col-md-3 mt-3'>
            <Card style={{ width: '100%' }} onClick={handleBookClick}>
                <img src={'http://localhost:3000/uploads/' + img} alt="" />
            </Card>
            <p className='mt-3 fw-bold fs-5' >{title}</p>
            <p className='mt-3 fw-bold fs-6 text-secondary' >{author}</p>
        </Col>
    )
}

export default List