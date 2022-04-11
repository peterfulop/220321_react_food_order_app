export default function DisplayAlert(props) {
  return (
    <div
      className={`alert alert-${props.color} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{props.strong}</strong> {props.message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
