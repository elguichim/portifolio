import React, { useState } from "react";

interface Props {
  onAdd: (type: string) => void;
}

const ObjectList: React.FC<Props> = ({ onAdd }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div>
      <div className="object-section">
        <h3 onClick={() => toggleSection("lampadas")}>Lâmpadas</h3>
        {openSection === "lampadas" && (
          <ul>
            <li onClick={() => onAdd("lampada")}>Lâmpada</li>
          </ul>
        )}
      </div>

      <div className="object-section">
        <h3 onClick={() => toggleSection("interruptores")}>Interruptores</h3>
        {openSection === "interruptores" && (
          <ul>
            <li onClick={() => onAdd("interruptor")}>Interruptor</li>
          </ul>
        )}
      </div>

      <div className="object-section">
        <h3 onClick={() => toggleSection("disjuntores")}>Disjuntores</h3>
        {openSection === "disjuntores" && (
          <ul>
            <li onClick={() => onAdd("disjuntor")}>Disjuntor 10A</li>
          </ul>
        )}
      </div>

      {/* 🔧 NOVO: seção para tomadas */}
      <div className="object-section">
        <h3 onClick={() => toggleSection("tomadas")}>Tomadas</h3>
        {openSection === "tomadas" && (
          <ul>
            <li onClick={() => onAdd("tomada")}>Tomada</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ObjectList;
