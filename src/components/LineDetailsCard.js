import React from 'react';
import PropTypes from 'prop-types';

export default function LineDetailsCard({ line }) {
  return (
    <div className="line-details-card">
      <div className="line-details-forwards">
        <div>
          {line.LW.name || 'LW'}
        </div>
      </div>
      <div className="line-details-defenseman">
        <div>
          hi
        </div>
      </div>
      <div className="line-details-goalie">
        <div>
          hi
        </div>
      </div>
    </div>
  );
}

LineDetailsCard.propTypes = {
  line: PropTypes.shape().isRequired,
};
