import {Button, Card, Form, Nav} from "react-bootstrap";

const Login = () => {
    return (
        <div>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember this login" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                        <Card.Text> Don't have an account?
                            <Nav.Link href="./register">Register Here</Nav.Link>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;