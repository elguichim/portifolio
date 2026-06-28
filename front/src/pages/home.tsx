
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './index.css'


function Home() {
  const homeRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const home = homeRef.current
      const light = lightRef.current

      if (home && light) {
        const rect = home.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        // Atualiza posição da luz
        light.style.left = `${x}px`
        light.style.top = `${y}px`
      }
    }

    const home = homeRef.current
    if (home) {
      home.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (home) {
        home.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projetos</a></li>
          <li><a href="#skills">Habilidades</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
      </div>

      {/* HOME */}
      <div className="home" id="home" ref={homeRef}>
        <div className="light" ref={lightRef}></div>
        <div className="intro">
          <h1>Bem-vindo ao meu <br /><span>Portfólio</span></h1>
          <button>Saiba Mais</button>
        </div>

        <div className="about">
          <h2>Sobre mim</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc efficitur efficitur.
            Sed at ligula a enim efficitur bibendum. Curabitur ac felis nec nisi efficitur fermentum.
          </p>
        </div>
      </div>

      {/* PROJETOS */}
      <div className="projects" id="projects">
        <h2>Projetos</h2>
        <div className="project-list">
          <div className="project-item">
            <h3>Dashboard Financeiro</h3>
            <p>Um painel para controle de gastos e receitas, com gráficos e relatórios.</p>
            <Link to="/dashboard" className="project-link">Ver Projeto</Link>
          </div>

          <div className="project-item">
            <h3>App de Tarefas</h3>
            <p>Organize suas tarefas do dia a dia com eficiência.</p>
            <Link to="/tasks" className="project-link">Ver Projeto</Link>
          </div>

          <div className="project-item">
            <h3>sala de eletrica</h3>
            <p>Planeje e crie circuitos eletricos.</p>
            <Link to="/eletric" className="project-link">Ver Projeto</Link>
          </div>
        </div>
      </div>

      {/* HABILIDADES */}
      <div className="skills" id="skills">
        <h2>Habilidades</h2>
        <div className="skills-list">
          <div className="skill-item">
            <h1>JavaScript</h1>
            <p>Experiência em desenvolvimento com JavaScript.</p>
          </div>
          <div className="skill-item">
            <h1>React</h1>
            <p>Conhecimento em construção de interfaces com React.</p>
          </div>
          <div className="skill-item">
            <h1>Node.js</h1>
            <p>Experiência em desenvolvimento com Node.js.</p>
          </div>
          <div className="skill-item">
            <h1>CSS</h1>
            <p>Conhecimento em estilização com CSS.</p>
          </div>
        </div>
      </div>

      {/* CONTATO */}
      <div className="contact" id="contact">
        <h2>Entre em contato</h2>
        <form>
          <div>
            <input type="text" id="name" name="name" placeholder="Seu nome" />
          </div>
          <div>
            <textarea id="message" name="message" placeholder="Sua mensagem"></textarea>
          </div>
          <button type="submit">Enviar Mensagem</button>
        </form>
        <div className="contact-info">ou</div>
        <ul>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">WhatsApp</a></li>
          <li><a href="#">Facebook</a></li>
        </ul>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <p>© 2024 Meu Portfólio. Todos os direitos reservados.</p>
      </div>
    </>
  )
}

export default Home
