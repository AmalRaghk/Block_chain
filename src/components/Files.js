import React from "react";
import { convertBytes } from "./helpers";
import moment from "moment";

const Files = ({ files }) => {
  return (
    <div style={{ width: "max-content", margin: "auto" }}>
      <table
        className="table-sm table-bordered text-monospace"
        style={{ width: "1000px", maxHeight: "450px" }}
      >
        <thead style={{ fontSize: "15px" }}>
          <tr className="bg-white text-dark">
            <th scope="col" style={{ width: "10px" }}>
              id
            </th>
            <th scope="col" style={{ width: "200px" }}>
              name
            </th>
            <th scope="col" style={{ width: "230px" }}>
              description
            </th>
            <th scope="col" style={{ width: "120px" }}>
              type
            </th>
            <th scope="col" style={{ width: "90px" }}>
              size
            </th>
            <th scope="col" style={{ width: "90px" }}>
              date
            </th>
            <th scope="col" style={{ width: "120px" }}>
              hash/view/get
            </th>
          </tr>
        </thead>
        {files.map((file, key) => {
          return (
            <thead style={{ fontSize: "12px" }} key={key}>
              <tr className="bg-dark">
                <td>{file.fileId}</td>
                <td>{file.fileName}</td>
                <td>{file.fileDescription}</td>
                <td>{file.fileType}</td>
                <td>{convertBytes(file.fileSize)}</td>
                <td>
                  {moment.unix(file.uploadTime).format("h:mm:ss A M/D/Y")}
                </td>
                <td>
                  <a
                    href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {file.fileHash.substring(0, 10)}...
                  </a>
                </td>
              </tr>
            </thead>
          );
        })}
      </table>
    </div>
  );
};

export default Files;
