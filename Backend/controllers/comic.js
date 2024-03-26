const Comic = require("../models/comic");
const asyncHandler = require("express-async-handler");
const sttCode = require("../constants/statusCode");

const slugify = require("slugify");
const createComic = asyncHandler(async (req, res) => {
  const { title, description, coverImage, genre } = req.body;
  const { _id } = req.user;
  req.body.createdBy = _id;
  if (!title || !description || !coverImage || !genre)
    throw new Error("Missing input");
  req.body.slug = slugify(title);
  const newComic = await Comic.create(req.body);
  return res.status(sttCode.Ok).json({
    success: newComic ? true : false,
    mes: newComic ? newComic : "Something went wrong!",
  });
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
};
