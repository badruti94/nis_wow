import { Card, Col } from "reactstrap"

const List = (props) => {
    const { img, title, author } = props
    return (
        <Col className='col-md-3 mt-3'>
            <Card style={{ width: '100%' }} >
                <img src={'http://localhost:3000/' + img} alt="" />
            </Card>
            <p className='mt-3 fw-bold fs-5' >{title}</p>
            <p className='mt-3 fw-bold fs-6 text-secondary' >{author}</p>
        </Col>
    )
}

export default List