import { Payment } from '@/types/payment'
import { ApiResponse, apiClient, handleApiResponse } from './api'
import { 
  payments, 
  getPaymentById, 
  getPaymentsByCustomerId, 
  getPaymentsByStatus 
} from '@/data/payments'

// Payment service class
export class PaymentService {
  private mockMode = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false'

  // Get all payments
  async getPayments(params?: {
    page?: number
    limit?: number
    status?: string
    customerId?: string
    method?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<Payment[]> {
    if (this.mockMode) {
      let filteredPayments = [...payments]
      
      // Filter by status
      if (params?.status) {
        filteredPayments = getPaymentsByStatus(params.status as Payment['status'])
      }
      
      // Filter by customer ID
      if (params?.customerId) {
        filteredPayments = getPaymentsByCustomerId(params.customerId)
      }
      
      // Filter by payment method
      if (params?.method) {
        filteredPayments = filteredPayments.filter(payment => 
          payment.method === params.method
        )
      }
      
      // Simple pagination
      if (params?.page && params?.limit) {
        const start = (params.page - 1) * params.limit
        const end = start + params.limit
        filteredPayments = filteredPayments.slice(start, end)
      }
      
      return filteredPayments
    }

    const response = await apiClient.get<Payment[]>('/payments', params as Record<string, string>)
    return handleApiResponse(response)
  }

  // Get payment by ID
  async getPaymentById(id: string): Promise<Payment | null> {
    if (this.mockMode) {
      return getPaymentById(id) || null
    }

    try {
      const response = await apiClient.get<Payment>(`/payments/${id}`)
      return handleApiResponse(response)
    } catch (error: any) {
      if (error.status === 404) {
        return null
      }
      throw error
    }
  }

  // Create new payment
  async createPayment(paymentData: Omit<Payment, 'id'>): Promise<Payment> {
    if (this.mockMode) {
      const newPayment: Payment = {
        ...paymentData,
        id: (payments.length + 1).toString()
      }
      payments.push(newPayment)
      return newPayment
    }

    const response = await apiClient.post<Payment>('/payments', paymentData)
    return handleApiResponse(response)
  }

  // Update payment
  async updatePayment(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    if (this.mockMode) {
      const paymentIndex = payments.findIndex(payment => payment.id === id)
      if (paymentIndex === -1) {
        throw new Error('Payment not found')
      }
      
      payments[paymentIndex] = { ...payments[paymentIndex], ...paymentData }
      return payments[paymentIndex]
    }

    const response = await apiClient.put<Payment>(`/payments/${id}`, paymentData)
    return handleApiResponse(response)
  }

  // Process refund
  async processRefund(id: string, amount?: number): Promise<Payment> {
    if (this.mockMode) {
      const payment = getPaymentById(id)
      if (!payment) {
        throw new Error('Payment not found')
      }
      
      const refundAmount = amount || payment.amount
      const updatedPayment: Payment = {
        ...payment,
        status: 'refunded',
        refundAmount
      }
      
      const paymentIndex = payments.findIndex(p => p.id === id)
      payments[paymentIndex] = updatedPayment
      return updatedPayment
    }

    const response = await apiClient.post<Payment>(`/payments/${id}/refund`, { amount })
    return handleApiResponse(response)
  }

  // Get payment statistics
  async getPaymentStats(dateFrom?: string, dateTo?: string): Promise<{
    totalAmount: number
    totalCount: number
    completedCount: number
    pendingCount: number
    failedCount: number
    refundedCount: number
  }> {
    if (this.mockMode) {
      const stats = payments.reduce((acc, payment) => {
        acc.totalAmount += payment.amount
        acc.totalCount += 1
        
        switch (payment.status) {
          case 'completed':
            acc.completedCount += 1
            break
          case 'pending':
            acc.pendingCount += 1
            break
          case 'failed':
            acc.failedCount += 1
            break
          case 'refunded':
            acc.refundedCount += 1
            break
        }
        
        return acc
      }, {
        totalAmount: 0,
        totalCount: 0,
        completedCount: 0,
        pendingCount: 0,
        failedCount: 0,
        refundedCount: 0
      })
      
      return stats
    }

    const response = await apiClient.get<any>('/payments/stats', {
      dateFrom,
      dateTo
    } as Record<string, string>)
    return handleApiResponse(response)
  }
}

// Default payment service instance
export const paymentService = new PaymentService() 