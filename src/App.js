import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Directory from "./components/Directory/Directory";
import Modal from "./components/Modal/Modal";
import IPFSStorage from "./components/IPFSStorage/IPFSStorage";
import { Web3Storage } from "web3.storage";
import { useEffect, useState } from "react";
import { create } from "ipfs-http-client";
function App() {
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.REACT_APP_WEB3STORAGE_TOKEN;
  }

  useEffect(() => {
    setFiles([]);
    function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken() });
    }
    async function getLinks(ipfsPath) {
      const url = "https://dweb.link/api/v0";
      const ipfs = create({ url });

      const links = [];
      for await (const link of ipfs.ls(ipfsPath)) {
        links.push(link);
      }

      return links;
    }
    async function listUploads() {
      const client = makeStorageClient();
      for await (const upload of client.list()) {
        const links = await getLinks(upload.cid);

        console.log(links);
        setFiles((currentFiles) => [...currentFiles, links]);
      }
    }
    listUploads();
  }, []);

  return (
    <div className="bg-base-300">
      <Navbar />
      <Directory files={files} />
      <Modal setRefresh={setRefresh} refresh={refresh} />
      <IPFSStorage />
    </div>
  );
}

export default App;
