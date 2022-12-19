import Head from "next/head";
import Image from "next/image";
import React from "react";
import JobCard from "../../components/Jobs/JobCard";

import styles from "../../styles/Jobs.module.css";

import zippiaLogo from "../../public/zippia-logo.png";

const Jobs = ({ data }: any) => {
  const [filteredJobs, setFilteredJobs] = React.useState<any>();

  const [filterCompany, setFilterCompany] = React.useState("All companies");

  // Get the time of 7 days ago to compare
  const [sevenDaysAgo, SetSevenDaysAgo] = React.useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime()
  );

  const [filterDate, setFilterDate] = React.useState("All time");

  // This Effect will filter the elements with the correspondent company selected
  React.useEffect(() => {
    const newJobs = data.jobs.filter((job: any) => {
      if (job.companyName === filterCompany) return job;
      if (filterCompany === "All companies") return job;
    });
    setFilteredJobs(newJobs);
  }, [filterCompany]);

  // This Effect will filter the elements that time is lower than 7 days
  React.useEffect(() => {
    const newJobs = data.jobs.filter((job: any) => {
      if (new Date(job.postingDate).getTime() < sevenDaysAgo) return job;
      if (filterDate === "All time") return job;
    });
    setFilteredJobs(newJobs);
  }, [filterDate]);

  return (
    <>
      <Head>
        <title>Zippia | Jobs</title>
        <meta name="description" content="Page of jobs from Zippia!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContainer + " animeLeft"}>
        {data.jobs ? (
          <>
            <div className={styles.zippiaLogo}>
              <Image src={zippiaLogo} alt="Zippia Logo" />
            </div>
            <h2>Filters</h2>
            <div className={styles.filterContainer}>
              <select onChange={({ target }) => setFilterCompany(target.value)}>
                <option defaultChecked>All companies</option>
                {data.jobs
                  .map(({ companyName }: any, index: any) => (
                    <option key={index}>{companyName}</option>
                  ))
                  .filter((e: any, k: any) => k < 10)}
              </select>
              <select onChange={({ target }) => setFilterDate(target.value)}>
                <option defaultChecked>All time</option>
                <option>7 days ago</option>
              </select>
            </div>
            <div>
              <h2>Results</h2>
              <ul className={styles.jobsContainer}>
                {filteredJobs
                  ? filteredJobs.map(
                      ({
                        jobId,
                        jobTitle,
                        companyName,
                        jobDescription,
                      }: any) => (
                        <JobCard
                          jobId={jobId}
                          jobTitle={jobTitle}
                          companyName={companyName}
                          jobDescription={jobDescription}
                          key={jobId}
                        />
                      )
                    )
                  : data.jobs
                      .map(
                        ({
                          jobId,
                          jobTitle,
                          companyName,
                          jobDescription,
                        }: any) => (
                          <JobCard
                            jobId={jobId}
                            jobTitle={jobTitle}
                            companyName={companyName}
                            jobDescription={jobDescription}
                            key={jobId}
                          />
                        )
                      )
                      .filter((e: any, k: any) => k < 10)}
              </ul>
              <p className={styles.endList}>End of list</p>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const response = await fetch("https://zippia-jobs-production.up.railway.app/jobs");
  const data = await response.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Jobs;
