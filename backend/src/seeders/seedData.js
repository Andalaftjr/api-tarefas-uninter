const { sequelize, Product, Service } = require('../models');

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Seed Products
    const products = [
      {
        nome: 'Certidão de Matrícula',
        slug: 'certidao-matricula',
        descricao: 'A Certidão de Matrícula é um documento oficial que comprova a propriedade de um imóvel. Ela contém informações detalhadas sobre o histórico do imóvel, incluindo proprietários anteriores, ônus, gravames e outras averbações registradas no cartório de registro de imóveis.',
        descricao_curta: 'Documento que comprova a propriedade de um imóvel',
        preco_base: 89.90,
        categoria: 'Imóveis',
        ativo: true
      },
      {
        nome: 'Certidão de Nascimento',
        slug: 'certidao-nascimento',
        descricao: 'A Certidão de Nascimento é o primeiro documento oficial de uma pessoa. Ela registra o nascimento e contém informações como nome completo, data e local de nascimento, filiação e naturalidade. É essencial para diversos procedimentos civis.',
        descricao_curta: 'Primeiro documento oficial de uma pessoa',
        preco_base: 45.90,
        categoria: 'Documentos Pessoais',
        ativo: true
      },
      {
        nome: 'Certidão de Casamento',
        slug: 'certidao-casamento',
        descricao: 'A Certidão de Casamento é o documento que comprova a união civil entre duas pessoas. Contém informações sobre os cônjuges, regime de bens, data e local do casamento, além de eventuais averbações posteriores.',
        descricao_curta: 'Documento que comprova a união civil',
        preco_base: 45.90,
        categoria: 'Documentos Pessoais',
        ativo: true
      },
      {
        nome: 'Certidão de Óbito',
        slug: 'certidao-obito',
        descricao: 'A Certidão de Óbito é o documento oficial que registra o falecimento de uma pessoa. Contém informações sobre o falecido, data, hora e local do óbito, além de outras informações relevantes para procedimentos legais.',
        descricao_curta: 'Documento oficial de registro de falecimento',
        preco_base: 45.90,
        categoria: 'Documentos Pessoais',
        ativo: true
      }
    ];

    for (const productData of products) {
      await Product.findOrCreate({
        where: { slug: productData.slug },
        defaults: productData
      });
    }

    console.log('✅ Produtos criados com sucesso!');

    // Seed Services
    const services = [
      {
        nome: 'Apostila de Haia',
        descricao: 'Certificação internacional que valida documentos brasileiros para uso em países signatários da Convenção de Haia.',
        preco: 150.00,
        ativo: true
      },
      {
        nome: 'Autenticação',
        descricao: 'Serviço de autenticação de cópias de documentos, conferindo validade jurídica.',
        preco: 25.00,
        ativo: true
      },
      {
        nome: 'Tradução Juramentada',
        descricao: 'Tradução oficial realizada por tradutor público juramentado, com validade legal.',
        preco: 200.00,
        ativo: true
      }
    ];

    for (const serviceData of services) {
      await Service.findOrCreate({
        where: { nome: serviceData.nome },
        defaults: serviceData
      });
    }

    console.log('✅ Serviços criados com sucesso!');
    console.log('🎉 Seed concluído!');
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error);
  }
};

module.exports = seedDatabase;
