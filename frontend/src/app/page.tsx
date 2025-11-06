'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProducts } from '@/lib/api'
import { Product } from '@/lib/types'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sua certidão oficial, sem burocracia.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Solicite documentos oficiais de cartórios brasileiros de forma rápida, segura e transparente.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-full shadow-2xl p-2 flex items-center">
                <input
                  type="text"
                  placeholder="Busque por tipo de certidão..."
                  className="flex-1 px-6 py-3 text-gray-800 focus:outline-none rounded-full"
                />
                <button className="bg-accent hover:bg-accent-dark text-primary font-semibold px-8 py-3 rounded-full transition-all">
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Como Funciona</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Busque</h3>
              <p className="text-gray-600">
                Encontre a certidão que você precisa em nosso catálogo completo
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Preencha</h3>
              <p className="text-gray-600">
                Complete o formulário com os dados necessários de forma simples
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-primary w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Receba</h3>
              <p className="text-gray-600">
                Receba sua certidão oficial de forma rápida e segura
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certidões Mais Pedidas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Certidões Mais Pedidas</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Carregando certidões...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {products.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/produto/${product.slug}`}
                  className="card hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-full flex flex-col">
                    <div className="bg-gradient-to-br from-primary to-primary-dark h-32 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-4xl">📄</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{product.nome}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-1">
                      {product.descricao_curta}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        R$ {parseFloat(product.preco_base).toFixed(2)}
                      </span>
                      <span className="text-accent font-semibold">Ver mais →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para solicitar sua certidão?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Junte-se a milhares de brasileiros que já simplificaram seus processos
          </p>
          <Link href="/auth/register" className="btn-primary inline-block">
            Criar Conta Grátis
          </Link>
        </div>
      </section>
    </div>
  )
}
