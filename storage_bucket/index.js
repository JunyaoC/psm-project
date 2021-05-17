const express = require('express');
var cors = require('cors')
var https = require('https')

var fs = require('fs');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors())
app.set('etag', false)

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.use(fileUpload());

// app.get('/', (req, res) => {
//   res.send(`
//     <h2>With <code>"express"</code> npm package</h2>
//     <form action="/api/upload" enctype="multipart/form-data" method="post">
//       <div>Text field title: <input type="text" name="title" /></div>
//       <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

app.post('/api/upload', async (req, res, next) => {
  // const form = formidable();

  req.files.avatar.mv('media/' + req.files.avatar.name)
  res.send({
    status:"ok"
  })
});

app.post('/api/proposal_upload', async (req, res, next) => {

  var dir = './proposal/' + req.body.proposal_uid + '/'

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  

  if(req.files.proposal_file.length > 1 ){
    for(let file of req.files.proposal_file){
      console.log(file.name)
      file.mv(dir + file.name)
    }
  }else{
    req.files.proposal_file.mv(dir + req.files.proposal_file.name)
  }

  


  
  res.send({
    status:"ok"
  })
});

app.use('/media', express.static('./media'));

app.use('/proposal/list/:proposal_uid', async (req,res) => {

  let path = `proposal/${req.params.proposal_uid}`

  fs.readdir(path, (err, files) => {

    let file_list = [];

    if(files){
      files.forEach(file => {
        file_list.push(file)
      });
  
      res.send(file_list)
    }



  });

})

app.use('/proposal/remove/:proposal_uid/:file_name', async (req,res) => {

  let path = `proposal/${req.params.proposal_uid}/${req.params.file_name}`

  try {
    fs.unlinkSync(path)
    //file removed
  } catch(err) {
    console.error(err)
  }

  res.send('ok')

})

app.use('/proposal/:proposal_uid/:file_name', async (req,res) => {

  let path = `proposal/${req.params.proposal_uid}/${req.params.file_name}`
  res.sendFile(path, {root: __dirname});
})

//app.listen(3000, () => {
//  console.log('Server listening on http://localhost:3000 ...');
//});

var options = {
  key: fs.readFileSync('./cert/private.key'),
  cert: fs.readFileSync('./cert/public.cert')
};

https.createServer(options, app).listen(3000, () => {
    console.log("Server listening on https://localhost:3000")
});

