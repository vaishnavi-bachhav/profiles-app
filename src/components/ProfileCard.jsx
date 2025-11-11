import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button";

export default function ProfileCard({ name, likes, onLike }) {

    const initials = name
        ? name.split(' ').map(n => n[0].toUpperCase()).join('').slice(0, 2)
        : '?';

    return (
        <Card className="border-0 shadow-sm profile-card text-center">
            <Card.Body>
                {/* Avatar Circle */}
                <div className="mx-auto mb-3 d-flex align-items-center justify-content-center avatar">
                    {initials}
                </div>
                <Card.Title className="fw-semibold mb-2">{name}</Card.Title>
                {/* Likes Display */}
                <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                    <Badge bg="info" className='p-2' pill>
                        {likes} ❤️
                    </Badge>
                </div>
                <Button variant="outline-dark"
                    className='like-button fw-bold'
                    size="sm"
                    onClick={onLike}
                >👍Like</Button>
            </Card.Body>
        </Card>
    );
}