import React from "react";

const JobCard = ({ jobTitle, companyName, jobDescription }: any) => {
  return (
    <li className="animeLeft">
      <div>
        <h3>{jobTitle}</h3>
        <span>{companyName}</span>
      </div>
      <div>
        <p>
          {jobDescription.replace(/<[^>]*>/g, " ").slice(0, 280)}
          ...
        </p>
      </div>
      <button>View</button>
    </li>
  );
};

export default JobCard;
