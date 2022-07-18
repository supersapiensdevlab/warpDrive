function Directory({ files }) {
  return (
    <div className=" overflow-hidden w-full p-6">
      <div className="grid grid-flow-row md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 grid-cols-2 sm:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="rounded-lg card-compact aspect-square  bg-base-100 shadow-xl cursor-pointer"
          >
            <figure className="rounded-lg">
              {file[0].name.split(".")[1] == "png" ||
              file[0].name.split(".")[1] == "jpg" ? (
                <img
                  className=" aspect-square object-cover rounded-t-lg"
                  src={"https://ipfs.infura.io/ipfs/" + file[0].cid}
                  alt="Shoes"
                />
              ) : (
                <video
                  className=" aspect-square object-cover rounded-t-lg"
                  controls
                >
                  <source
                    src={"https://ipfs.infura.io/ipfs/" + file[0].cid}
                    type="video/mp4"
                  />{" "}
                  Your browser does not support the video tag.
                </video>
              )}
            </figure>
            <div className="card-body bg-base-200 rounded-b-lg ">
              <h2 className="  ">{file[0].name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Directory;
