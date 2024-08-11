import React, { useState } from 'react'
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'

const App = () => {
  const [text, setText] = useState('')

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code')
    const link = document.createElement('a')
    link.href = canvas.toDataURL("image/png")
    link.download = 'qr-code.png'
    link.click()
  }

  const copyQR = async () => {
    const canvas = document.getElementById('qr-code')
    const dataUrl = canvas.toDataURL("image/png")
    const blob = await (await fetch(dataUrl)).blob()
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      alert('Copied to clipboard!')
    } catch (error) {
      console.error('Copy failed', error)
    }
  }

  return (
    <div className='container'>
      <header className='header'>
        mi_pagina.com
      </header>
      <main className='main-content'>
        <input
          type='text'
          value={text}
          placeholder='Enter text'
          onChange={(e) => setText(e.target.value)}
          className='text-input'
        />
        <div className='qr-container'>
          <QRCode
            id='qr-code'
            value={text}
            size={300}
            bgColor='#ffffff'
            fgColor='#000000'
            level='H'
            includeMargin={true}
          />
          <div className='action-buttons'>
            <button onClick={downloadQR} className='action-button'>
              Descargar
            </button>
            <button onClick={copyQR} className='action-button'>
              Copiar
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App