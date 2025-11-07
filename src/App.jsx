import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function App() {
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

   // Increment likes for a profile
  const likePeople = (id) => {
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  }

  const validateForm = (form) => {
    const formData = new FormData(form);
    const currentName = formData.get("name").trim();
    const newErrors = {};

    if (currentName === '') {
      newErrors.name = 'Name is required';
    }
    else if (people.some(p => p.name.toLowerCase() === currentName.toLowerCase())) {
      newErrors.name = 'Name must be unique';
    };

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
        e.preventDefault();

    const form = e.target;
    const formIsValid = validateForm(form);
    setValidated(true);
    if (formIsValid) {
      const newProfile = {
        id: people.length ? Math.max(...people.map(p => p.id)) + 1 : 1,
        name: name,
        likes: 0
      };
      setPeople(ps => [...ps, newProfile]);
      setName('');
      setErrors({});
      setValidated(false);
      form.reset();
    }
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control name='name' value={name} type="text" placeholder="Enter your name" onChange={(e) => setName(e.currentTarget.value)} isInvalid={!!errors.name} />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type='submit' className="my-2">Add Profile</Button>
      </Form>
      <hr />
      <Row xs={1} md={2} lg={3} className="g-3">
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} onLike={() => likePeople(p.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}