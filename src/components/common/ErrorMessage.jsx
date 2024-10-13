import PropTypes from "prop-types";

function ErrorMessage({ message }) {
  return message ? <p>{message}</p> : null;
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
