import PropTypes from "prop-types";

function ErrorMessage({ message }) {
  return message ? (
    <p className="text-red-600 mb-5 bg-red-100 border border-red-400 p-2 rounded-lg text-sm">
      {message}
    </p>
  ) : null;
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
