type ChartProps = { receitas: number; despesas: number }

function Chart({ receitas, despesas }: ChartProps) {
  const total = receitas + despesas
  const receitaPercent = total > 0 ? (receitas / total) * 100 : 0
  const despesaPercent = total > 0 ? (despesas / total) * 100 : 0

  return (
    <div className="chart">
      <h2>Resumo Financeiro</h2>
      <div className="bar">
        <div className="receita-bar" style={{ width: `${receitaPercent}%` }}></div>
        <div className="despesa-bar" style={{ width: `${despesaPercent}%` }}></div>
      </div>
      <p>Receitas: {receitaPercent.toFixed(1)}% | Despesas: {despesaPercent.toFixed(1)}%</p>
    </div>
  )
}

export default Chart
