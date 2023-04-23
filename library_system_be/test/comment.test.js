const comment = require('../controller/comment'); // import your comment module here

describe('comment.get', () => {
  it('should return an array of comments', async () => {
    const mockReq = { query: { book_id: 123 } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await comment.get(mockReq, mockRes);

    // Assert that status code is 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Assert that json response is an array
    expect(Array.isArray(mockRes.json.mock.calls[0][0])).toBe(true);
  });
});

describe('comment.add', () => {
  it('should add a new comment', async () => {
    const mockReq = {
      body: {
        comment_id: 123,
        user_id: 456,
        book_id: 789,
        content: 'This is a comment',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await comment.add(mockReq, mockRes);

    // Assert that status code is 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Assert that json response is an object with {add: true}
    expect(mockRes.json.mock.calls[0][0]).toEqual({ add: true });
  });
});