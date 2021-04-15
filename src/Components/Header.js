import React from "react";

const Header = ({ history }) => {
  const handleSignOut = () => {
    history.push("/login");
    localStorage.clear();
  };

  return (
    <div>
      <header>
        <h3>Welcome Rakesh </h3>
        <div>
          <button
            type="button"
            className="btn btn-info sign-out-button"
            onClick={handleSignOut}
          >
            Log Out
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
