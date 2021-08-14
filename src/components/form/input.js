import { Form } from "react-bootstrap";

const Input = ({ name, type, value, onChange }) => {
  let labelName = name.substr(0, 1).toUpperCase() + name.substr(1);
  let placeHolder = `Enter ${labelName}`;
  if (name === "src") {
    labelName = "Source";
    placeHolder = "https://picsum.photos/200/300";
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>{labelName}</Form.Label>
      <Form.Control
        required
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeHolder}
      />
    </Form.Group>
  );
};

export default Input;
