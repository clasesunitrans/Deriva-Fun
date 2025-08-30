// Deriva-Fun - Aplicación principal
class DerivaFun {
    constructor() {
        this.currentSection = 'teoria';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.initializeContent();
        this.setupKaTeX();
    }

    // Configurar navegación entre secciones
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.seccion');

        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetSection = e.target.id.replace('btn-', '');
                this.switchSection(targetSection);
            });
        });
    }

    // Cambiar entre secciones
    switchSection(sectionName) {
        // Ocultar todas las secciones
        document.querySelectorAll('.seccion').forEach(section => {
            section.classList.remove('active');
        });

        // Remover clase active de todos los botones
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionName);
        const targetButton = document.getElementById(`btn-${sectionName}`);

        if (targetSection && targetButton) {
            targetSection.classList.add('active');
            targetButton.classList.add('active');
            this.currentSection = sectionName;

            // Cargar contenido específico de la sección
            this.loadSectionContent(sectionName);
        }
    }

    // Cargar contenido específico de cada sección
    loadSectionContent(sectionName) {
        switch (sectionName) {
            case 'teoria':
                this.loadTeoriaContent();
                break;
            case 'practica':
                this.loadPracticaContent();
                break;
            case 'reto':
                this.loadRetoContent();
                break;
        }
    }

    // Inicializar contenido al cargar la página
    initializeContent() {
        this.loadTeoriaContent();
    }

    // Configurar KaTeX para renderizado matemático
    setupKaTeX() {
        // Configuración adicional de KaTeX si es necesaria
        if (typeof renderMathInElement !== 'undefined') {
            // Re-renderizar matemáticas cuando se cambie de sección
            const observer = new MutationObserver(() => {
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ]
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Cargar contenido de la sección Teoría
    loadTeoriaContent() {
        const container = document.getElementById('teoria-content');
        if (!container) return;

        const teoriaData = this.getTeoriaData();
        let html = '<div class="card-grid">';

        teoriaData.forEach((categoria, index) => {
            html += `
                <div class="card">
                    <div class="card-header" onclick="app.toggleCard(${index})">
                        <h3 class="card-title">${categoria.titulo}</h3>
                        <button class="card-toggle" id="toggle-${index}">▼</button>
                    </div>
                    <div class="card-content" id="content-${index}">
                        ${this.generateFormulasList(categoria.formulas)}
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;

        // Re-renderizar matemáticas
        this.renderMath();
    }

    // Alternar visibilidad de tarjetas
    toggleCard(index) {
        const content = document.getElementById(`content-${index}`);
        const toggle = document.getElementById(`toggle-${index}`);

        if (content && toggle) {
            content.classList.toggle('expanded');
            toggle.classList.toggle('expanded');
        }
    }

    // Generar lista de fórmulas
    generateFormulasList(formulas) {
        return formulas.map(formula => `
            <div class="formula-item">
                <div class="formula-text">
                    <strong>${formula.nombre}:</strong> $${formula.formula}$ ${formula.explicacion || ''}
                </div>
                <span class="formula-emoji">${formula.emoji}</span>
            </div>
        `).join('');
    }

    // Datos de teoría organizados por categorías
    getTeoriaData() {
        return [
            {
                titulo: "Reglas Básicas",
                formulas: [
                    {
                        nombre: "Función Constante",
                        formula: "f(x) = c \\implies f'(x) = 0",
                        emoji: "🤔",
                        explicacion: "La derivada de una constante es siempre cero"
                    },
                    {
                        nombre: "Función Identidad",
                        formula: "f(x) = x \\implies f'(x) = 1",
                        emoji: "🙋‍♂️",
                        explicacion: "La derivada de x es 1"
                    },
                    {
                        nombre: "Regla de la Potencia",
                        formula: "f(x) = x^n \\implies f'(x) = nx^{n-1}",
                        emoji: "💪",
                        explicacion: "Baja el exponente y resta 1"
                    }
                ]
            },
            {
                titulo: "Reglas de Álgebra de Derivadas",
                formulas: [
                    {
                        nombre: "Suma y Resta",
                        formula: "(f \\pm g)'(x) = f'(x) \\pm g'(x)",
                        emoji: "➕➖",
                        explicacion: "La derivada de una suma es la suma de las derivadas"
                    },
                    {
                        nombre: "Producto",
                        formula: "(f \\cdot g)'(x) = f'(x)g(x) + f(x)g'(x)",
                        emoji: "🤝",
                        explicacion: "Regla del producto: deriva el primero por el segundo más el primero por la derivada del segundo"
                    },
                    {
                        nombre: "Cociente",
                        formula: "\\left(\\frac{f}{g}\\right)'(x) = \\frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}",
                        emoji: "🤯",
                        explicación: "Regla del cociente: (derivada del numerador × denominador - numerador × derivada del denominador) / denominador²"
                    }
                ]
            },
            {
                titulo: "¡La Regla Maestra!",
                formulas: [
                    {
                        nombre: "Regla de la Cadena",
                        formula: "(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)",
                        emoji: "⛓️‍💥",
                        explicacion: "Deriva la función de 'afuera', dejando lo de 'adentro' igual, y luego multiplica por la derivada de lo de 'adentro'. ¡Es como pelar una cebolla, capa por capa!"
                    }
                ]
            },
            {
                titulo: "Funciones Exponenciales y Logarítmicas",
                formulas: [
                    {
                        nombre: "Exponencial Natural",
                        formula: "f(x) = e^x \\implies f'(x) = e^x",
                        emoji: "🤯",
                        explicacion: "¡La función que es su propia derivada!"
                    },
                    {
                        nombre: "Exponencial General",
                        formula: "f(x) = a^x \\implies f'(x) = a^x \\ln(a)",
                        emoji: "📈",
                        explicacion: "Multiplica por el logaritmo natural de la base"
                    },
                    {
                        nombre: "Logaritmo Natural",
                        formula: "f(x) = \\ln(x) \\implies f'(x) = \\frac{1}{x}",
                        emoji: "🍃",
                        explicacion: "Uno sobre x"
                    },
                    {
                        nombre: "Logaritmo Base a",
                        formula: "f(x) = \\log_a(x) \\implies f'(x) = \\frac{1}{x \\ln(a)}",
                        emoji: "🪵",
                        explicacion: "Uno sobre x por logaritmo natural de la base"
                    }
                ]
            },
            {
                titulo: "Funciones Trigonométricas",
                formulas: [
                    {
                        nombre: "Seno",
                        formula: "f(x) = \\sin(x) \\implies f'(x) = \\cos(x)",
                        emoji: "☀️",
                        explicacion: "El seno se convierte en coseno"
                    },
                    {
                        nombre: "Coseno",
                        formula: "f(x) = \\cos(x) \\implies f'(x) = -\\sin(x)",
                        emoji: "🌙",
                        explicacion: "El coseno se convierte en menos seno"
                    },
                    {
                        nombre: "Tangente",
                        formula: "f(x) = \\tan(x) \\implies f'(x) = \\sec^2(x)",
                        emoji: "📐",
                        explicacion: "La tangente se convierte en secante al cuadrado"
                    }
                ]
            },
            {
                titulo: "Funciones Trigonométricas Inversas",
                formulas: [
                    {
                        nombre: "Arcoseno",
                        formula: "f(x) = \\arcsin(x) \\implies f'(x) = \\frac{1}{\\sqrt{1-x^2}}",
                        emoji: "↩️☀️",
                        explicacion: "Uno sobre raíz de uno menos x cuadrado"
                    },
                    {
                        nombre: "Arcocoseno",
                        formula: "f(x) = \\arccos(x) \\implies f'(x) = -\\frac{1}{\\sqrt{1-x^2}}",
                        emoji: "↩️🌙",
                        explicacion: "Menos uno sobre raíz de uno menos x cuadrado"
                    },
                    {
                        nombre: "Arcotangente",
                        formula: "f(x) = \\arctan(x) \\implies f'(x) = \\frac{1}{1+x^2}",
                        emoji: "↩️📐",
                        explicacion: "Uno sobre uno más x cuadrado"
                    }
                ]
            }
        ];
    }

    // Cargar contenido de la sección Práctica
    loadPracticaContent() {
        const container = document.getElementById('practica-content');
        if (!container) return;

        container.innerHTML = `
            <div class="practice-controls">
                <div class="filter-section">
                    <h3 class="filter-title">Selecciona las reglas que quieres practicar:</h3>
                    <div class="checkbox-group">
                        <label class="checkbox-item">
                            <input type="checkbox" value="basicas" checked> Reglas Básicas
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" value="algebraicas" checked> Reglas Algebraicas
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" value="cadena"> Regla de la Cadena
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" value="exponenciales"> Exponenciales y Logarítmicas
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" value="trigonometricas"> Trigonométricas
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" value="inversas"> Trigonométricas Inversas
                        </label>
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-primary" onclick="app.generateExercise()">Generar Nuevo Ejercicio</button>
                </div>
            </div>
            
            <div id="exercise-area" class="exercise-container" style="display: none;">
                <!-- Los ejercicios se generarán aquí -->
            </div>
        `;
    }

    // Cargar contenido de la sección Reto
    loadRetoContent() {
        const container = document.getElementById('reto-content');
        if (!container) return;

        container.innerHTML = `
            <div class="level-selector">
                <button class="level-btn active" data-level="1" onclick="app.selectLevel(1)">
                    Nivel 1 - Básico 😎
                </button>
                <button class="level-btn" data-level="2" onclick="app.selectLevel(2)">
                    Nivel 2 - Intermedio 🤓
                </button>
                <button class="level-btn" data-level="3" onclick="app.selectLevel(3)">
                    Nivel 3 - Avanzado 🔥
                </button>
                <button class="level-btn" data-level="4" onclick="app.selectLevel(4)">
                    Nivel 4 - ¡Infierno! 👹
                </button>
            </div>
            
            <div class="challenge-area">
                <div class="exercise-container">
                    <h3>Selecciona un nivel para comenzar el reto</h3>
                    <p>Cada nivel tiene diferentes tipos de ejercicios y dificultades. ¡Pon a prueba tus habilidades!</p>
                </div>
            </div>
            
            <div class="leaderboard">
                <h3 class="leaderboard-title">🏆 Tabla de Puntuaciones</h3>
                <ul class="leaderboard-list" id="leaderboard-list">
                    <!-- Las puntuaciones se cargarán aquí -->
                </ul>
            </div>
        `;

        this.loadLeaderboard();
    }

    // Generar ejercicio de práctica
    generateExercise() {
        const selectedFilters = this.getSelectedFilters();
        if (selectedFilters.length === 0) {
            alert('Por favor, selecciona al menos una categoría de reglas para practicar.');
            return;
        }

        const exercise = this.createExercise(selectedFilters);
        this.displayExercise(exercise);
    }

    // Obtener filtros seleccionados
    getSelectedFilters() {
        const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]:checked');
        return Array.from(checkboxes).map(cb => cb.value);
    }

    // Crear ejercicio basado en filtros
    createExercise(filters) {
        const exercisePool = this.getExercisePool();
        const availableExercises = exercisePool.filter(ex => 
            filters.some(filter => ex.categories.includes(filter))
        );

        if (availableExercises.length === 0) {
            return this.createBasicExercise();
        }

        const randomExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
        return randomExercise;
    }

    // Pool de ejercicios organizados por categoría
    getExercisePool() {
        return [
            // Reglas Básicas
            {
                function: "f(x) = 5",
                answer: "0",
                categories: ["basicas"],
                hint: "La derivada de una constante es siempre cero.",
                explanation: "Como 5 es una constante, su derivada es 0."
            },
            {
                function: "f(x) = x",
                answer: "1",
                categories: ["basicas"],
                hint: "La derivada de x es 1.",
                explanation: "Por la regla de la función identidad, la derivada de x es 1."
            },
            {
                function: "f(x) = x^3",
                answer: "3x^2",
                categories: ["basicas"],
                hint: "Usa la regla de la potencia: baja el exponente y resta 1.",
                explanation: "Aplicando la regla de la potencia: 3x^{3-1} = 3x^2"
            },
            {
                function: "f(x) = 2x^4",
                answer: "8x^3",
                categories: ["basicas"],
                hint: "Multiplica el coeficiente por el exponente.",
                explanation: "2 × 4 × x^{4-1} = 8x^3"
            },
            
            // Reglas Algebraicas
            {
                function: "f(x) = x^2 + 3x",
                answer: "2x + 3",
                categories: ["algebraicas", "basicas"],
                hint: "Deriva cada término por separado.",
                explanation: "La derivada de x^2 es 2x y la derivada de 3x es 3."
            },
            {
                function: "f(x) = x^3 - 2x^2 + 5",
                answer: "3x^2 - 4x",
                categories: ["algebraicas", "basicas"],
                hint: "Deriva término por término.",
                explanation: "3x^2 - 2(2x) + 0 = 3x^2 - 4x"
            },
            {
                function: "f(x) = x \\cdot \\sin(x)",
                answer: "\\sin(x) + x\\cos(x)",
                categories: ["algebraicas", "trigonometricas"],
                hint: "Usa la regla del producto: (fg)' = f'g + fg'",
                explanation: "f'(x) = 1 × sin(x) + x × cos(x) = sin(x) + x cos(x)"
            },
            {
                function: "f(x) = \\frac{x^2}{x+1}",
                answer: "\\frac{x^2 + 2x}{(x+1)^2}",
                categories: ["algebraicas"],
                hint: "Usa la regla del cociente.",
                explanation: "Aplicando (f/g)' = (f'g - fg')/g^2"
            },

            // Regla de la Cadena
            {
                function: "f(x) = (x^2 + 1)^3",
                answer: "6x(x^2 + 1)^2",
                categories: ["cadena", "basicas"],
                hint: "Hay una función dentro de otra. ¡Regla de la cadena!",
                explanation: "Deriva el exterior: 3(x^2+1)^2, luego multiplica por la derivada del interior: 2x"
            },
            {
                function: "f(x) = \\sin(3x)",
                answer: "3\\cos(3x)",
                categories: ["cadena", "trigonometricas"],
                hint: "No olvides la derivada de lo que está dentro del seno.",
                explanation: "cos(3x) × 3 = 3cos(3x)"
            },
            {
                function: "f(x) = e^{2x}",
                answer: "2e^{2x}",
                categories: ["cadena", "exponenciales"],
                hint: "La exponencial se mantiene, pero multiplica por la derivada del exponente.",
                explanation: "e^{2x} × 2 = 2e^{2x}"
            },

            // Exponenciales y Logarítmicas
            {
                function: "f(x) = e^x",
                answer: "e^x",
                categories: ["exponenciales"],
                hint: "¡La función que es su propia derivada!",
                explanation: "La derivada de e^x es e^x"
            },
            {
                function: "f(x) = \\ln(x)",
                answer: "\\frac{1}{x}",
                categories: ["exponenciales"],
                hint: "La derivada del logaritmo natural es 1/x.",
                explanation: "Por definición, la derivada de ln(x) es 1/x"
            },
            {
                function: "f(x) = 2^x",
                answer: "2^x \\ln(2)",
                categories: ["exponenciales"],
                hint: "Para exponenciales con base diferente de e, multiplica por ln(base).",
                explanation: "2^x × ln(2)"
            },

            // Trigonométricas
            {
                function: "f(x) = \\sin(x)",
                answer: "\\cos(x)",
                categories: ["trigonometricas"],
                hint: "El seno se convierte en coseno.",
                explanation: "La derivada de sin(x) es cos(x)"
            },
            {
                function: "f(x) = \\cos(x)",
                answer: "-\\sin(x)",
                categories: ["trigonometricas"],
                hint: "El coseno se convierte en menos seno.",
                explanation: "La derivada de cos(x) es -sin(x)"
            },
            {
                function: "f(x) = \\tan(x)",
                answer: "\\sec^2(x)",
                categories: ["trigonometricas"],
                hint: "La tangente se convierte en secante al cuadrado.",
                explanation: "La derivada de tan(x) es sec²(x)"
            },

            // Trigonométricas Inversas
            {
                function: "f(x) = \\arcsin(x)",
                answer: "\\frac{1}{\\sqrt{1-x^2}}",
                categories: ["inversas"],
                hint: "Uno sobre raíz de uno menos x cuadrado.",
                explanation: "La derivada de arcsin(x) es 1/√(1-x²)"
            },
            {
                function: "f(x) = \\arctan(x)",
                answer: "\\frac{1}{1+x^2}",
                categories: ["inversas"],
                hint: "Uno sobre uno más x cuadrado.",
                explanation: "La derivada de arctan(x) es 1/(1+x²)"
            }
        ];
    }

    // Crear ejercicio básico si no hay filtros
    createBasicExercise() {
        return {
            function: "f(x) = x^2",
            answer: "2x",
            categories: ["basicas"],
            hint: "Usa la regla de la potencia.",
            explanation: "Aplicando la regla de la potencia: 2x^{2-1} = 2x"
        };
    }

    // Mostrar ejercicio en pantalla
    displayExercise(exercise) {
        const exerciseArea = document.getElementById('exercise-area');
        if (!exerciseArea) return;

        this.currentExercise = exercise;

        exerciseArea.innerHTML = `
            <h3 class="exercise-question">
                Encuentra la derivada de: $${exercise.function}$
            </h3>
            <div class="exercise-input-container">
                <input type="text" 
                       id="user-answer" 
                       class="exercise-input" 
                       placeholder="Escribe tu respuesta aquí (usa LaTeX)..."
                       onkeypress="if(event.key==='Enter') app.checkAnswer()">
            </div>
            <div class="exercise-buttons">
                <button class="btn btn-primary" onclick="app.checkAnswer()">Verificar Respuesta</button>
                <button class="btn btn-secondary" onclick="app.showHint()">Pista 💡</button>
                <button class="btn btn-secondary" onclick="app.generateExercise()">Nuevo Ejercicio</button>
            </div>
            <div id="feedback-area"></div>
        `;

        exerciseArea.style.display = 'block';
        this.renderMath();
        
        // Enfocar el input
        setTimeout(() => {
            document.getElementById('user-answer').focus();
        }, 100);
    }

    // Verificar respuesta del usuario
    checkAnswer() {
        const userInput = document.getElementById('user-answer');
        const feedbackArea = document.getElementById('feedback-area');
        
        if (!userInput || !feedbackArea || !this.currentExercise) return;

        const userAnswer = userInput.value.trim();
        const correctAnswer = this.currentExercise.answer;

        if (this.compareAnswers(userAnswer, correctAnswer)) {
            this.showCorrectFeedback(feedbackArea);
        } else {
            this.showIncorrectFeedback(feedbackArea, userAnswer);
        }
    }

    // Comparar respuestas (más robusto)
    compareAnswers(userAnswer, correctAnswer) {
        // Normalizar ambas respuestas: eliminar espacios, convertir a minúsculas
        const normalize = (str) => {
            let normalizedStr = str.replace(/\s+/g, "").toLowerCase();
            // Reemplazar \cdot con *
            normalizedStr = normalizedStr.replace(/\\cdot/g, "*");
            // Reemplazar \frac{a}{b} con (a)/(b)
            normalizedStr = normalizedStr.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1)/($2)");
            // Reemplazar sec^2(x) con 1/cos^2(x) para tangentes
            normalizedStr = normalizedStr.replace(/\\sec\^2\(([^)]+)\)/g, "1/(cos($1))^2");
            // Eliminar \ para funciones simples si el usuario no las usa
            normalizedStr = normalizedStr.replace(/\\sin/g, "sin");
            normalizedStr = normalizedStr.replace(/\\cos/g, "cos");
            normalizedStr = normalizedStr.replace(/\\tan/g, "tan");
            normalizedStr = normalizedStr.replace(/\\ln/g, "ln");
            normalizedStr = normalizedStr.replace(/\\log/g, "log");
            normalizedStr = normalizedStr.replace(/\\arcsin/g, "arcsin");
            normalizedStr = normalizedStr.replace(/\\arccos/g, "arccos");
            normalizedStr = normalizedStr.replace(/\\arctan/g, "arctan");
            // Manejar potencias como x^2 vs x**2
            normalizedStr = normalizedStr.replace(/\^/g, "**");
            return normalizedStr;
        };

        const normalizedUser = normalize(userAnswer);
        const normalizedCorrect = normalize(correctAnswer);

        // Comparación directa después de la normalización
        if (normalizedUser === normalizedCorrect) {
            return true;
        }

        // Intentar algunas equivalencias comunes para casos específicos
        // Ejemplo: -sin(x) vs sin(x)*-1
        if (normalizedUser === `-${normalizedCorrect}` || normalizedCorrect === `-${normalizedUser}`) {
            // Esto es para manejar casos como cos(x) -> -sin(x) donde el usuario podría olvidar el signo
            // Ojo: esto podría ser demasiado permisivo si la función no es trigonométrica
            // Por ahora, lo mantendremos simple y solo para el ejemplo dado.
            // Una solución más robusta requeriría un parser matemático.
            return false; // Si el signo es el único error, no es correcto.
        }

        // Para el caso específico de sin(x) -> cos(x) y cos(x) -> -sin(x)
        // Si la respuesta esperada es cos(x) y el usuario pone cos(x) (sin \) debería ser correcto
        if (normalize(correctAnswer) === normalize("\\cos(x)") && normalize(userAnswer) === normalize("cos(x)")) {
            return true;
        }
        if (normalize(correctAnswer) === normalize("-\\sin(x)") && normalize(userAnswer) === normalize("-sin(x)")) {
            return true;
        }

        // Si nada de lo anterior coincide, intentar una evaluación matemática si es posible
        // Esto es muy complejo sin una librería de evaluación de expresiones matemáticas.
        // Por ahora, nos basaremos en la normalización de cadenas.

        return false;
    }

    // Mostrar feedback correcto
    showCorrectFeedback(feedbackArea) {
        const encouragements = [
            "¡Excelente! 🎉",
            "¡Perfecto! 🌟",
            "¡Muy bien! 👏",
            "¡Correcto! ✨",
            "¡Fantástico! 🚀"
        ];
        
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        
        feedbackArea.innerHTML = `
            <div class="feedback correct">
                <strong>${randomEncouragement}</strong><br>
                ${this.currentExercise.explanation}
            </div>
        `;
        
        this.renderMath();
    }

    // Mostrar feedback incorrecto
    showIncorrectFeedback(feedbackArea, userAnswer) {
        const specificFeedback = this.getSpecificFeedback(userAnswer);
        
        feedbackArea.innerHTML = `
            <div class="feedback incorrect">
                <strong>No es correcto. 🤔</strong><br>
                ${specificFeedback}<br>
                <strong>Respuesta correcta:</strong> $${this.currentExercise.answer}$<br>
                <strong>Explicación:</strong> ${this.currentExercise.explanation}
            </div>
        `;
        
        this.renderMath();
    }

    // Obtener feedback específico basado en errores comunes
    getSpecificFeedback(userAnswer) {
        const exercise = this.currentExercise;
        
        // Detectar errores comunes
        if (exercise.categories.includes('cadena') && !userAnswer.includes('*') && !userAnswer.includes('\\cdot')) {
            return "¡Cuidado! Parece que hay una función 'dentro' de otra. ¡No olvides la Regla de la Cadena! ⛓️‍💥";
        }
        
        if (exercise.categories.includes('algebraicas') && exercise.function.includes('\\cdot')) {
            return "Recuerda usar la regla del producto: (fg)' = f'g + fg' 🤝";
        }
        
        if (exercise.categories.includes('trigonometricas') && exercise.function.includes('\\cos') && !userAnswer.includes('-')) {
            return "¿Recordaste el signo negativo en la derivada del coseno? 🌙";
        }
        
        return "Revisa las reglas de derivación. ¡Puedes hacerlo! 💪";
    }

    // Mostrar pista
    showHint() {
        const feedbackArea = document.getElementById('feedback-area');
        if (!feedbackArea || !this.currentExercise) return;

        feedbackArea.innerHTML = `
            <div class="feedback" style="background: #e6f3ff; color: #1a365d; border-left-color: #3182ce;">
                <strong>💡 Pista:</strong> ${this.currentExercise.hint}
            </div>
        `;
    }

    // Seleccionar nivel de reto
    selectLevel(level) {
        // Actualizar botones de nivel
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-level="${level}"]`).classList.add('active');

        this.currentLevel = level;
        this.currentScore = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;

        this.startChallenge(level);
    }

    // Iniciar desafío
    startChallenge(level) {
        const challengeArea = document.querySelector('.challenge-area');
        if (!challengeArea) return;

        const levelInfo = this.getLevelInfo(level);

        challengeArea.innerHTML = `
            <div class="exercise-container">
                <div class="challenge-header">
                    <h3>${levelInfo.title}</h3>
                    <p>${levelInfo.description}</p>
                    <div class="challenge-stats">
                        <span class="stat">Puntuación: <strong id="current-score">0</strong></span>
                        <span class="stat">Pregunta: <strong id="question-counter">1</strong>/10</span>
                        <span class="stat">Tiempo: <strong id="timer">60</strong>s</span>
                    </div>
                </div>
                <div id="challenge-exercise-area">
                    <!-- Los ejercicios del reto se generarán aquí -->
                </div>
                <div class="challenge-controls">
                    <button class="btn btn-primary" onclick="app.generateChallengeExercise()">Comenzar Reto</button>
                </div>
            </div>
        `;
    }

    // Obtener información del nivel
    getLevelInfo(level) {
        const levels = {
            1: {
                title: "Nivel 1 - Básico 😎",
                description: "Reglas de potencia, suma, resta, constante e identidad.",
                timeLimit: 60,
                categories: ["basicas"],
                pointsPerQuestion: 10
            },
            2: {
                title: "Nivel 2 - Intermedio 🤓",
                description: "Se añaden reglas de producto, cociente, exponenciales y logarítmicas.",
                timeLimit: 45,
                categories: ["basicas", "algebraicas", "exponenciales"],
                pointsPerQuestion: 15
            },
            3: {
                title: "Nivel 3 - Avanzado 🔥",
                description: "Se añaden funciones trigonométricas y trigonométricas inversas.",
                timeLimit: 30,
                categories: ["basicas", "algebraicas", "exponenciales", "trigonometricas", "inversas"],
                pointsPerQuestion: 20
            },
            4: {
                title: "Nivel 4 - ¡Infierno! 👹",
                description: "Ejercicios que combinan múltiples reglas, especialmente la Regla de la Cadena.",
                timeLimit: 20,
                categories: ["cadena", "algebraicas", "exponenciales", "trigonometricas"],
                pointsPerQuestion: 30
            }
        };

        return levels[level] || levels[1];
    }

    // Generar ejercicio de reto
    generateChallengeExercise() {
        if (this.questionsAnswered >= 10) {
            this.endChallenge();
            return;
        }

        const levelInfo = this.getLevelInfo(this.currentLevel);
        const exercise = this.createChallengeExercise(levelInfo);
        this.displayChallengeExercise(exercise, levelInfo);
        this.startTimer(levelInfo.timeLimit);
    }

    // Crear ejercicio específico para el reto
    createChallengeExercise(levelInfo) {
        const exercisePool = this.getChallengeExercisePool();
        const availableExercises = exercisePool.filter(ex => 
            ex.level <= this.currentLevel && 
            levelInfo.categories.some(cat => ex.categories.includes(cat))
        );

        if (availableExercises.length === 0) {
            return this.createBasicExercise();
        }

        const randomExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
        return randomExercise;
    }

    // Pool de ejercicios específicos para retos
    getChallengeExercisePool() {
        return [
            // Nivel 1 - Básico
            { function: "f(x) = 7", answer: "0", level: 1, categories: ["basicas"] },
            { function: "f(x) = x^5", answer: "5x^4", level: 1, categories: ["basicas"] },
            { function: "f(x) = 3x^2", answer: "6x", level: 1, categories: ["basicas"] },
            { function: "f(x) = x^4 + 2x", answer: "4x^3 + 2", level: 1, categories: ["basicas"] },

            // Nivel 2 - Intermedio
            { function: "f(x) = x^2 \\cdot e^x", answer: "2xe^x + x^2e^x", level: 2, categories: ["algebraicas", "exponenciales"] },
            { function: "f(x) = \\frac{x^3}{2x+1}", answer: "\\frac{3x^2(2x+1) - x^3 \\cdot 2}{(2x+1)^2}", level: 2, categories: ["algebraicas"] },
            { function: "f(x) = \\ln(x^2)", answer: "\\frac{2}{x}", level: 2, categories: ["exponenciales"] },
            { function: "f(x) = x^2 + \\ln(x)", answer: "2x + \\frac{1}{x}", level: 2, categories: ["basicas", "exponenciales"] },

            // Nivel 3 - Avanzado
            { function: "f(x) = \\sin(x) \\cos(x)", answer: "\\cos^2(x) - \\sin^2(x)", level: 3, categories: ["trigonometricas", "algebraicas"] },
            { function: "f(x) = \\frac{\\sin(x)}{x}", answer: "\\frac{x\\cos(x) - \\sin(x)}{x^2}", level: 3, categories: ["trigonometricas", "algebraicas"] },
            { function: "f(x) = \\arctan(x^2)", answer: "\\frac{2x}{1+x^4}", level: 3, categories: ["inversas", "cadena"] },
            { function: "f(x) = e^x \\sin(x)", answer: "e^x(\\sin(x) + \\cos(x))", level: 3, categories: ["exponenciales", "trigonometricas", "algebraicas"] },

            // Nivel 4 - Infierno
            { function: "f(x) = \\sin(e^{x^2})", answer: "2xe^{x^2}\\cos(e^{x^2})", level: 4, categories: ["cadena", "trigonometricas", "exponenciales"] },
            { function: "f(x) = \\ln(\\sin(x^3))", answer: "\\frac{3x^2\\cos(x^3)}{\\sin(x^3)}", level: 4, categories: ["cadena", "exponenciales", "trigonometricas"] },
            { function: "f(x) = (\\cos(x))^{\\sin(x)}", answer: "(\\cos(x))^{\\sin(x)}[\\cos(x)\\ln(\\cos(x)) - \\sin(x)\\tan(x)]", level: 4, categories: ["cadena", "trigonometricas", "exponenciales"] },
            { function: "f(x) = \\arcsin(\\sqrt{1-x^2})", answer: "\\frac{-x}{\\sqrt{1-x^2}\\sqrt{x^2}}", level: 4, categories: ["cadena", "inversas"] }
        ];
    }

    // Mostrar ejercicio de reto
    displayChallengeExercise(exercise, levelInfo) {
        const exerciseArea = document.getElementById('challenge-exercise-area');
        if (!exerciseArea) return;

        this.currentChallengeExercise = exercise;
        this.questionsAnswered++;

        exerciseArea.innerHTML = `
            <h3 class="exercise-question">
                Encuentra la derivada de: $${exercise.function}$
            </h3>
            <div class="exercise-input-container">
                <input type="text" 
                       id="challenge-answer" 
                       class="exercise-input" 
                       placeholder="Escribe tu respuesta aquí..."
                       onkeypress="if(event.key==='Enter') app.checkChallengeAnswer()">
            </div>
            <div class="exercise-buttons">
                <button class="btn btn-primary" onclick="app.checkChallengeAnswer()">Verificar</button>
                <button class="btn btn-secondary" onclick="app.skipChallengeQuestion()">Saltar (-${Math.floor(levelInfo.pointsPerQuestion/2)} pts)</button>
            </div>
            <div id="challenge-feedback-area"></div>
        `;

        // Actualizar contador de preguntas
        document.getElementById('question-counter').textContent = this.questionsAnswered;

        this.renderMath();
        
        // Enfocar el input
        setTimeout(() => {
            document.getElementById('challenge-answer').focus();
        }, 100);
    }

    // Verificar respuesta del reto
    checkChallengeAnswer() {
        const userInput = document.getElementById('challenge-answer');
        const feedbackArea = document.getElementById('challenge-feedback-area');
        
        if (!userInput || !feedbackArea || !this.currentChallengeExercise) return;

        this.stopTimer();

        const userAnswer = userInput.value.trim();
        const correctAnswer = this.currentChallengeExercise.answer;
        const levelInfo = this.getLevelInfo(this.currentLevel);

        if (this.compareAnswers(userAnswer, correctAnswer)) {
            this.correctAnswers++;
            const points = levelInfo.pointsPerQuestion + this.timeBonus;
            this.currentScore += points;
            
            feedbackArea.innerHTML = `
                <div class="feedback correct">
                    <strong>¡Correcto! +${points} puntos 🎉</strong>
                </div>
            `;
        } else {
            feedbackArea.innerHTML = `
                <div class="feedback incorrect">
                    <strong>Incorrecto 😔</strong><br>
                    Respuesta correcta: $${correctAnswer}$
                </div>
            `;
        }

        // Actualizar puntuación
        document.getElementById('current-score').textContent = this.currentScore;

        this.renderMath();

        // Continuar con la siguiente pregunta después de 2 segundos
        setTimeout(() => {
            this.generateChallengeExercise();
        }, 2000);
    }

    // Saltar pregunta del reto
    skipChallengeQuestion() {
        const levelInfo = this.getLevelInfo(this.currentLevel);
        const penalty = Math.floor(levelInfo.pointsPerQuestion / 2);
        this.currentScore = Math.max(0, this.currentScore - penalty);
        
        document.getElementById('current-score').textContent = this.currentScore;
        
        const feedbackArea = document.getElementById('challenge-feedback-area');
        if (feedbackArea) {
            feedbackArea.innerHTML = `
                <div class="feedback" style="background: #fef5e7; color: #744210; border-left-color: #d69e2e;">
                    <strong>Pregunta saltada -${penalty} puntos</strong>
                </div>
            `;
        }

        this.stopTimer();
        
        setTimeout(() => {
            this.generateChallengeExercise();
        }, 1500);
    }

    // Iniciar temporizador
    startTimer(timeLimit) {
        this.timeLeft = timeLimit;
        this.timeBonus = Math.floor(timeLimit / 3); // Bonus por tiempo
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.timeBonus = Math.max(0, Math.floor(this.timeLeft / 3));
            
            const timerElement = document.getElementById('timer');
            if (timerElement) {
                timerElement.textContent = this.timeLeft;
                
                // Cambiar color cuando queda poco tiempo
                if (this.timeLeft <= 10) {
                    timerElement.style.color = '#e53e3e';
                } else if (this.timeLeft <= 20) {
                    timerElement.style.color = '#d69e2e';
                } else {
                    timerElement.style.color = '#48bb78';
                }
            }

            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    // Detener temporizador
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // Tiempo agotado
    timeUp() {
        this.stopTimer();
        
        const feedbackArea = document.getElementById('challenge-feedback-area');
        if (feedbackArea) {
            feedbackArea.innerHTML = `
                <div class="feedback incorrect">
                    <strong>¡Tiempo agotado! ⏰</strong><br>
                    Respuesta correcta: $${this.currentChallengeExercise.answer}$
                </div>
            `;
            this.renderMath();
        }

        setTimeout(() => {
            this.generateChallengeExercise();
        }, 2000);
    }

    // Finalizar reto
    endChallenge() {
        this.stopTimer();
        
        const challengeArea = document.querySelector('.challenge-area');
        if (!challengeArea) return;

        const accuracy = Math.round((this.correctAnswers / 10) * 100);
        const levelInfo = this.getLevelInfo(this.currentLevel);

        challengeArea.innerHTML = `
            <div class="exercise-container">
                <div class="challenge-results">
                    <h3>¡Reto Completado! 🏆</h3>
                    <div class="results-stats">
                        <div class="stat-item">
                            <span class="stat-label">Puntuación Final:</span>
                            <span class="stat-value">${this.currentScore} puntos</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Precisión:</span>
                            <span class="stat-value">${accuracy}% (${this.correctAnswers}/10)</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Nivel:</span>
                            <span class="stat-value">${levelInfo.title}</span>
                        </div>
                    </div>
                    
                    <div class="name-input-section">
                        <h4>¡Guarda tu puntuación!</h4>
                        <input type="text" 
                               id="player-name" 
                               placeholder="Ingresa tu nombre..." 
                               maxlength="20"
                               onkeypress="if(event.key==='Enter') app.savePlayerScore()">
                        <button class="btn btn-primary" onclick="app.savePlayerScore()">Guardar Puntuación</button>
                    </div>
                    
                    <div class="challenge-actions">
                        <button class="btn btn-secondary" onclick="app.selectLevel(${this.currentLevel})">Repetir Nivel</button>
                        <button class="btn btn-primary" onclick="app.selectLevel(${Math.min(4, this.currentLevel + 1)})">
                            ${this.currentLevel < 4 ? 'Siguiente Nivel' : 'Nivel Máximo'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Guardar puntuación del jugador
    savePlayerScore() {
        const nameInput = document.getElementById('player-name');
        if (!nameInput) return;

        const playerName = nameInput.value.trim();
        if (!playerName) {
            alert('Por favor, ingresa tu nombre.');
            return;
        }

        this.saveScore(playerName, this.currentScore);
        
        // Mostrar confirmación
        const nameSection = document.querySelector('.name-input-section');
        if (nameSection) {
            nameSection.innerHTML = `
                <div class="feedback correct">
                    <strong>¡Puntuación guardada! 🎉</strong><br>
                    ${playerName}: ${this.currentScore} puntos
                </div>
            `;
        }
    }

    // Cargar tabla de puntuaciones
    loadLeaderboard() {
        const leaderboardList = document.getElementById('leaderboard-list');
        if (!leaderboardList) return;

        const scores = this.getStoredScores();
        
        if (scores.length === 0) {
            leaderboardList.innerHTML = '<li class="leaderboard-item">No hay puntuaciones aún. ¡Sé el primero!</li>';
            return;
        }

        leaderboardList.innerHTML = scores.map((score, index) => `
            <li class="leaderboard-item">
                <span class="leaderboard-rank">#${index + 1}</span>
                <span>${score.name}</span>
                <span class="leaderboard-score">${score.score} pts</span>
            </li>
        `).join('');
    }

    // Obtener puntuaciones almacenadas
    getStoredScores() {
        try {
            const scores = localStorage.getItem('deriva-fun-scores');
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Error al cargar puntuaciones:', error);
            return [];
        }
    }

    // Guardar puntuación
    saveScore(name, score) {
        try {
            const scores = this.getStoredScores();
            scores.push({ name, score, date: new Date().toISOString() });
            scores.sort((a, b) => b.score - a.score);
            scores.splice(5); // Mantener solo top 5
            localStorage.setItem('deriva-fun-scores', JSON.stringify(scores));
            this.loadLeaderboard();
        } catch (error) {
            console.error('Error al guardar puntuación:', error);
        }
    }

    // Re-renderizar matemáticas con KaTeX
    renderMath() {
        if (typeof renderMathInElement !== 'undefined') {
            setTimeout(() => {
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ]
                });
            }, 100);
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DerivaFun();
});

// Funciones globales para eventos onclick
window.toggleCard = (index) => window.app.toggleCard(index);
window.generateExercise = () => window.app.generateExercise();
window.selectLevel = (level) => window.app.selectLevel(level);

