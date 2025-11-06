import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Certidões Online Brasil</h3>
            <p className="text-gray-300 text-sm">
              Simplificando o acesso a documentos oficiais para todos os brasileiros.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="text-gray-300 hover:text-accent transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="text-gray-300 hover:text-accent transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/conta" className="text-gray-300 hover:text-accent transition-colors">
                  Minha Conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Certidões</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produto/certidao-matricula" className="text-gray-300 hover:text-accent transition-colors">
                  Certidão de Matrícula
                </Link>
              </li>
              <li>
                <Link href="/produto/certidao-nascimento" className="text-gray-300 hover:text-accent transition-colors">
                  Certidão de Nascimento
                </Link>
              </li>
              <li>
                <Link href="/produto/certidao-casamento" className="text-gray-300 hover:text-accent transition-colors">
                  Certidão de Casamento
                </Link>
              </li>
              <li>
                <Link href="/produto/certidao-obito" className="text-gray-300 hover:text-accent transition-colors">
                  Certidão de Óbito
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📧 contato@certidoesonline.com.br</li>
              <li>📞 (11) 3000-0000</li>
              <li>📍 São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Certidões Online Brasil. Todos os direitos reservados.</p>
          <p className="mt-2">Desenvolvido por Leandro Andalaft - RU 4548358</p>
        </div>
      </div>
    </footer>
  )
}
