const Comic = require("../models/comic");
const asyncHandler = require("express-async-handler");
const sttCode = require("../enum/statusCode");
const cloudinary = require("../config/cloudinary.config");
const slugify = require("slugify");
const { formidable } = require("formidable");
const createComic = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      // Xử lý lỗi nếu có
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }

    // Lấy giá trị từ trường comic và chapter
    let { title, description, ...genres } = fields;

    // Xử lý dữ liệu vào
    if(!title) throw new Error('Title must not be empty');
    // Chuyển các key từ Object thành String
    title = JSON.parse(JSON.stringify(title).toString().replace(/\[|\]/g, ''))
    description = JSON.parse(JSON.stringify(description).toString().replace(/\[|\]/g, ''))
    let genre = Object.values(genres).map((el) => {
      return JSON.parse(JSON.stringify(el).toString().replace(/\[|\]/g, ''))
    })
    const { _id } = req.user;
    const data = {
      title,
      slug: slugify(title),
      description,
      genre,
      createdBy: _id
    }
    const newComic = await Comic.create(data)
    if(newComic) {
      try {
        // Upload tệp tin img lên Cloudinary
        const result = await cloudinary.uploader.upload(files.coverImage[0].filepath, {
          folder: `comicMarket/`,
        });
        // Lấy đường dẫn công khai của tệp tin đã upload
        const coverImage = result.secure_url;
        const updateComic = await Comic.findByIdAndUpdate(newComic._id, {coverImage}, {new: true});
        return res.status(sttCode.Ok).json({
          success: updateComic ? true : false,
          mes: updateComic ? 'Create a comic success' : 'Something went wrong',
          updateComic
        })
  
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
      }
    } 
    throw new Error("Error creating comic")
    
  });
  // const { title, description, coverImage, genre } = req.body;
  // const { _id } = req.user;
  // req.body.createdBy = _id;
  // if (!title || !description || !coverImage || !genre)
  //   throw new Error("Missing input");
  // req.body.slug = slugify(title);
  // const newComic = await Comic.create(req.body);
  // return res.status(sttCode.Ok).json({
  //   success: newComic ? true : false,
  //   mes: newComic ? newComic : "Something went wrong!",
  // });
});
const uploadImg = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true });
});
const getComic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.params || !req.params.id) throw new Error("Missing input");
  const comic = await Comic.findByIdAndUpdate(
    id,
    { $inc: { viewCount: 1 } },
    { new: true }
  );
  return res.status(sttCode.Ok).json({
    success: comic ? true : false,
    mes: comic ? comic : "Something went wrong!",
  });
});

const getComics = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  // Forrmat lại các operator cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );

  const formatedQueries = JSON.parse(queryString);

  // Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Comic.find(formatedQueries);

  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  // Thêm dấu + => chuyển sang dạng số
  // + 2 => 2
  // + dssss => nan
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;

  queryCommand.skip(skip).limit(limit);

  // Sử dụng async/await
  try {
    const response = await queryCommand.exec();
    const counts = await Comic.find(formatedQueries).countDocuments();
    return res.status(sttCode.Ok).json({
      success: response ? true : false,
      counts,
      mes: response ? response : "Cannot get all comic",
    });
  } catch (err) {
    throw new Error(err);
  }
});

const updateComic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.params || !req.params.id) throw new Error("Invalid id");
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const comic = await Comic.findByIdAndUpdate(id, req.body, { new: true });
  return res.status(sttCode.Ok).json({
    success: comic ? true : false,
    mes: comic ? comic : "Something went wrong",
  });
});

const deleteComic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!req.params || !req.params.id) throw new Error("Invalid id");
  const comic = await Comic.findByIdAndDelete(id);
  return res.status(sttCode.Ok).json({
    success: comic ? true : false,
    mes: comic ? "Delete Success" : "Something went wrong",
  });
});

module.exports = {
  createComic,
  getComic,
  getComics,
  deleteComic,
  updateComic,
  uploadImg,
};
