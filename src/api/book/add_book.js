import axios from "axios";
import { API_URL } from "../../config";

const add_book = async (
  bookName,
  bookQuantity,
  bookRating,
  bookDescription,
  coverPhoto,
  filteredAuthors,
  linkBook,
  filteredCategories
) => {
  const res = await axios({
    url: API_URL + "/api/v3/book",
    method: "post",
    data: {
      book_name: bookName,
      book_quantity: bookQuantity,
      book_rating: bookRating,
      book_description: bookDescription,
      cover_photo: coverPhoto,
      link_book: linkBook,
      author_book: filteredAuthors.map((item) => {
        return {
          author_id: item.author_id,
        };
      }),
      category_book: filteredCategories.map((item) => {
        return {
          category_id: item.id,
        };
      }),
    },
  });
  const result = await res.data;
  return result;
};

export default add_book;
