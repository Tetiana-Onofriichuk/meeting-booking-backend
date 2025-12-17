import { isCelebrateError } from 'celebrate';

export const errorHandler = (error, req, res, next) => {
  if (isCelebrateError(error)) {
    const details = {};

    for (const [segment, joiError] of error.details.entries()) {
      details[segment] = joiError.details.map((d) => d.message);
    }

    return res.status(400).json({
      message: 'Validation error',
      errors: details,
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid resource identifier',
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Invalid data',
      errors: error.errors,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error',
  });
};
