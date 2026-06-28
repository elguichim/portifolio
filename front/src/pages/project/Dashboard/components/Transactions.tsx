type Transaction = { id: number; type: 'Entrada' | 'Saida'; flow: string; value: number }
type TransactionsProps = { data: Transaction[] }

function Transactions({ data }: TransactionsProps) {
  return (
    <div className="transactions">
      <h2>Transações</h2>
      <ul>
        {data.map(item => (
          <li key={item.id} className={item.type.toLowerCase()}>
           {item.flow} | {item.type}: <span>R$ {item.value}</span> 
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Transactions
