import React from "react";

const DeleteIcon = ({ className = "" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 
      01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0h-1M7 7H6m9 
      0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2"
    />
  </svg>
);

export default DeleteIcon;
