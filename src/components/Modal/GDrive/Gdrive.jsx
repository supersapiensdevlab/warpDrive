import useDrivePicker from "react-google-drive-picker";
import googleDrive from "../../../assets/images/google-drive.png";

function GDrive() {
  const [openPicker, authResponse] = useDrivePicker();
  const handleOpenPicker = () => {
    openPicker({
      clientId:
        "205422493130-ogso5ev9prgimirdnmhdgg07ljv5ngns.apps.googleusercontent.com",
      developerKey: "AIzaSyANS4GUnheQ3sRJWdskJuh8gidadCPJul0",

      // token: token, // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      token:
        "ya29.A0AVA9y1ucD5sHEwhhog8jEviFGmw66EYTQFXgSX045T4K9vihTKXLDKb2u2bwjDzFMSKnEEAANsZgyXmDrboNkKawZfClSKe8354-Z13diuDn2AzCatRa85KlYhuiNqiGx_bNMBJS7MtL154Mo9TUCbXNJN7CYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4VU83d1hDWjNXZFhDRlFLWUF0ckQ0UQ0163",
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log(data);
      },
    });
  };
  return (
    <>
      <h3 className="text-lg font-bold flex">
        Upload Files to Google Drive{" "}
        <img
          src={googleDrive}
          className="w-6 h-6 content-center align-middle mx-2"
        ></img>
      </h3>
      <label
        htmlFor="my-modal-3"
        className="btn modal-button"
        onClick={() => handleOpenPicker()}
      >
        Upload Files
      </label>
    </>
  );
}

export default GDrive;
