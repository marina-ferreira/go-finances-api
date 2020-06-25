import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance()
    const isBroken = type === 'outcome' && balance.total - value < 0

    if (isBroken) {
      const moessage = `You do not have enough balance. Current balance: $${balance.total}`
      throw Error(moessage)
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction
  }
}

export default CreateTransactionService
