import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete, MdAdd, MdRemove } from './commonImports';

export const DeleteButton = ({ onClick }) => (
  <button className="btn border-0 rounded-2 shadow-sm mx-2" onClick={onClick}>
    <MdDelete style={{ color: 'red' }} />
  </button>
);

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const IncreaseQuantityButton = ({ onClick }) => (
  <button className="btn border-0 rounded-2 shadow-sm mx-2" onClick={onClick}>
    <MdAdd style={{ color: 'black' }} />
  </button>
);

IncreaseQuantityButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const DecreaseQuantityButton = ({ onClick }) => (
  <button className="btn border-0 rounded-2 shadow-sm mx-2" onClick={onClick}>
    <MdRemove style={{ color: 'black' }} />
  </button>
);

DecreaseQuantityButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
