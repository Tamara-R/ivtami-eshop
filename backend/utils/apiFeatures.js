class APIFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	//search function by keyword
	search() {
		const keyword = this.queryStr.keyword ? {
					name: {
						$regex: this.queryStr.keyword,
						$options: 'i', //case insensitive
					},
			}
			: {};
        
        // console.log(keyword);

		this.query = this.query.find({ ...keyword });
		return this;
	}
	//filter function
	filter() {
		const queryCopy = { ...this.queryStr };
        // console.log(queryCopy);

		// Removing fields from the query
		const removeFields = ['keyword', 'limit', 'page'];
		removeFields.forEach(el => delete queryCopy[el]);


		// Advance filter for price, ratings...
		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}
	//pagination function
	pagination(resPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resPerPage * (currentPage - 1);

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;
	}
}
module.exports = APIFeatures;