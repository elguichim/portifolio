// Importa o arquivo de estilos CSS específico para este componente
import { Link } from 'react-router-dom'
import './Dashboard.css'

// Importa o componente Chart (gráfico) que criamos em outra pasta
import Chart from './components/Chart'

// Importa o componente Transactions (lista de transações)
import Transactions from './components/Transactions'

// Importa o hook useState do React, que serve para criar estados (variáveis reativas)
import { useState } from 'react'

// Define um tipo (interface) para garantir que cada transação tenha:
// - id numérico
// - type que só pode ser 'Entrada' ou 'Saida'
// - flow é a categoria escolhida
// - value é o valor numérico
type Transaction = {
  id: number
  type: 'Entrada' | 'Saida'
  flow: string
  value: number
}

// Função principal do componente Dashboard
function Dashboard() {
  // Lista de transações
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Input temporário para criar nova categoria
  const [newCategory, setNewCategory] = useState<string>('')

  // Lista de categorias criadas
  const [categories, setCategories] = useState<string[]>([])

  // Categoria selecionada para a transação
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // Tipo da transação (Entrada ou Saída)
  const [type, setType] = useState<'Entrada' | 'Saida'>('Entrada')

  // Valor da transação
  const [value, setValue] = useState<number>(0)

  const addCategory = () => {
    const categoriaNormalizada = newCategory.trim()

    if (categoriaNormalizada === '') return // impede vazio

    // Verifica se já existe (case-insensitive)
    const jaExiste = categories.some(
      c => c.toLowerCase() === categoriaNormalizada.toLowerCase()
    )

    if (jaExiste) {
      alert("Essa categoria já existe!") // ou pode só retornar sem alert

      return
    }

    setCategories([...categories, categoriaNormalizada]) // adiciona
    setNewCategory('') // limpa input
  }



  // Calcula o total de receitas (Entradas)
  const totalReceitas = transactions
    .filter(t => t.type === 'Entrada')
    .reduce((acc, t) => acc + t.value, 0)

  // Calcula o total de despesas (Saídas)
  const totalDespesas = transactions
    .filter(t => t.type === 'Saida')
    .reduce((acc, t) => acc + t.value, 0)

  // Calcula o saldo (Entradas - Saídas)
  const saldo = totalReceitas - totalDespesas

  // Função chamada quando o formulário de transações é enviado
  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault() // evita recarregar a página
    if (value <= 0 || !selectedCategory) return // impede valores inválidos

    // Cria uma nova transação
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type,
      flow: selectedCategory, // usa a categoria escolhida
      value,
    }

    // Atualiza a lista de transações
    setTransactions([...transactions, newTransaction])

    // Reseta os campos
    setValue(0)
    setSelectedCategory('')
  }

  // Função auxiliar para calcular total por categoria
  const getTotalByCategory = (category: string) => {
    return transactions
      .filter(t => t.flow === category)
      .reduce((acc, t) => acc + t.value, 0)
  }

  // JSX (interface)
  return (
    <div className="dashboard">
      <div className='voltar'>
        <Link to="/" className="project-link">Ver Projeto</Link>
      </div>
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <h1>Dashboard Financeiro</h1>
        <p>Controle suas receitas e despesas aqui.</p>
      </header>

      {/* Cards de resumo */}
      <section className="summary">
        <div className="card receita">
          <h3>Entrada</h3>
          <p>R$ {totalReceitas}</p>
        </div>
        <div className="card despesa">
          <h3>Saída</h3>
          <p>R$ {totalDespesas}</p>
        </div>
        <div className="card saldo">
          <h3>Saldo</h3>
          <p>R$ {saldo}</p>
        </div>
      </section>

      {/* Seção de categorias */}
      <section className="category-section">
        <h2>Categorias</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          addCategory()
        }}>
          <input
            type="text"
            placeholder="Nova Categoria"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          />
          <button type="submit">Adicionar Categoria</button>
          <hr style={{ margin: '10px 0' }} /><br />

          {/* Lista de categorias com total */}
          <div className="categories-list">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category} - Total: R$ {getTotalByCategory(category)}
              </div>
            ))}
          </div>
        </form>
      </section>

      {/* Formulário de transações */}
      <section className="form-section">
        <h2>Adicionar Transação</h2>
        <form onSubmit={addTransaction} className="transaction-form">
          {/* Select para escolher Entrada ou Saída */}
          <select value={type} onChange={e => setType(e.target.value as 'Entrada' | 'Saida')}>
            <option value="Entrada">Entrada</option>
            <option value="Saida">Saída</option>
          </select>

          {/* Select para escolher categoria */}
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Selecione uma categoria</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Input para valor */}
          <input
            type="number"
            value={value}
            onChange={e => setValue(Number(e.target.value))}
            placeholder="Valor"
          />

          {/* Botão para enviar */}
          <button type="submit">Adicionar</button>
        </form>
      </section>

      {/* Gráfico */}
      <Chart receitas={totalReceitas} despesas={totalDespesas} />

      {/* Lista de transações */}
      <Transactions data={transactions} />
    </div>
  )
}

// Exporta o componente
export default Dashboard
