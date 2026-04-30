const eventData = {
            balada: {
                title: "Balada da Virada",
                badge: "Lote 2",
                badgeClass: "soon",
                date: "31 Dez 2024",
                time: "22h00 – 04h00",
                loc: "Club X — Av. Paulista, 900",
                bg: "linear-gradient(135deg,#1a0028,#3d0066,#8B1A1A)",
            },
            copa: {
                title: "Copa Belas Artes",
                badge: "Inscrições abertas",
                badgeClass: "open",
                date: "15 Jan 2025",
                time: "08h00 – 18h00",
                loc: "Ginásio BA — Campus Paulista",
                bg: "linear-gradient(135deg,#001a3d,#003380,#1a4080)",
            },
            open: {
                title: "Open Bar Calouros",
                badge: "Vendas abertas",
                badgeClass: "open",
                date: "22 Jan 2025",
                time: "21h00 – 03h00",
                loc: "Espaço Aurora — Pinheiros",
                bg: "linear-gradient(135deg,#1a1200,#3d2c00,#6b4e00)",
            },
        };

        const timesData = {
            direito: {
                name: "Direito",
                modals: [
                    {
                        name: "Futsal Masculino",
                        badge: "Treino hoje 19h",
                        type: "treino",
                    },
                    { name: "Futsal Feminino", badge: "Jogo amanhã 15h", type: "jogo" },
                    { name: "Vôlei Misto", badge: "Campeões Interfau", type: "ok" },
                    { name: "Basquete", badge: "Treino Sex 18h", type: "treino" },
                    { name: "Tênis de Mesa", badge: "Treino Qua 20h", type: "treino" },
                ],
            },
            design: {
                name: "Design",
                modals: [
                    { name: "Futsal Masculino", badge: "Jogo hoje 20h", type: "jogo" },
                    { name: "Vôlei Feminino", badge: "Treino Ter 19h", type: "treino" },
                    { name: "Basquete", badge: "Treino Qui 19h", type: "treino" },
                    { name: "Corrida", badge: "Circuito aberto", type: "ok" },
                ],
            },
            eng: {
                name: "Engenharia",
                modals: [
                    { name: "Futsal Masculino", badge: "Jogo sex 17h", type: "jogo" },
                    {
                        name: "Futsal Feminino",
                        badge: "Treino hoje 18h",
                        type: "treino",
                    },
                    { name: "Vôlei Masculino", badge: "Campeões 2024", type: "ok" },
                    { name: "Basquete", badge: "Treino Seg 20h", type: "treino" },
                    { name: "Tênis", badge: "Treino Sáb 09h", type: "treino" },
                    { name: "Natação", badge: "Treino Qua 07h", type: "treino" },
                ],
            },
            arqs: {
                name: "Arq. & Urb.",
                modals: [
                    { name: "Futsal Misto", badge: "Treino Qui 18h", type: "treino" },
                    { name: "Vôlei Misto", badge: "Jogo dom 10h", type: "jogo" },
                    { name: "Xadrez", badge: "Torneio aberto", type: "ok" },
                ],
            },
        };

        function switchTab(tab) {
            document
                .querySelectorAll(".tab")
                .forEach((t) => t.classList.remove("active"));
            document
                .querySelectorAll(".screen")
                .forEach((s) => s.classList.remove("active"));
            document.getElementById("tab-" + tab).classList.add("active");
            document.getElementById("screen-" + tab).classList.add("active");
            if (tab === "menu") {
                openSheet();
                document.getElementById("tab-menu").classList.remove("active");
            }
        }

        function openSheet() {
            document.getElementById("sheet-overlay").classList.add("open");
            document.getElementById("bottom-sheet").classList.add("open");
        }
        function closeSheet() {
            document.getElementById("sheet-overlay").classList.remove("open");
            document.getElementById("bottom-sheet").classList.remove("open");
            closeEntidades();
        }
        function openEntidades() {
            document.getElementById("sheet-main").style.display = "none";
            document.getElementById("sheet-entities").style.display = "block";
        }
        function closeEntidades() {
            document.getElementById("sheet-main").style.display = "block";
            document.getElementById("sheet-entities").style.display = "none";
        }

        function switchEvTab(tab) {
            document
                .querySelectorAll(".tab-top")
                .forEach((t) => t.classList.remove("active"));
            document
                .querySelectorAll(".event-tab-content")
                .forEach((c) => c.classList.remove("active"));
            document.getElementById("ev-tab-" + tab).classList.add("active");
            document.getElementById("ev-" + tab).classList.add("active");
        }

        function openEventDetail(id) {
            const d = eventData[id];
            document.getElementById("detail-title").textContent = d.title;
            document.getElementById("detail-badge").textContent = d.badge;
            document.getElementById("detail-badge").className =
                "event-badge " + d.badgeClass;
            document.getElementById("detail-date").textContent = d.date;
            document.getElementById("detail-time").textContent = d.time;
            document.getElementById("detail-loc").textContent = d.loc;
            document.getElementById("detail-art").style.background = d.bg;
            document.getElementById("event-detail").classList.add("open");
        }
        function closeEventDetail() {
            document.getElementById("event-detail").classList.remove("open");
        }

        function openLevel2(curso) {
            const d = timesData[curso];
            document.getElementById("level2-title").textContent = d.name;
            document.getElementById("modal-list").innerHTML = d.modals
                .map(
                    (m) => `
    <div class="modal-card" onclick="openLevel3('${m.name}', '${curso}')">
      <div class="modal-left">
        <div class="modal-name">${m.name}</div>
        <div class="modal-badge ${m.type}">${m.type === "treino" ? "⏰" : m.type === "jogo" ? "🔴" : "✓"} ${m.badge}</div>
      </div>
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  `,
                )
                .join("");
            document.getElementById("level2").classList.add("open");
        }
        function closeLevel2() {
            document.getElementById("level2").classList.remove("open");
        }

        function switchInner(tab, btn) {
            document
                .querySelectorAll(".inner-tab")
                .forEach((t) => t.classList.remove("active"));
            document
                .querySelectorAll(".tab-content")
                .forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById("tab-" + tab).classList.add("active");
        }

        function openLevel3(nome, curso) {
            document.getElementById("l3-title").textContent = nome;
            document.getElementById("l3").classList.add("open");
        }

        function closeLevel3() {
            document.getElementById("l3").classList.remove("open");
        }

        function toggleExpand() {
            const c = document.getElementById("expand-content");
            const ch = document.getElementById("chevron");
            const lb = document.getElementById("expand-label");
            const isOpen = c.classList.toggle("open");
            ch.textContent = isOpen ? "↑" : "↓";
            ch.classList.toggle("open", isOpen);
            lb.textContent = isOpen ? "Recolher" : "Ler história completa";
        }