'use client';

import React from 'react';
import { useState } from 'react';
import Tesseract from 'tesseract.js';

const Page = () => {

    const [text, setText] = useState('');
    const [msg, setMsg] = useState('');

    const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setText('');

            const { data } = await Tesseract.recognize(file, 'por');

            setText(data.text);

            setMsg('');
        } else {
            setMsg("Erro: Necessário selecionar uma imagem!");
        };


    }

    console.log(text)

    return (
        <div>
            <h1>Teste OCR</h1>
            <input type="file" accept="image/*" onChange={upload} />
            <p>{msg}</p>
            <textarea value={text} readOnly rows={10} cols={50} />
            <p>Texto reconhecido:</p>
            <pre>{text}</pre>
        </div>
    )
};

export default Page;
