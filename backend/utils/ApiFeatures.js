class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search = () => {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: String(this.queryStr.keyword),
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  };

  filter = () => {
    let queryCopy = { ...this.queryStr };

    // Fields to exclude
    const removeFields = ["limit", "page", "keyword"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Convert query object to string for regex replacement
    let queryStr = JSON.stringify(queryCopy);

    // Add $ sign before gt, gte, lt, lte for MongoDB operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // Parse back into object and apply filter
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  };
  pagination = (resultPerPage) => {
    const currentPage = Number(this.queryStr.page ? this.queryStr.page : 1);
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  };
}

module.exports = ApiFeatures;
