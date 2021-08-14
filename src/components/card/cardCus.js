import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./styles";
import Arrow from "../arrow";
import { observer } from "mobx-react";
const CardCus = ({ card, handleVote }) => {
  return (
    <div className="d-flex justify-content-center">
      <Card style={styles.container}>
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <div className="d-flex justify-content-center">
            {card.type === "image" && (
              <img
                style={styles.img}
                variant="top"
                src={card.src}
                alt={card.title}
              />
            )}
            {card.type === "video" && (
              <iframe
                style={styles.iframe}
                src={card.src}
                title={card.title}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          <Button
            variant="light"
            className="btn btn-outline-success mx-2"
            onClick={() => handleVote(true, card.postId)}
          >
            {Arrow(true)}
          </Button>
          <span style={styles.text}>{card.upVote} K</span>

          <Button
            variant="light"
            className="btn btn-outline-primary mx-2"
            onClick={() => handleVote(false, card.postId)}
          >
            {Arrow(false)}
          </Button>
          <span style={styles.text}>{card.downVote} K</span>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(CardCus);
