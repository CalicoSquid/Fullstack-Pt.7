export default function Button({ name, label, onClick, type, loading }) {
  return (
    <button
      disabled={loading || false}
      type={type}
      className={name}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
