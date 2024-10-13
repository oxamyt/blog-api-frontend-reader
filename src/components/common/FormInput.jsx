function FormInput({ label, type, value, onChange, id }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} required />
    </div>
  );
}

export default FormInput;
