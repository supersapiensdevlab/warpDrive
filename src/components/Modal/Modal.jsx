import IPFSStorage from "../IPFSStorage/IPFSStorage";
import { useState } from "react";

import GDrive from "./GDrive/Gdrive";
import IpfsUpload from "./IPFS/IpfsUpoload";
function Modal({ setRefresh, refresh }) {
  const [pct, setPct] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="tabs mb-2">
            <a
              className={`tab tab-lifted ${
                activeTab === 0 ? "tab-active" : null
              }`}
              onClick={() => setActiveTab(0)}
            >
              IPFS
            </a>
            <a
              className={`tab tab-lifted ${
                activeTab === 1 ? "tab-active" : null
              }`}
              onClick={() => setActiveTab(1)}
            >
              GDrive
            </a>
            <a
              className={`tab tab-lifted ${
                activeTab === 2 ? "tab-active" : null
              }`}
              onClick={() => setActiveTab(2)}
            >
              More
            </a>
          </div>
          <div className={activeTab === 0 ? "block" : "hidden"}>
            <IpfsUpload
              setPct={setPct}
              setUploading={setUploading}
              pct={pct}
              uploading={uploading}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </div>
          <div className={activeTab === 1 ? "block" : "hidden"}>
            <GDrive />
          </div>
          <div className={activeTab === 2 ? "block" : "hidden"}>
            <h3 className="text-lg font-bold flex">Coming Soon</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
