import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = document.getElementById('root')
const app = <App />

if (root?.dataset.prerendered === 'true') hydrateRoot(root, app)
else createRoot(root).render(app)
