import React, { useState,useEffect } from "react";
import "./ShortUrl.css";
import axios from "axios";

function ShortUrl() {
  const [url, setUrl] = useState("");

  const [links, setLinks] = useState([]);

  const loadTask = async () => {
    const { data } = await axios.get("/shorturls");
    setLinks(data?.data);
  };
  useEffect(() => {
    loadTask();
  }, []);

  const addUrl = async () => {
    const { data } = await axios.post("/shortUrls", {
      url: url,
    });
    alert(data?.message);
    setUrl("");
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
                  <h4 className="text-center mt-3 mb-4">Add Full Url</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter FullUrl"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                    />
                  </div>

                  <button className="btn btn-warning w-100 mb-3" type="button"
                  onClick={addUrl}>
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
                    <h5>{link?.url}</h5>
                    {/* <p>{link?.short}</p> */}
                    {/* <span
                      className="delete-button"
                      onClick={() => {
                        deleteTask(task?._id);
                      }}
                    >
                      {" "}
                      ❌
                    </span> */}
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
