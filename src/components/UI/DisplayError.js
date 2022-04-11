import AlertIcon from "./AlertIcon";

export default function DisplayError(props) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center error-message">
      <AlertIcon />
      <span className="sr-only mt-2">{props.message}</span>
    </div>
  );
}
