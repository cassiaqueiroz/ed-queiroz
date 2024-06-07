import os
from bs4 import BeautifulSoup
import requests

# Defina a URL do site que você deseja importar
url = "https://edqueiroz.com.br"

# Defina o diretório onde você deseja salvar os posts
directory = "posts"

# Verifique se o diretório existe, caso contrário, crie-o
if not os.path.exists(directory):
    os.makedirs(directory)

# Faça uma requisição GET para a URL do site
response = requests.get(url)

# Verifique se a resposta foi bem-sucedida
if response.status_code == 200:
    # Parse o conteúdo da resposta como HTML
    soup = BeautifulSoup(response.text, 'html.parser')

    # Encontre todos os posts no site
    posts = soup.find_all('div', {'class': 'post'})

    # Itere sobre os posts e salve cada um em um arquivo separado
    for post in posts:
        title = post.find('h2', {'class': 'title'}).text
        content = post.find('div', {'class': 'content'}).text

        filename = f"{title}.md"
        filepath = os.path.join(directory, filename)

        # Abra o arquivo em modo de escrita
        with open(filepath, "w") as file:
            # Escreva o conteúdo do post no arquivo
            file.write(f"# {title}\n\n{content}")
else:
    print(f"Erro ao baixar conteúdo: {response.status_code}")