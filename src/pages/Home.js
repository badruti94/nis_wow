import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import Sidebar from '../components/Sidebar'
import subcribeNow from './subcribe-now.png'

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

const Home = () => {
    return (
        <Container>
            <Row>
                <Sidebar />
                <Col>
                    <Card className='shadow mt-5' style={{ width: '900px' }} >
                        <img src={subcribeNow} alt="" />
                    </Card>
                    <h2 className='mt-4 mb-4' >List Book</h2>
                    <Row>
                        <List
                            img={'buku-1.png'}
                            title={'Serangkai'}
                            author={'Valerie Patkar'}
                        />
                        <List
                            img={'buku-2.png'}
                            title={'Z1 - Sd/Mi Buku Siswa Tematik T'}
                            author={'Afi Yustiyana'}
                        />
                        <List
                            img={'buku-3.png'}
                            title={'Kabar Rahasia Dari Alam Kubu '}
                            author={'DR. Kamil Yusuf Al-Atum'}
                        />
                        <List
                            img={'buku-4.png'}
                            title={'Tess on the Road'}
                            author={'Rachel Hartman'}
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Home