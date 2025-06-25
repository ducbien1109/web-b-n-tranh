import instance from "./axiosClient";

const getPostApiProduct = {
  // PRODUCT APIs
  getAll() {
    return instance.get("/products");
  },
  getDetail(postId) {
    return instance.get(`/products/${postId}`);
  },
  create(body) {
    return instance.post("/products", body);
  },
  delete(postId) {
    return instance.delete(`/products/${postId}`);
  },
  update(postId, body) {
    return instance.put(`/products/${postId}`, body);
  },

  // ✅ ORDER APIs – thêm vào đây
  getAllOrders() {
    return instance.get("/orders"); // GET tất cả đơn hàng từ MongoDB
  },
  createOrder(order) {
    return instance.post("/orders", order); // POST tạo đơn hàng mới
  },
  updateOrder(orderId, data) {
    return instance.put(`/orders/${orderId}`, data); // PUT cập nhật đơn hàng
  },
  deleteOrder(orderId) {
    return instance.delete(`/orders/${orderId}`); // DELETE đơn hàng
  },
};

export default getPostApiProduct;
