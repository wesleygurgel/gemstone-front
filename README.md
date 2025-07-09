# Gemstone - Site Institucional

Site institucional da Gemstone, empresa atuante na área de mineração de ouro e pedras preciosas como diamantes, esmeraldas, turmalinas, rubi e água marinha, especialista em exportação e importação de minerios ao redor do mundo.

## Sobre a Empresa

A Gemstone é atuante na área de mineração de ouro e pedras preciosas como diamantes, esmeraldas, turmalinas, rubi e água marinha, especialista e com vasta experiência prática na exportação e importação de todo esse minerio ao redor do mundo. Com sede em Miami - Estados Unidos e escritórios em Dubai, Roma, África & Brasil, operamos com os mais altos padrões de compliance, oferecendo soluções seguras, eficientes e personalizadas para parceiros institucionais ao redor do mundo.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Framer Motion**: Biblioteca para animações
- **React Router DOM**: Roteamento para React
- **React Helmet Async**: Gerenciamento de meta tags
- **Axios**: Cliente HTTP para requisições
- **Vite**: Build tool e dev server

## Estrutura do Projeto

```
src/
├── assets/            # Imagens, fontes e outros recursos estáticos
├── components/        # Componentes reutilizáveis
│   ├── common/        # Botões, inputs, cards, etc.
│   ├── debug/         # Componentes para depuração
│   ├── layout/        # Header, Footer, Container, etc.
│   └── sections/      # Seções específicas da landing page
├── hooks/             # Custom hooks React
├── pages/             # Páginas/rotas da aplicação
│   ├── Home/          # Página inicial (landing)
│   └── NotFound/      # Página 404
├── services/          # Serviços para integração com API
├── types/             # Definições de tipos TypeScript
│   └── api/           # Tipos para integração com API
├── utils/             # Funções utilitárias
│   ├── api.ts         # Cliente API com Axios
│   ├── env.ts         # Utilitário para variáveis de ambiente
│   └── errorHandler.ts # Tratamento de erros da API
├── vite-env.d.ts      # Definições de tipos para variáveis de ambiente
├── App.tsx            # Componente principal
├── index.tsx          # Ponto de entrada
└── routes.tsx         # Configuração de rotas
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gemstone-front.git
cd gemstone-front
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env conforme necessário
```

5. Acesse o projeto em [http://localhost:5173](http://localhost:5173)

## Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração. Consulte o arquivo [ENV.md](ENV.md) para mais detalhes sobre as variáveis disponíveis e como configurá-las.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a versão de produção localmente
- `npm run lint`: Executa o linter para verificar problemas no código

## Estrutura do Site

O site institucional da Gemstone inclui as seguintes seções:

1. **Home**: Apresentação da empresa com destaque para os valores de ética e conformidade
2. **Quem Somos**: História da empresa, missão, visão e valores
3. **Serviços**: Detalhes sobre os serviços oferecidos, incluindo:
   - Hand Carry – Dubai
   - Importação via Carga (Cargo Carry)
   - Assay e Refino
   - Compliance e Due Diligence
   - Consultoria e Suporte
4. **Compliance & Ética**: Compromissos com a legalidade, responsabilidade e direitos humanos
5. **Contato**: Formulário de contato e informações para comunicação direta

## Preparado para o Futuro

Este projeto foi estruturado para permitir futuras expansões, incluindo:

- Área do Cliente para parceiros submeterem documentação
- Sistema de acompanhamento de status de envios e pagamentos
- Integração com sistemas de compliance e due diligence
- Expansão para múltiplos idiomas (inglês, espanhol, árabe)

## Licença

Este projeto está licenciado sob a licença MIT.
