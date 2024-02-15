import exceljs from "exceljs";

const RoomService = {
  addRoom: async (req) => {
    try {
      const workbook = new exceljs.Workbook();
      const buffer = req.file.buffer;

      await workbook.xlsx.load(buffer);
      const worksheet = workbook.worksheets[0];

      const data = [];
    } catch (error) {}
  },
};

export default RoomService;
