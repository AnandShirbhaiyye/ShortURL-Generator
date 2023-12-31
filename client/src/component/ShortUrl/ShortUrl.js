import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ShortUrl.css";
import axios from "axios";

function ShortUrl() {
  const [full, setFull] = useState("");

  const [links, setLinks] = useState([]);

  const incrementClickCount = async (urlId) => {
    try {
      const response = await axios.get(`/${urlId}`);
      const { full, clicks } = response.data;

      alert(`URL: ${full}\nClicks: ${clicks}`);
      loadTask();

      // Redirect to the full URL
      window.location.href = full;
    } catch (error) {
      console.error(error);
      // Handle the error case
    }
  };

  const loadTask = async () => {
    const { data } = await axios.get("/shorturls");
    setLinks(data?.data);
  };
  useEffect(() => {
    loadTask();
  }, []);

  const addUrl = async () => {
    const { data } = await axios.post("/shortUrls", {
      full: full,
    });
    alert(data?.message);
    setFull("");
  };

  const deleteTask = async (urlId) => {
    const { data } = await axios.post("/url/delete", {
      urlId: urlId,
    });
    alert(data?.message);
    loadTask();
  };

  return (
    <>
      <div className="container">
        <div className="card shadow-lg mt-5 p-5">
          <div className="text-center mb-4">
            <h2>ShortUrl</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow-sm p-3 mt-5">
                <form>
                  <h4 className="text-center mt-3 mb-4">Add Full Url➕</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter FullUrl"
                      value={full}
                      onChange={(e) => {
                        setFull(e.target.value);
                      }}
                    />
                  </div>

                  <button
                    className="btn btn-warning w-100 mb-3"
                    type="button"
                    onClick={addUrl}
                  >
                    {" "}
                    <b>AddUrl</b>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <div className="url-container shadow-sm p-3 mt-2">
                <h4 className="text-center mt-2 mb-4">All Urls📃</h4>
                {links.map((link) => {
                  return (
                    <div className="card shadow-sm p-1 mt-2">
                      <p>
                        <b>Full URL :</b> {link?.full}
                      </p>
                      {/* <p>
                        <b>Short URL : </b>
                        {link?.short}
                      </p> */}

                      <p>
                        <b>Short URL : </b>
                        <Link
                          to={`/${link?.short}`}
                          onClick={() => incrementClickCount(link?._id)}
                        >
                          {link?.short}
                        </Link>
                      </p>
                      <p>
                        <b>Clicks :</b> {link?.clicks}
                      </p>

                      {/* <p>
                <b>Short URL : </b>
                <span
                  className="short-url"
                  onClick={() => incrementClickCount(link?._id)}
                >
                  {link?.short}
                </span>
              </p>
              <p>
                <b>Clicks :</b> {link?.clicks}
              </p> */}

                      <div
                        className="delete-button"
                        onClick={() => {
                          deleteTask(link?._id);
                        }}
                      >
                        {" "}
                        ❌
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortUrl;
