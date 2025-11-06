'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { getMe, logout } from '@/lib/api'
import { User } from '@/lib/types'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMe()
        setUser(userData)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📄</span>
            <span className="text-xl font-bold text-primary">
              Certidões Online Brasil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="/#servicos" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Serviços
            </Link>
            <Link href="/#sobre" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Sobre
            </Link>
            <Link href="/#contato" className="text-gray-700 hover:text-primary font-medium transition-colors">
              Contato
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : user ? (
              <>
                <Link href="/conta" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  Olá, {user.nome.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-primary font-medium transition-colors">
                  Entrar
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary font-medium">
                Home
              </Link>
              <Link href="/#servicos" className="text-gray-700 hover:text-primary font-medium">
                Serviços
              </Link>
              <Link href="/#sobre" className="text-gray-700 hover:text-primary font-medium">
                Sobre
              </Link>
              <Link href="/#contato" className="text-gray-700 hover:text-primary font-medium">
                Contato
              </Link>
              {user ? (
                <>
                  <Link href="/conta" className="text-gray-700 hover:text-primary font-medium">
                    Minha Conta
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-primary font-medium"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-primary font-medium">
                    Entrar
                  </Link>
                  <Link href="/auth/register" className="btn-primary inline-block text-center">
                    Cadastrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
