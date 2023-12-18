import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const LecturerCard = (props) => {
  return (
    <Row xs={1} md={2} lg={4} className="g-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Col key={index}>
          <Card className="w-95 bg-black rounded-t-xl">
            <Card.Body>
              <Card.Title className="text-white text-2xl">{props.name}</Card.Title>
              <Card.Text className="overline text-white">Lecturer email: {props.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default LecturerCard;
