import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { profiles } from './data/profiles.js';
import ProfileCard from './components/ProfileCard.jsx';
import ProfileTable from './components/ProfileTable.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';

export default function App() {
  // -----------------------------
  // State Management
  // -----------------------------
  const [people, setPeople] = useState(profiles);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // -----------------------------
  // Utility: open/close modals
  // -----------------------------
  const handleClose = () => {
    setShow(false);
    setEditingProfile(null);
    setErrors({});
    setName('');
  };

  // -----------------------------
  //  Like Button Logic
  //  -----------------------------
  const handleLike = (id) => {
    setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  }

  // -----------------------------
  // Edit Logic
  // -----------------------------
  const handleEdit = (person) => {
    setEditingProfile(person);
    setName(person.name);
    setShow(true);
  };

  // -----------------------------
  // Delete Confirmation Logic
  // -----------------------------
  const confirmDelete = (person) => {
    setDeleteTarget(person);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setPeople(ps => ps.filter(p => p.id !== deleteTarget.id));
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  // -----------------------------
  // Form Validation
  // -----------------------------
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

  // -----------------------------
  // Form Submission
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    if (!validateForm(form)) return;

    if (editingProfile) {
      // Update existing profile
      setPeople(ps =>
        ps.map(p =>
          p.id === editingProfile.id ? { ...p, name: name } : p
        )
      );
    } else {
      // Add new profile
      const newProfile = {
        id: people.length ? Math.max(...people.map(p => p.id)) + 1 : 1,
        name: name,
        likes: 0
      };
      setPeople(ps => [...ps, newProfile]);
    }

    form.reset();
    handleClose();
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
      {/* Add Profile Button */}
      <Button variant="primary" className='' onClick={() => setShow(true)}>
        Add Profile
      </Button>
      {/* Add/Edit Profile Modal */}
      <Modal show={show} onHide={handleClose}>
        <Form noValidate onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProfile ? 'Edit Profile' : 'Add Profile'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{editingProfile ? 'Update the profile name below.' : 'Fill out the form below to add a new profile.'}</p>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label className='fw-bold'>Name</Form.Label>
              <Form.Control name='name' value={name} type="text" placeholder="Enter your name" onChange={(e) => setName(e.currentTarget.value)} isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              {editingProfile ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation */}
      <DeleteConfirmation show={showDeleteModal} onCancel={() => setShowDeleteModal(false)} onConfirm={handleConfirmDelete} deleteTarget={deleteTarget?.name} />

      <hr />
      {/* Data Grid Table */}
      <ProfileTable people={people} onEdit={handleEdit} onDelete={confirmDelete} />

      <hr />
      {/* Profile Cards */}
      <Row xs={1} md={2} lg={3} className="g-3">
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} onLike={() => handleLike(p.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}