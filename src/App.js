import React, { useState } from "react";
import "./App.css";
import useFetchJobs from "./useFetchJobs";
import { Container, Spinner, Alert } from "react-bootstrap";
import JobCard from "./JobCard";
import JobPagination from "./JobPagination";
import JobSearchForm from "./JobSearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNexPage } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">
        <i className="fab fa-github"></i> Github Jobs
      </h1>
      <JobSearchForm params={params} onParamChange={handleParamChange} />
      <JobPagination page={page} setPage={setPage} hasNexPage={hasNexPage} />
      {loading && (
        <div className="text-center">
          <Spinner
            animation="border"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <Alert variant="danger">
          <strong>Error. Try Refreshing.</strong>
        </Alert>
      )}
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      <JobPagination page={page} setPage={setPage} hasNexPage={hasNexPage} />
    </Container>
  );
}

export default App;
