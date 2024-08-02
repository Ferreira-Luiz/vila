# Entendendo decisões arquiteturais e a estrutura do projeto

## Estrutura de pastas

- `/pages` - É onde estão localizadas as páginas que contêm todos os componentes correspondentes a cada uma delas.

- `/core` - Nesta pasta devem ser armazenados Services singletons, Componentes universais e qualquer outro recurso que tenha uma instância única.

- `/shared` - Dentro de shared nós temos todos os arquivos que são usados em mais de uma parte do projeto. ( caso queira adicionar um novo service que não seja singleton ele deve ser adicionado dentro de `shared/services/SEU_SERVICE`).

- `/icons` - Antes de adicionar um icone verifique se ele esta disponivel no fontAwesome, caso esteja adicione-o neste modulo.

## SUB PASTAS

- `/core/auth` - Armazena arquivos relacionados a autenticação como, **guards de rota**, **componentes de login e registro** e **service de autenticação**

- `/shared/components` - Componentes usados em diferentes partes do projeto.

- `/shared/ui_elements` - Dumb components 




