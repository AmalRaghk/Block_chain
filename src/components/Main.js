import React, { Component } from "react";
import { convertBytes } from "./helpers";
import moment from "moment";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-2 text-center p-5 bg-gray-800">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 col-md-12 col-sm-12 p-5"
          >
            <div className="content card bg-gray-700 mx-auto max-w-lg">
              <h1 className="text-dark text-monospace p-1">
                <b>FileChain</b>
              </h1>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const description = this.fileDescription.value;
                  this.props.uploadFile(description);
                }}
              >
                <div className="flex flex-col items-center justify-center mb-6">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={this.props.captureFile}
                    />
                  </label>

                  <input
                    id="fileDescription"
                    type="text"
                    ref={(input) => {
                      this.fileDescription = input;
                    }}
                    className="form-control text-monospace mt-6"
                    placeholder="description..."
                    required
                  />
                </div>
                <button
                  type="submit"
                 className="btn-primary btn-block"
                >
                  Upload!
                </button>
              </form>

              
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;