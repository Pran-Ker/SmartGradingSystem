// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleOCR = async () => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('/api/ocr', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setText(data.text);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleOCR}>OCR</button>
      <div>{text}</div>
    </div>
  );
}
