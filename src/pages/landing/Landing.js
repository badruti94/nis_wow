import { Button, Col, Container, Row } from 'reactstrap'
import './landing.css'
import wow from './wow.png'

function Landing() {
    return (
        <div className='landing' >
            <Row className='landing-row' >
                <Col>
                    <Container className='ms-lg-5' style={{ marginTop: '100px' }} >
                        <img src={wow} alt="" srcset="" style={{ width: '400px' }} />
                        <p style={{ width: '400px' }} >Sign-up now and subscribe to enjoy all the cool and latest books - The best book rental service provider in Indonesia</p>
                        <div>
                            <Button className='me-5' color='danger' >Sign Up</Button>
                            <Button className='me-5' color='secondary' >Sign In</Button>
                        </div>
                    </Container>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default Landing;
