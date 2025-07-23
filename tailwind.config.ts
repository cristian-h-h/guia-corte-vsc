import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                // Colores base
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                // Colores personalizados para Guía de Corte - Paleta actualizada
                naranja: {
                    50: '#FFF3E0',
                    100: '#FFE0B2',
                    200: '#FFCC80',
                    300: '#FFB74D',
                    400: '#FFA726',
                    500: '#FF9800',
                    600: '#FB8C00',
                    700: '#F57C00',
                    800: '#EF6C00',
                    900: '#E65100',
                },
                gris: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#EEEEEE',
                    300: '#E0E0E0',
                    400: '#BDBDBD',
                    500: '#9E9E9E',
                    600: '#757575',
                    700: '#616161',
                    800: '#424242',
                    900: '#212121',
                },
                // Nuevos colores para carpintería y construcción
                madera: {
                    100: '#F8EFE9', // Madera clara
                    200: '#F2DFD0', // Pino
                    300: '#E6C9A8', // Roble claro
                    400: '#D4A276', // Roble
                    500: '#B86E20', // Caoba
                    600: '#8B4513', // Madera oscura
                    700: '#6B3D1A', // Nogal
                    800: '#4E2A0C', // Ébano
                    900: '#301B05', // Madera muy oscura
                },
                herramienta: {
                    100: '#E6F2FF', // Azul claro
                    200: '#B3D9FF', // Azul medio
                    300: '#4D94FF', // Azul herramienta
                    400: '#0066CC', // Azul oscuro
                    500: '#004C99', // Azul muy oscuro
                    600: '#CC0000', // Rojo herramienta
                    700: '#990000', // Rojo oscuro
                    800: '#FFCC00', // Amarillo herramienta
                    900: '#B38F00', // Amarillo oscuro
                },
                taller: {
                    100: '#F5F5F5', // Gris muy claro
                    200: '#E0E0E0', // Gris claro
                    300: '#BDBDBD', // Gris medio
                    400: '#757575', // Gris oscuro
                    500: '#424242', // Gris muy oscuro
                    600: '#F9A825', // Amarillo seguridad
                    700: '#E65100', // Naranja seguridad
                    800: '#B71C1C', // Rojo seguridad
                    900: '#1B5E20', // Verde seguridad
                },
                // Colores para el efecto de espada láser
                laser: {
                    DEFAULT: "rgba(0, 255, 0, 0.8)", // Color principal del láser (verde)
                    glow: "rgba(0, 255, 0, 0.4)", // Resplandor del láser
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                // Animaciones existentes
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'fade-in': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'slide-in': {
                    '0%': {
                        transform: 'translateX(-100%)'
                    },
                    '100%': {
                        transform: 'translateX(0)'
                    }
                },
                // Animación para el efecto de espada láser
                laser: {
                    "0%, 100%": { boxShadow: "0 0 10px rgba(0, 255, 0, 0.8)" },
                    "50%": { boxShadow: "0 0 20px rgba(0, 255, 0, 1)" },
                },
                // Nuevas animaciones para la sección Hero
                shine: {
                    '0%': { transform: 'translateX(-100%) rotate(45deg)' },
                    '100%': { transform: 'translateX(100%) rotate(45deg)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' }
                }
            },
            animation: {
                // Animaciones existentes
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-in': 'slide-in 0.3s ease-out',
                // Animación personalizada para el láser
                laser: 'laser 2s linear infinite',
                // Nuevas animaciones para la sección Hero
                shine: 'shine 3s infinite',
                float: 'float 3s ease-in-out infinite',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;