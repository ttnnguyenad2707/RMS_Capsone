const getPaginationData = async (model, page = 1, limit = 200, filter = {}, populateFields = []) => {
    try {
        const pageNumber = parseInt(page) || 1;
        const limitPerPage = parseInt(limit) || 10;

        const totalDocuments = await model.count({
            where: filter
        });

        const totalPages = Math.ceil(totalDocuments / limitPerPage);

        let query = {
            where: filter,
            skip: (pageNumber - 1) * limitPerPage,
            take: limitPerPage
        };

        if (populateFields.length > 0) {
            query.include = populateFields.reduce((acc, field) => {
                acc[field] = true;
                return acc;
            }, {});
        }

        const data = await model.findMany(query);

        return {
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalDocuments,
                limitPerPage,
            },
            data,
        };
    } catch (error) {
        throw new Error(`Error fetching paged data: ${error.message}`);
    }
};

export default getPaginationData;
