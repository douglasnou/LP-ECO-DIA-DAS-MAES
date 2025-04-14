import { useState } from 'react';
import axios from "axios";
import styled from "./style.module.scss";
import BannerBig from "./assets/banner-big.png";
import BannerSmall from "./assets/banner-small.png";
import Logo1 from "./assets/Logo-1.png";
import Logo2 from "./assets/Logo-2.png";

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    ecoville: '',
    cliente: '',
    foto: null,
    declaracao: false
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      foto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('nome', formData.nome);
    data.append('whatsapp', formData.whatsapp);
    data.append('email', formData.email);
    data.append('ecoville', formData.ecoville);
    data.append('cliente', formData.cliente);
    data.append('foto', formData.foto);
    data.append('declaracao', formData.declaracao);

    try {
      const response = await axios.post('https://api-campanha-das-maes.onrender.com/api/submit', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage('Dados enviados com sucesso!');
      setIsError(false);
      console.log(response.data);
    } catch (error) {
      setMessage('Erro ao enviar dados: ' + (error.response?.data?.error || error.message));
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <div className={styled.Section}>
      <div className={styled.Image}>
        <img src={BannerBig} alt="Imagem de campanha" />
      </div>

      <div className={styled.ImageSmall}>
        <img src={BannerSmall} alt="Imagem de campanha" />
      </div>

      <div className={styled.TextSmall}>
        <p>
          Ganhe uma foto sua com seu(s) filho(s), impressa no formato de <strong>ímã de geladeira!</strong>
        </p>
        <p>
          Você guarda a memória no coração e também na sua casa!
        </p>
      </div>

      <div className={styled.FormSection}>
        <div className={styled.Phrase}>
          <p>COMO PARTICIPAR</p>
        </div>

        <div className={styled.Rules}>
          <p>
            1. Preencha o formulário abaixo com seus dados;
          </p>
          <p>
            2. Envie uma foto(boa qualidade) com seu(s) filho(s) ou com a sua mãe;
          </p>
          <p>
            3. Aguarde: seu presente será enviado para o Ecoville da sua cidade!
          </p>
        </div>

        <div className={styled.Title}>
          <h1>GARANTIR SUA LEMBRANÇA</h1>
        </div>

        <form onSubmit={handleSubmit} className={styled.FormContainer}>
          <input
            className={styled.InputText}
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <input
            className={styled.InputText}
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp"
            required
          />
          <input
            className={styled.InputText}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
          />
          <select
            name="ecoville"
            onChange={handleChange}
            value={formData.ecoville}
            required
          >
            <option value="">Selecione um Ecoville</option>
            <option value="Bacabal">Bacabal</option>
            <option value="Pinheiro">Pinheiro</option>
            <option value="Pedreiras">Pedreiras</option>
            <option value="Zé Doca">Zé Doca</option>
            <option value="Presidente Dutra">Presidente Dutra</option>
            <option value="Trizidela do Vale">Trizidela do Vale</option>
            <option value="Coroatá">Coroatá</option>
            <option value="Lago da Pedra">Lago da Pedra</option>
            <option value="Codó">Codó</option>
          </select>

          <fieldset>
            <legend>Já é cliente?</legend>
            <div>
              <input
                type="radio"
                name="cliente"
                id="sim"
                value="sim"
                checked={formData.cliente === 'sim'}
                onChange={handleChange}
              />
              <label htmlFor="sim">Sim</label>
            </div>
            <div>
              <input
                type="radio"
                name="cliente"
                id="nao"
                value="não"
                checked={formData.cliente === 'não'}
                onChange={handleChange}
              />
              <label htmlFor="nao">Não</label>
            </div>
          </fieldset>

          <fieldset>
            <label>Sua foto:</label>
            <input
              type="file"
              name="foto"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              required
            />
          </fieldset>

          <div className={styled.Check}>
            <input
              name="declaracao"
              type="checkbox"
              id="declaracao"
              checked={formData.declaracao}
              onChange={handleChange}
              required
            />
            <label htmlFor="declaracao">
              Declaro que estou de acordo com o envio das minhas informações e imagem para participação na ação especial de Dia das Mães da Eco Urbanismo.
            </label>
          </div>

          <button className={styled.Btn} type="submit">Enviar</button>
        </form>

        {message && (
          <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>
        )}
      </div>

      <div className={styled.FooterSection}>
        <div className={styled.FooterTitles}>
          <h2>De 14 a 28 de abril</h2>
          <h3>Totalmente gratuito – é um presente nosso pra você!</h3>
          <p>Ação válida para mamães que estão na cidade dos Ecovilles em: <strong>Lago da Pedra, Codó, Zé Doca, Presidente Dutra, Bacabal, Pedreiras, Pinheiro, Trizidela do Vale e Coroatá.</strong></p>
        </div>
        <div className={styled.FooterConfidential}>
          <h3>Confidencialidade dos dados</h3>
          <p>
            Seus dados e sua foto serão utilizados exclusivamente para a ação de Dia das Mães da Eco Urbanismo. Nada será compartilhado com terceiros.
          </p>
        </div>

        <div className={styled.FooterLine}>
        </div>

        <div className={styled.FooterGreetings}>
          <p>
            Uma ação da Eco Urbanismo para eternizar o amor que constrói histórias.
          </p>
        </div>
      </div>

      <div className={styled.FinalSection}>
        <img src={Logo1} alt="Logo da campanha" />
        <img src={Logo2} alt="Logo da Eco Urbanismo" />
      </div>
    </div>
  );
}

export default App;