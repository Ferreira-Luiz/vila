# Se você gostaria de contribuir com o projeto, siga estas etapas:

1. **Clique no botão "Fork" no canto superior direito da página. Para criar uma cópia do repositório na sua conta**

2. **Clone a partir do link do respositório que foi para a sua conta:**

   ```bash
   git clone https://github.com/SEU_USUARIO/vila.git
    ```

3. **Inicie o Projeto**

    ```bash
    cd vila
    npm install
    npm start
    ```
    o Comando ```npm start``` irá popular o arquivo **environmen.development.ts** e tambem iniciará o servidor

4. **Crie sua branch a partir da master**

    ```bash
    git checkout master
    git checkout -b feature/NOME_DA_SUA_ALTERACAO
    ```

5. **Antes de Commitar suas mudanças certifique-se de deletar os dados da API em** `/src/environments/environment.development.ts`

- o arquivo deve ficar dessa forma 
  ```bash
  export const environment = {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId : '',
  };
  ```


6. **Commite suas Mudanças**

   ```bash
    git add .
    git commit -m "Descrição das suas alterações"
   ```

7. **Envie suas alterações para o seu repositório remoto**

    ```bash
    git push origin feature/NOME_DA_SUA_ALTERACAO
    ```

8. **Abra um PULL REQUEST**

- Vá para a página do seu repositório no GitHub.
- Clique na aba "Pull Requests".
- Clique no botão "New Pull Request".
- Selecione a branch ```feature/NOME_DA_SUA_ALTERACAO``` e siga as instruções para criar o Pull Request.

Agradeço seu interesse em contribuir para o projeto! Se tiver qualquer dúvida, sinta-se à vontade para abrir uma issue ou entrar em contato pelo [Linkedin](https://www.linkedin.com/in/lfsilvaferreira/).
