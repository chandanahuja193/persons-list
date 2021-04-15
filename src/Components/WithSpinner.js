import React from 'react';
import PropTypes from "prop-types";

const index = ({loading, children,...other}) => {
  return (
    <React.Fragment>
      {
        (loading) ?
          (
            <div className="SpinnerOverlay">
              <div className="SpinnerContainer" {...other} />
            </div>
          )
          :
          (<div>
            {children}
          </div>)
      }
    </React.Fragment>
  )
};

index.propTypes = {
  loading: PropTypes.bool.isRequired,
  children : PropTypes.node.isRequired
};

export default index;
