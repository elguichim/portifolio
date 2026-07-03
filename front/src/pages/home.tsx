// import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './index.css'

// import de imagens
import whatsapp from "../assets/icones/WhatsApp.png"
import instagram from "../assets/icones/Instagram.png"
import facebook from "../assets/icones/facebook.png"

function Home() {
  const homeRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const home = homeRef.current
      const light = lightRef.current

      if (home && light) {
        const rect = home.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

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
        <div className="logo">Meu Portfólio</div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
          {menuOpen && (
            <ul className="submenu">
              <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projetos</a></li>
              <li><a href="#skills" onClick={() => setMenuOpen(false)}>Habilidades</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contato</a></li>
            </ul>
          )}
        </button>

        {/* Menu principal (desktop) */}
        <ul className="menu">
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
          <button>Saiba Mais.CV</button>
        </div>

        <div className="about">
          <h2>Sobre mim</h2>
          <p>

            Estou iniciando minha jornada como desenvolvedor e construindo meus primeiros projetos.
            Tenho interesse em aprender e aplicar boas práticas de programação, design responsivo
            e desenvolvimento web moderno. Meu objetivo é evoluir constantemente e transformar
            ideias em soluções digitais funcionais.aa          </p>
        </div>
      </div>

      {/* PROJETOS */}
      <div className="projects" id="projects">
        <h2>Projetos</h2>
        <div className="project-list">
          <div className="project-item">
            <img src="./dashboard-financeiro.png" alt="Projeto 1" />
            <h3>Dashboard Financeiro</h3>
            <p>Um painel para controle de gastos e receitas, com gráficos e relatórios.</p>
            <a href="/dashboard" className="project-link">Ver Projeto</a>
          </div>

          <div className="project-item">
            <img src="./tasks.png" alt="Projeto 2" />
            <h3>App de Tarefas</h3>
            <p>Organize suas tarefas do dia a dia com eficiência.</p>
            <a href="/tasks" className="project-link">Ver Projeto</a>
          </div>

          <div className="project-item">
            <img src="./eletric.png" alt="Projeto 3" />
            <h3>Sala de Elétrica</h3>
            <p>Planeje e crie circuitos elétricos.</p>
            <a href="/eletric" className="project-link">Ver Projeto</a>
          </div>
        </div>
      </div>

      {/* HABILIDADES */}
      <div className="skills" id="skills">
        <h2>Habilidades</h2>
        <div className="skills-list">
          <div className="skill-item"><h1>JavaScript</h1><p>Experiência em desenvolvimento com JavaScript.</p></div>
          <div className="skill-item"><h1>React</h1><p>Conhecimento em construção de interfaces com React.</p></div>
          <div className="skill-item"><h1>Node.js</h1><p>Experiência em desenvolvimento com Node.js.</p></div>
          <div className="skill-item"><h1>CSS</h1><p>Conhecimento em estilização com CSS.</p></div>
        </div>
      </div>

      {/* CONTATO */}
      <div className="contact" id="contact">
        <h2>Entre em contato</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const name = (document.getElementById("name") as HTMLInputElement).value
            const message = (document.getElementById("message") as HTMLTextAreaElement).value
            const phone = "5562993976071"

            const rawText = `Olá, meu nome é ${name}.\n${message}`
            const text = encodeURIComponent(rawText)

            window.open(`https://wa.me/${phone}?text=${text}`, "_blank")
          }}
        >
          <div><input type="text" id="name" name="name" placeholder="Seu nome" /></div>
          <div><textarea id="message" name="message" placeholder="Sua mensagem"></textarea></div>
          <button type="submit">
            Enviar Mensagem
            <img src={whatsapp} alt="WhatsApp" style={{ width: "20px", marginLeft: "8px" }} />
          </button>
        </form>

        <div className="contact-info">ou</div>
        <ul className="social-links">
          <li><a href="https://www.instagram.com/elg_dev?utm_source=qr"><img src={instagram} alt="Instagram" style={{ width: "40px", marginRight: "6px" }} /></a></li>
          <li><a href="#"><img src={whatsapp} alt="WhatsApp" style={{ width: "40px", marginRight: "6px" }} /></a></li>
          <li><a href="#"><img src={facebook} alt="Facebook" style={{ width: "50px", marginRight: "6px" }} /></a></li>
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
