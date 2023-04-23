const expressAsyncHandler = require('express-async-handler')
const { v4 } = require('uuid')
const { mockRequest, mockResponse } = require('jest-mock-req-res')
const connection = require('../database/connect')
const checkout = require('../controller/checkout')

jest.mock('uuid', () => ({
  v4: jest.fn()
}))

jest.mock('../database/connect', () => ({
  execute: jest.fn()
}))

describe('checkout', () => {
  let req, res

  beforeEach(() => {
    req = mockRequest({
      body: {
        user_id: '1',
        book_in_book_id: '2',
        book_id: '3'
      }
    })
    res = mockResponse()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the correct response when the query succeeds', async () => {
    // Arrange
    const expectedHistoryRows = [{ id: 1, user_id: '1', book_in_book_id: '2' }]
    const expectedCartRows = [{ id: 1, user_id: '1', book_id: '3' }]
    v4.mockReturnValueOnce('1234')
    connection.execute.mockResolvedValueOnce([expectedHistoryRows])
    connection.execute.mockResolvedValueOnce([expectedCartRows])

    // Act
    await checkout(req, res)

    // Assert
    expect(connection.execute).toHaveBeenCalledWith(
      'INSERT INTO history VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      ['1234', '1', '2', expect.any(Date), '0', 0, 0, 0, expect.any(Date)]
    )
    expect(connection.execute).toHaveBeenCalledWith(
      'DELETE FROM cart WHERE user_id= ? AND book_id= ?',
      ['1', '3']
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ add: true })
  })

  it('should return the correct response when the query fails', async () => {
    // Arrange
    const expectedError = new Error('Something went wrong')
    connection.execute.mockRejectedValueOnce(expectedError)

    // Act
    await checkout(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith(expectedError)
  })
})