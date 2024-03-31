import Navbar from "./Navbar";
import Footer from "./Footer";
import moment from "moment";
import { convertBytes } from "./helpers";
const Files = ({ files }) => {
  return (
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-screen bg-gray-800">
        <Navbar/>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                id
              </th>
              <th scope="col" class="px-6 py-3">
                name
              </th>
              <th scope="col" class="px-6 py-3">
                description
              </th>
              <th scope="col" class="px-6 py-3">
                type
              </th>
              <th scope="col" class="px-6 py-3">
                size
              </th>
              <th scope="col" class="px-6 py-3">
                date
              </th>
              <th scope="col" class="px-6 py-3">
                hash/view/get
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, key) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={key}>
                <td class="px-6 py-4">{file.fileId}</td>
                <td class="px-6 py-4">{file.fileName}</td>
                <td class="px-6 py-4">{file.fileDescription}</td>
                <td class="px-6 py-4">{file.fileType}</td>
                <td class="px-6 py-4">{convertBytes(file.fileSize)}</td>
                
                <td class="px-6 py-4">
                  <a
                    href={"http://localhost/5001" + file.fileHash}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {file.fileHash.substring(0, 10)}...
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
};

export default Files;