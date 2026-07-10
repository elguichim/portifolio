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

  // Lista de projetos para evitar repetição
  const projects = [
    {
      img: "./dashboard-financeiro.png",
      title: "Dashboard Financeiro",
      description: "Controle de gastos e receitas com gráficos.",
      link: "/dashboard"
    },
    {
      img: "./tasks.png",
      title: "App de Tarefas",
      description: "Organize suas tarefas do dia a dia com eficiência.",
      link: "/tasks"
    },
    {
      img: "./eletric.png",
      title: "Sala de Elétrica",
      description: "Planeje e crie circuitos elétricos.",
      link: "/eletric"
    }
  ]

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="logo">Meu Portfólio</div>
        <div>
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
                <li><a href="/login" className="login-btn" onClick={() => setMenuOpen(false)}>LOGIN</a></li>
              </ul>
            )}
          </button>

          {/* Menu principal (desktop) */}
          <nav>
            <ul className="menu">
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projetos</a></li>
              <li><a href="#skills">Habilidades</a></li>
              <li><a href="#contact">Contato</a></li>
              <li><a href="https://subscribers-dashboar.vercel.app/" >LOGIN</a></li>
            </ul>
          </nav>

        </div>

      </header>

      {/* HOME */}
      <section className="home" id="home" ref={homeRef}>
        <div className="light" ref={lightRef}></div>
        <div className="intro">
          <h1>Bem-vindo ao meu <br /><span>Portfólio</span></h1>
          <button>Saiba Mais.CV</button>
        </div>

        <article className="about">
          <h2>Sobre mim</h2>
          <p>
            Estou iniciando minha jornada como desenvolvedor e construindo meus primeiros projetos.
            Tenho interesse em aprender e aplicar boas práticas de programação, design responsivo
            e desenvolvimento web moderno. Meu objetivo é evoluir constantemente e transformar
            ideias em soluções digitais funcionais.
          </p>
        </article>
      </section>

      {/* PROJETOS */}
      <section className="projects" id="projects">
        <h2>Projetos</h2>
        <p>Confira alguns dos meus projetos recentes e explore minhas habilidades em desenvolvimento web.</p>
        <div className="project-list">
          {projects.map((proj, index) => (
            <article className="card" key={index}>
              <img src={proj.img} alt={proj.title} className="card-image" />
              <div className="card-overlay">
                <h3 className="card-title">{proj.title}</h3>
                <p className="card-description">{proj.description}</p>
                <a href={proj.link} className="card-link">Ver Projeto</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HABILIDADES */}
      <section className="skills" id="skills">
        <h2>Habilidades</h2>
        <div className="container">
          <div className="box-card">
            <div className="face front"><h3>JavaScript</h3></div>
            <div className="face back"><h3>MySQL</h3></div>
            <div className="face right"><h3>React</h3></div>
            <div className="face left"><h3>Node.js</h3></div>
            <div className="face top"><h3>CSS</h3></div>
            <div className="face bottom"><h3>HTML</h3></div>
          </div>
        </div>
        {/* <h2>Habilidades</h2>
        <div className="skills-list">
          <div className="skill-item"><h3>JavaScript</h3><p>Experiência em desenvolvimento com JavaScript.</p></div>
          <div className="skill-item"><h3>React</h3><p>Conhecimento em construção de interfaces com React.</p></div>
          <div className="skill-item"><h3>Node.js</h3><p>Experiência em desenvolvimento com Node.js.</p></div>
          <div className="skill-item"><h3>CSS</h3><p>Conhecimento em estilização com CSS.</p></div>
        </div> */}
      </section>

      {/* CONTATO */}
      <section className="contact" id="contact">
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
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2024 Meu Portfólio. Todos os direitos reservados.</p>
      </footer>
    </>
  )
}

export default Home
