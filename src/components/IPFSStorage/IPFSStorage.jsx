import { useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";

function IPFSStorage(props) {
  function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.WEB3STORAGE_TOKEN;
  }

  function makeStorageClient() {
    console.log(getAccessToken());
    return new Web3Storage({ token: getAccessToken() });
  }

  async function storeWithProgress(files) {
    if (files) {
      // show the root cid as soon as it's ready
      const onRootCidReady = (cid) => {
        console.log("uploading files with cid:", cid);
      };

      // when each chunk is stored, update the percentage complete and display
      const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
      let uploaded = 0;

      const onStoredChunk = (size) => {
        uploaded += size;
        const pct = totalSize / uploaded;
        console.log(`Uploading... ${pct.toFixed(2)}% complete`);
      };

      // makeStorageClient returns an authorized Web3.Storage client instance
      const client = makeStorageClient();

      // client.put will invoke our callbacks during the upload
      // and return the root cid when the upload completes
      return client.put(files, { onRootCidReady, onStoredChunk });
    }
  }
  useEffect(() => {
    async function upload() {
      // Update the document title using the browser API
      storeWithProgress(props.files);
    }
    upload();
  }, [props.files]);
}

export default IPFSStorage;
