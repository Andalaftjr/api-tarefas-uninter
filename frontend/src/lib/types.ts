export interface User {
  id: string
  nome: string
  email: string
  tipo: 'fisica' | 'juridica'
  cpf?: string
  telefone?: string
}

export interface Product {
  id: string
  nome: string
  slug: string
  descricao: string
  descricao_curta: string
  preco_base: string
  categoria: string
  ativo: boolean
  imagem_url?: string
}

export interface Service {
  id: string
  nome: string
  descricao: string
  preco: string
  ativo: boolean
}

export interface Order {
  id: string
  numero_pedido: string
  status: 'aguardando_pagamento' | 'em_processamento' | 'em_analise' | 'concluido' | 'cancelado'
  preco_total: string
  tipo_emissao: 'digital' | 'impressa'
  observacoes?: string
  createdAt: string
  product?: Product
  services?: Service[]
  details?: OrderDetail[]
}

export interface OrderDetail {
  id: string
  campo: string
  valor: string
}

export interface OrderFormData {
  productId: string
  tipo_emissao: 'digital' | 'impressa'
  servicesIds: string[]
  detalhes: Record<string, any>
  observacoes?: string
}
