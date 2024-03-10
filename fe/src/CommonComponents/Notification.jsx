import Swal from "sweetalert2";
const Notification = (typeNotification, message, title) => {
  if (typeNotification === "confirm") {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: message,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true); // Trả về true nếu người dùng chọn OK
        } else if (result.isDismissed) {
          resolve(false); // Trả về false nếu người dùng chọn Cancel
        }
      });
    });
  } else if (typeNotification === "Success") {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: message,
        icon: "success",
      });
    });
  } else {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: message,
        icon: "error",
      });
    });
  }
};

export default Notification;
