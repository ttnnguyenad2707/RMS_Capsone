async function getPaginationData(model,page = 1, limit = 10,filter={}){
    try {
        const pageNumber = parseInt(page) || 1;
        const limitPerPage = parseInt(limit) || 10;
        const totalDocuments = await model.countDocuments(filter);
        const totalPages = Math.ceil(totalDocuments / limitPerPage);
        const data = await model.find(filter)
            .skip((pageNumber - 1) * limitPerPage)
            .limit(limitPerPage);
        return {
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalDocuments,
                limitPerPage
            },
            data
        }
    } catch (error) {
        throw new Error(`Error fetching paged data: ${error.message}`);
    }
}

export default getPaginationData