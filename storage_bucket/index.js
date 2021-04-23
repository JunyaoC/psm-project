const express = require('express');
var cors = require('cors')
var multer  = require('multer')

var sharpe  = require('sharp')

const formidable = require('formidable');
 
const app = express();
app.use(cors())
app.set('etag', false)

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})
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
 
app.post('/api/upload',upload.single('avatar'), async (req, res, next) => {
  // const form = formidable();
  console.log(req.file)
  res.send({
    status:"ok"
  })
 
  // form.parse(req, (err, fields, files) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
    
  //   res.json({ fields, files });
  // });
});

app.use('/media', express.static('./media'));
 
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});