  import http from "http";
  import fs from "fs";
  import config from "./config.js";

  const sourceFolderPath = './public';
  const buildFolderPath = './dist';

  try {
    // copy css, js, images from public to build folder
    fs.cpSync(sourceFolderPath, buildFolderPath, {
      recursive: true,
    });
    console.log("Assets have been built.");
  } catch(err) {
    throw err;
  }

  for ( let i = 0; i<config.length; i++) {

    let page = config[i];
    let path = page;
    if (page === "index") {
      path = "";
    }

    let options = {
      host : 'localhost',
      port : 3000,
      path : `/${path}`, // the rest of the url with parameters if needed
      method : 'GET', // do GET
      filename: `${page}.html`
    };
    console.log("Building "+ options.filename);
    
    let request = http.get(options, async (res) => {
      try {
        await sleep(3000);
        // create the html file
        let download = fs.createWriteStream(`${buildFolderPath}/${options.filename}`);
        res.pipe(download);
        res.on("end", () => {
          //console.log(`Page ${options.filename} has been created.`);
        });
        await sleep(3000);
        // update links to css, js, images
        fs.readFile(`${buildFolderPath}/${options.filename}`, 'utf8', function (err,data) {
          let result = data.replaceAll('href="/', 'href="./').replaceAll('src="/','src="./');
          fs.writeFile(`${buildFolderPath}/${options.filename}`, result, 'utf8', function (err) {
          });
          console.log(`Page ${options.filename} has been built.`);
        });
      } catch(err) {
        throw err;
      }
    });
    //request.end(); 
    
  } 

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }



