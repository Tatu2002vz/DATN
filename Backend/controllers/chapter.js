const Chapter = require("../models/chapter");
const asyncHandler = require("express-async-handler");
const sttCode = require("../enum/statusCode");
const Comic = require("../models/comic");
const { formidable } = require("formidable");
const cloudinary = require("../config/cloudinary.config");
const multipleUploadMiddleware = require("../middlewares/uploadImg");

const getListChapter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const chapter = await Chapter.find({ comic: id }).select("chapNumber");
  return res.status(sttCode.Ok).json({
    success: chapter ? true : false,
    mes: chapter ? chapter : "Something went wrong!",
  });
});
let debug = console.log.bind(console);

// const createChapter = asyncHandler(async (req, res) => {
//   const form = formidable({ multiples: true });
//   let formParse;
//   formParse = await form.parse(req);
//   let { comic, chapNumber, price } = formParse[0];
//   comic = JSON.parse(JSON.stringify(comic).toString().replace(/\[|\]/g, ""));
//   chapNumber = JSON.parse(
//     JSON.stringify(chapNumber).toString().replace(/\[|\]/g, "")
//   );
//   price = JSON.parse(JSON.stringify(price).toString().replace(/\[|\]/g, ""));
//   const data = {
//     comic,
//     chapNumber,
//     price,
//   };
//   const rs = await Chapter.findOne({ chapNumber, comic });
//   const comicRecord = await Comic.findById(comic).select("title");
//   if (rs)
//     throw new Error(
//       `Chapter ${chapNumber} of "${comicRecord.title}" is already in database`
//     );
//   const newChapter = await Chapter.create(data);
//   if (newChapter) {
//     const uploadedImages = [];
//     const files = formParse[1];
//     for (let i = 0; i < files.image.length; i++) {
//       const image = files.image[i];
//       const filename = `${i}`;
//       const result = await cloudinary.uploader.upload(image.filepath, {
//         folder: `${comic[0]}/${chapNumber}/`,
//         public_id: filename,
//       });

//       const publicUrl = result.secure_url;
//       uploadedImages.push(publicUrl);
//     }

//     // Tiếp tục xử lý logic của bạn với uploadedImages (mảng chứa các đường dẫn công khai của các ảnh đã tải lên)
//     const updateChapter = await Chapter.findByIdAndUpdate(
//       newChapter._id,
//       { images: uploadedImages },
//       { new: true }
//     );
//     return res.status(sttCode.Ok).json({
//       success: updateChapter ? true : false,
//       mes: updateChapter
//         ? "Add chapter successfully"
//         : "Error creating chapter",
//     });
//   }
// });
const createChapter = asyncHandler(async (req, res) => {
  let { comic, chapNumber, price } = req.body;
  if (!comic || !chapNumber) throw new Error("Missing input!");
  const images = req.files.map((el) => {
    return el.path.replace("public", "");
  });
  console.log(images);
  const data = {
    ...req.body,
    images
  }
  
  const newChapter = Chapter.create(data)
  return res.status(sttCode.Ok).json({
    success: newChapter ? true : false,
    mes: newChapter ? 'Create chapter successfully' : 'Error creating chapter'
  })
});

const deleteChapter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Missing id");
  const chapter = await Chapter.findByIdAndDelete(id);
  return res.status(sttCode.Ok).json({
    success: chapter ? true : false,
    mes: chapter ? "Delete success" : "Something went wrong!",
  });
});

module.exports = {
  createChapter,
  getListChapter,
  deleteChapter,
};
